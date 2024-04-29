export interface ProjectType {
  id: number;
  name: string;
  isStared: boolean;
}

export default interface BoardType {
  id: number;
  name: string;
  isArcheved: boolean;
  projects: Array<ProjectType>;
}
