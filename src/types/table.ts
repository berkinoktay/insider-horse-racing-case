export interface Column {
  key: string
  label: string
  headerClass?: string
  cellClass?: string
}

export interface TableProps<T = Record<string, unknown>> {
  /**
   * Title text displayed above the table.
   */
  title?: string

  /**
   * List of columns to display.
   */
  columns: Column[]

  /**
   * List of rows to display.
   */
  data: T[]

  /**
   * Height of each row in pixels.
   */
  rowHeight?: number
}
