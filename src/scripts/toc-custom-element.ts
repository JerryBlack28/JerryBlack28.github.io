// Register the <table-of-contents> custom element globally so it's
// available regardless of whether the current page renders a TOC.
// Imported from Layout.astro so it's present on every page's initial
// load — otherwise Swup nav from a TOC-less page (e.g., home) to an
// article would insert <table-of-contents> before the class is defined.

class TableOfContents extends HTMLElement {
	tocEl: HTMLElement | null = null;
	visibleClass = "visible";
	observer: IntersectionObserver;
	anchorNavTarget: HTMLElement | null = null;
	headingIdxMap = new Map<string, number>();
	headings: HTMLElement[] = [];
	sections: HTMLElement[] = [];
	tocEntries: HTMLAnchorElement[] = [];
	active: boolean[] = [];
	activeIndicator: HTMLElement | null = null;

	constructor() {
		super();
		this.observer = new IntersectionObserver(
			this.markVisibleSection, { threshold: 0 }
		);
	};

	markVisibleSection = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			const id = entry.target.children[0]?.getAttribute("id");
			const idx = id ? this.headingIdxMap.get(id) : undefined;
			if (idx != undefined)
				this.active[idx] = entry.isIntersecting;

			if (entry.isIntersecting && this.anchorNavTarget == entry.target.firstChild)
				this.anchorNavTarget = null;
		});

		if (!this.active.includes(true))
			this.fallback();
		this.update();
	};

	toggleActiveHeading = () => {
		let i = this.active.length - 1;
		let min = this.active.length - 1, max = -1;
		while (i >= 0 && !this.active[i]) {
			this.tocEntries[i].classList.remove(this.visibleClass);
			i--;
		}
		while (i >= 0 && this.active[i]) {
			this.tocEntries[i].classList.add(this.visibleClass);
			min = Math.min(min, i);
			max = Math.max(max, i);
			i--;
		}
		while (i >= 0) {
			this.tocEntries[i].classList.remove(this.visibleClass);
			i--;
		}
		if (min > max) {
			this.activeIndicator?.setAttribute("style", `opacity: 0`);
		} else {
			let parentOffset = this.tocEl?.getBoundingClientRect().top || 0;
			let scrollOffset = this.tocEl?.scrollTop || 0;
			let top = this.tocEntries[min].getBoundingClientRect().top - parentOffset + scrollOffset;
			let bottom = this.tocEntries[max].getBoundingClientRect().bottom - parentOffset + scrollOffset;
			this.activeIndicator?.setAttribute("style", `top: ${top}px; height: ${bottom - top}px`);
		}
	};

	scrollToActiveHeading = () => {
		if (this.anchorNavTarget || !this.tocEl) return;
		const activeHeading =
			document.querySelectorAll<HTMLDivElement>(`#toc .${this.visibleClass}`);
		if (!activeHeading.length) return;

		const topmost = activeHeading[0];
		const bottommost = activeHeading[activeHeading.length - 1];
		const tocHeight = this.tocEl.clientHeight;

		let top;
		if (bottommost.getBoundingClientRect().bottom -
			topmost.getBoundingClientRect().top < 0.9 * tocHeight)
			top = topmost.offsetTop - 32;
		else
			top = bottommost.offsetTop - tocHeight * 0.8;

		this.tocEl.scrollTo({
			top,
			left: 0,
			behavior: "smooth",
		});
	};

	update = () => {
		requestAnimationFrame(() => {
			this.toggleActiveHeading();
			this.scrollToActiveHeading();
		});
	};

	fallback = () => {
		if (!this.sections.length) return;

		for (let i = 0; i < this.sections.length; i++) {
			let offsetTop = this.sections[i].getBoundingClientRect().top;
			let offsetBottom = this.sections[i].getBoundingClientRect().bottom;

			if (this.isInRange(offsetTop, 0, window.innerHeight)
				|| this.isInRange(offsetBottom, 0, window.innerHeight)
				|| (offsetTop < 0 && offsetBottom > window.innerHeight)) {
				this.markActiveHeading(i);
			}
			else if (offsetTop > window.innerHeight) break;
		}
	};

	markActiveHeading = (idx: number) => {
		this.active[idx] = true;
	};

	handleAnchorClick = (event: Event) => {
		const anchor = event
			.composedPath()
			.find((element) => element instanceof HTMLAnchorElement);

		if (anchor) {
			const id = decodeURIComponent((anchor as HTMLAnchorElement).hash?.substring(1));
			const idx = this.headingIdxMap.get(id);
			if (idx !== undefined) {
				this.anchorNavTarget = this.headings[idx];
			} else {
				this.anchorNavTarget = null;
			}
		}
	};

	isInRange(value: number, min: number, max: number) {
		return min < value && value < max;
	};

	connectedCallback() {
		// wait for the onload animation to finish, which makes the `getBoundingClientRect` return correct values.
		// On Swup navigations we disable that animation, so animationend never fires — fall back to rAF.
		const element = document.querySelector('.prose');
		const runInit = () => this.init();
		if (element) {
			const animName = getComputedStyle(element).animationName;
			if (animName && animName !== 'none') {
				element.addEventListener('animationend', runInit, { once: true });
			} else {
				requestAnimationFrame(runInit);
			}
		} else {
			requestAnimationFrame(runInit);
		}
	};

	init() {
		this.tocEl = document.getElementById("toc-inner-wrapper");

		if (!this.tocEl) return;

		this.tocEl.addEventListener("click", this.handleAnchorClick, {
			capture: true,
		});

		this.activeIndicator = document.getElementById("active-indicator");

		this.tocEntries = Array.from(
			document.querySelectorAll<HTMLAnchorElement>("#toc a[href^='#']")
		);

		if (this.tocEntries.length === 0) return;

		this.sections = new Array(this.tocEntries.length);
		this.headings = new Array(this.tocEntries.length);
		for (let i = 0; i < this.tocEntries.length; i++) {
			const id = decodeURIComponent(this.tocEntries[i].hash?.substring(1));
			const heading = document.getElementById(id);
			const section = heading?.parentElement;
			if (heading instanceof HTMLElement && section instanceof HTMLElement) {
				this.headings[i] = heading;
				this.sections[i] = section;
				this.headingIdxMap.set(id, i);
			}
		}
		this.active = new Array(this.tocEntries.length).fill(false);

		this.sections.forEach((section) =>
			this.observer.observe(section)
		);

		this.fallback();
		this.update();
	};

	disconnectedCallback() {
		this.sections.forEach((section) =>
			this.observer.unobserve(section)
		);
		this.observer.disconnect();
		this.tocEl?.removeEventListener("click", this.handleAnchorClick);
	};
}

if (!customElements.get("table-of-contents")) {
	customElements.define("table-of-contents", TableOfContents);
}
