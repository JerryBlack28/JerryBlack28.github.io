export type ProjectCategory = "web" | "mobile" | "desktop" | "other";
export type ProjectStatus = "completed" | "in-progress" | "planned";

export interface Project {
	id: string;
	title: string;
	description: string;
	descriptionEn?: string;
	image?: string;
	category: ProjectCategory;
	status: ProjectStatus;
	techStack: string[];
	liveUrl?: string;
	githubUrl?: string;
}

export const projectsData: Project[] = [
	{
		id: "psycho",
		title: "心潮",
		description:
			"Ionic + Capacitor 心理叙事原型，包含闪念、反思画像、支持性 AI 对话与本地优先的月度回顾。",
		descriptionEn:
			"An Ionic and Capacitor psychological narrative prototype with quick notes, reflective profiles, supportive AI chat, and local-first monthly reviews.",
		category: "mobile",
		status: "completed",
		techStack: ["Ionic", "Capacitor", "Vite", "JavaScript"],
		githubUrl: "https://github.com/JerryBlack28/psycho",
	},
	{
		id: "acmlab",
		title: "ACMLAB",
		description: "ACM 竞赛算法模板与题解库。",
		descriptionEn:
			"Algorithm templates and solutions for competitive programming.",
		category: "other",
		status: "completed",
		techStack: ["C++", "Algorithms"],
		githubUrl: "https://github.com/JerryBlack28/ACMLAB",
	},
];
