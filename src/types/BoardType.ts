export interface ProjectType {
  id: string;
  name: string;
  isStared: boolean;
}

export interface BaseBoardType {
  id: string;
  name: string;
  isArcheved: boolean;
}

export default interface BoardType extends BaseBoardType {
  projects: Array<ProjectType>;
}
