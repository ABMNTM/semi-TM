export type StatusType = "TD" | "DI" | "DN";

export interface TaskOuterType {
    id: string;
    context: string;
    status: StatusType;
    comment_count: number;
}

export interface ListType {
    id: string;
    name: string;
    tasks: Array<TaskOuterType>;
}

export interface TaskInnerType {
    id: string;
    context: string;
    status: StatusType;
    percentage: number;
    date_created: Date;
    dead_line: Date;
    related_list: string;
    // comments will put here ...
}