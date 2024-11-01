export interface IPaginationOptions {
    page?: number;
    limit?: number;
  }
  
  export interface IPaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    lastPage: number;
  }