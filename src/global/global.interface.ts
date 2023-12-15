//

export interface IGenericResponseWithPagination<T = any> {
  items: T[];
  total: number;
  page: number;
  size: number;
}

export interface IGenericResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface GenericListResponseInterface<T = any>
  extends IGenericResponse<IGenericResponseWithPagination<T>> {}
