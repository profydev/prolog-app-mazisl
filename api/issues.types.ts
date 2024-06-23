export enum IssueLevel {
  info = "info",
  warning = "warning",
  error = "error",
}

export enum IssueStatus {
  open = "open",
  resolved = "resolved",
}

export type Issue = {
  id: string;
  projectId: string;
  name: string;
  message: string;
  stack: string;
  level: IssueLevel;
  status: string;
  numEvents: number;
  numUsers: number;
};

export type IssueListParams = {
  page: number;
  status?: IssueStatus;
  level?: IssueLevel;
  project?: string;
};
