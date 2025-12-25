
export interface DataRow {
  columnA: string; // ID or Index
  columnB: string; // The Search Key / Input
  columnC: string; // Intermediate data
  columnD: string; // The Result / Output
}

export interface SearchResult {
  match: DataRow;
}
