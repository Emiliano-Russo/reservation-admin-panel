export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

export class PaginationDto {
  limit: number = 10;

  page: number = 1;
}
