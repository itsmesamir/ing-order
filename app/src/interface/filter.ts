export interface FilterState {
  [key: string]: string[] | number[] | string | number;
}

export interface FilterData {
  label: string;
  value: number | string;
}
