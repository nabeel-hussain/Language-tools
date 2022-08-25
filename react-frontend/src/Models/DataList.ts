export interface Column<T> {
  title: string;
  accessor: string;
  isSort?: boolean;
  render?: (obj: T) => JSX.Element;
}
export interface RowSelection {
  type: string;
}
