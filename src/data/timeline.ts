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

export const timelineData: TimelineItem[] = [
	{
		id: "icpc-shanghai-2024",
		type: "achievement",
		title: "2024 ICPC 上海站 银奖",
		organization: "ICPC 国际大学生程序设计竞赛",
		description: "",
		startDate: "2024-11-16",
		endDate: "2024-11-17",
		location: "上海",
	},
	{
		id: "icpc-nanjing-2024",
		type: "achievement",
		title: "2024 ICPC 南京站 银奖",
		organization: "ICPC 国际大学生程序设计竞赛",
		description: "",
		startDate: "2024-11-02",
		endDate: "2024-11-03",
		location: "南京",
	},
	{
		id: "icpc-nanjing-2023",
		type: "achievement",
		title: "2023 ICPC 南京站 铜奖",
		organization: "ICPC 国际大学生程序设计竞赛",
		description: "",
		startDate: "2023-11-04",
		endDate: "2023-11-05",
		location: "南京",
	},
	{
		id: "icpc-xian-2023",
		type: "achievement",
		title: "2023 ICPC 西安邀请赛 金奖",
		organization: "ICPC 国际大学生程序设计竞赛",
		description: "",
		startDate: "2023-05-13",
		endDate: "2023-05-14",
		location: "西安",
		featured: true,
	},
	{
		id: "icpc-asia-final-2023",
		type: "achievement",
		title: "2023 ICPC 亚洲区决赛 铜奖",
		organization: "ICPC 国际大学生程序设计竞赛",
		description: "",
		startDate: "2024-01-13",
		endDate: "2024-01-15",
		location: "上海",
	},
	{
		id: "icpc-asia-final-2022",
		type: "achievement",
		title: "2022 ICPC 亚洲区决赛 铜奖",
		organization: "ICPC 国际大学生程序设计竞赛",
		description: "",
		startDate: "2023-03-24",
		endDate: "2023-03-26",
		location: "上海",
	},
	{
		id: "icpc-hangzhou-2022",
		type: "achievement",
		title: "2022 ICPC 杭州站 银奖",
		organization: "ICPC 国际大学生程序设计竞赛",
		description: "",
		startDate: "2022-12-03",
		endDate: "2022-12-04",
		location: "杭州",
	},
];
