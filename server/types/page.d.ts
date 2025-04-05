declare interface PageElement {
  id: UUID,
  name: string;
  children?: PageElement[];
}
declare interface PageInfo {
  id: UUID;
  time: number;
  name: string;
  path: string;
  view: PageElement;
}
