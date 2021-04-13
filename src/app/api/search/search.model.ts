export interface SearchResults {
  count: number;
  epics: Array<{
    assignedTo: number;
    id: number;
    ref: number;
    status: number;
    subject: string;
  }>;
  issues: Array<{
    assignedTo: number;
    id: number;
    ref: number;
    status: number;
    subject: string;
  }>;
  tasks: Array<{
    assignedTo: number;
    id: number;
    ref: number;
    status: number;
    subject: string;
  }>;
  userstories: Array<{
    id: number;
    milestoneName: string;
    milestoneSlug: string;
    ref: number;
    status: number;
    subject: string;
    totalPoints: number;
  }>;
  wikipages: Array<{
    id: number;
    slug: string;
  }>;
}
