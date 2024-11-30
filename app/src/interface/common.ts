export interface Meta {
  page: number;
  pageSize: number;
  total: number;
  count?: number;
}

export interface WithMeta<T> {
  data: T;
  meta: Meta;
}
