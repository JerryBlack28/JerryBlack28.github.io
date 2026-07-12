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

export const projectsData: Project[] = [];
