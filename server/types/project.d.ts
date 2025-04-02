declare interface ProjectEntity {
  id: UUID;
  time: number;
  name: string;
  path: string;
}

declare interface ProjectInfo {
  name: string;
  routes: {
    [key: string]: {
      src: string;
      name: string
    }
  }
  alias: {
    [key: string]: string
  }
}