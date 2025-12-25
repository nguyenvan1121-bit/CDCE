
import { DataRow } from '../types';

// The spreadsheet ID extracted from the user's link - Exported for use in App component
export const SHEET_ID = '1P9EDUYJ4ew6fFOih63XIDUjSyWEdiije';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

/**
 * Basic CSV parser to convert spreadsheet text into structured data.
 */
function parseCSV(csv: string): string[][] {
  const lines: string[][] = [];
  const rows = csv.split(/\r?\n/);
  
  for (let row of rows) {
    if (!row.trim()) continue;
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    lines.push(values);
  }
  return lines;
}

export const fetchSheetData = async (): Promise<DataRow[]> => {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) throw new Error('Failed to fetch spreadsheet data. Ensure the file is shared.');
    
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    // Map data assuming: 
    // Col 0 -> Index (A)
    // Col 1 -> Search Key (B)
    // Col 2 -> Category/Info (C)
    // Col 3 -> Result (D)
    // We skip the first row assuming it's headers
    return rows.slice(1).map((row, index) => ({
      columnA: row[0] || String(index + 1),
      columnB: row[1] || 'No Key',
      columnC: row[2] || 'N/A',
      columnD: row[3] || 'No result available'
    })).filter(row => row.columnB !== 'No Key' && row.columnB.length > 0);
  } catch (error) {
    console.error("Data Sync Error:", error);
    throw error;
  }
};
