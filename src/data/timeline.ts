export type TimelineType = "education" | "work" | "project" | "achievement";

export interface TimelineItem {
	id: string;
	type: TimelineType;
	title: string;
	organization?: string;
	description: string;
	skills?: string[];
	achievements?: string[];
	startDate: string;
	endDate?: string;
	duration?: string;
	location?: string;
	githubUrl?: string;
	liveUrl?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [];
