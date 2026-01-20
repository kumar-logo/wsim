import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ExcelSheet } from '../models/excel-file.model';

@Injectable({
  providedIn: 'root'
})
export class ExcelParserService {
  parseFile(file: File): Observable<ExcelSheet[]> {
    const mockSheets: ExcelSheet[] = [
      {
        name: 'Positions', index: 0, rowCount: 150, columnCount: 12,
        headers: ['Symbol', 'Name', 'Quantity', 'Price', 'Market Value', 'P&L', 'P&L %', 'Sector', 'Asset Class', 'Date', 'Client ID', 'Notes'],
        previewData: [
          ['AAPL', 'Apple Inc.', '500', '178.50', '89250', '14250', '19.0%', 'Technology', 'Equity', '2023-06-15', 'CLI001', ''],
          ['MSFT', 'Microsoft Corp.', '300', '378.90', '113670', '29670', '35.3%', 'Technology', 'Equity', '2023-05-10', 'CLI001', ''],
          ['GOOGL', 'Alphabet Inc.', '200', '141.80', '28360', '4360', '18.2%', 'Technology', 'Equity', '2023-07-20', 'CLI001', ''],
          ['VTI', 'Vanguard Total Stock ETF', '400', '238.50', '95400', '15400', '19.3%', 'Diversified', 'ETF', '2023-04-05', 'CLI002', ''],
          ['BND', 'Vanguard Bond ETF', '1000', '71.50', '71500', '-500', '-0.7%', 'Bonds', 'Fixed Income', '2023-03-15', 'CLI002', '']
        ],
        selected: true
      },
      {
        name: 'Clients', index: 1, rowCount: 50, columnCount: 8,
        headers: ['Client ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Risk Profile', 'Account Type', 'Status'],
        previewData: [
          ['CLI001', 'Michael', 'Johnson', 'michael.johnson@email.com', '+1 (555) 234-5678', 'Moderate', 'Individual', 'Active'],
          ['CLI002', 'Sarah', 'Williams', 'sarah.williams@email.com', '+1 (555) 345-6789', 'Conservative', 'Joint', 'Active'],
          ['CLI003', 'David', 'Chen', 'david.chen@email.com', '+1 (555) 456-7890', 'Aggressive', 'Corporate', 'Active']
        ],
        selected: false
      }
    ];
    return of(mockSheets).pipe(delay(1500));
  }

  validateData(sheet: ExcelSheet, mappings: any[]): Observable<any> {
    return of({
      isValid: true,
      errors: [],
      warnings: [{ row: 5, column: 'Notes', value: '', message: 'Empty value', severity: 'warning' }],
      summary: { totalRows: sheet.rowCount, validRows: sheet.rowCount - 1, invalidRows: 1, errorCount: 0, warningCount: 1, errorsByColumn: {} }
    }).pipe(delay(1000));
  }
}
