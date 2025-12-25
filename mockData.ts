import { DataRow } from '../types.ts';

/**
 * Mocking the structure of the provided spreadsheet.
 * Column B is the "Lookup key" (e.g., Symptom, Error, Item Name).
 * Column D is the "Target result" (e.g., Remedy, Fix, Description).
 */
export const MOCK_DATASET: DataRow[] = [
  { columnA: "1", columnB: "Fever and headache", columnC: "Health", columnD: "Rest, hydration, and paracetamol. Consult a doctor if symptoms persist." },
  { columnA: "2", columnB: "Error 404", columnC: "Tech", columnD: "Page not found. Check the URL or server configuration." },
  { columnA: "3", columnB: "React Hook loop", columnC: "Coding", columnD: "Check dependency arrays in useEffect/useCallback. Use functional updates for state." },
  { columnA: "4", columnB: "Persistent cough", columnC: "Health", columnD: "Use warm fluids, honey, and rest. If it lasts >3 weeks, see a professional." },
  { columnA: "5", columnB: "Low battery warning", columnC: "Tech", columnD: "Connect to a power source immediately to prevent data loss." },
  { columnA: "6", columnB: "Gemini API integration", columnC: "AI", columnD: "Use @google/genai package and initialize with an API key from environment variables." },
  { columnA: "7", columnB: "Tailwind responsive design", columnC: "Design", columnD: "Use prefixes like sm:, md:, lg: to define styles for different screen sizes." },
  { columnA: "8", columnB: "Database connection failed", columnC: "Infrastructure", columnD: "Verify connection string, firewall rules, and database service status." },
  { columnA: "9", columnB: "Slow website performance", columnC: "Tech", columnD: "Optimize image sizes, use lazy loading, and minimize heavy JavaScript bundles." },
  { columnA: "10", columnB: "Insomnia symptoms", columnC: "Health", columnD: "Maintain a regular sleep schedule, avoid caffeine late, and limit screen time before bed." },
];