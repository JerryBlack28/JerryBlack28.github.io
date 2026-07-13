export type ProjectCategory = "web" | "mobile" | "desktop" | "other";
export type ProjectStatus = "completed" | "in-progress" | "planned";

export interface Project {
	id: string;
	title: string;
	description: string;
	image?: string;
	category: ProjectCategory;
	status: ProjectStatus;
	techStack: string[];
	liveUrl?: string;
	githubUrl?: string;
}

export const projectsData: Project[] = [
	{
		id: "acmlab",
		title: "ACMLAB",
		description: "ACM 竞赛算法模板与题解库。",
		category: "other",
		status: "in-progress",
		techStack: ["C++", "Algorithms"],
		githubUrl: "https://github.com/JerryBlack28/ACMLAB",
	},
];
