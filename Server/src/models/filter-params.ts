import { Request } from "express";

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


export interface ExtendedRequest<FilterParams> extends Request {
  filter?: FilterParams; // Add the 'filter' property of type T
}
