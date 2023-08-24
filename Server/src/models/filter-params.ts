export interface FilterParams {
  pageOffset: number;
  pageLength: number;
  search?: string;
  sort?: {
    field: string;
    direction: 1 | -1;
  };
  ids?: string[]; // a list of id's to be retrieved
}
