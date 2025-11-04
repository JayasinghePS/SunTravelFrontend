import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',   //makes service globally available (no need to import manually)
})
export class ContractService {
  // Base backend URL for contract APIs
  private baseUrl = 'http://localhost:8080/suntravels/contract';

  constructor(private http: HttpClient) {}    //HttpClient → used to call backend APIs

  // Get all contracts
  getContracts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getContracts`);
  }

  // Add a new contract
  addContract(contract: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/saveContract`, contract);
  }

  // Update contract by ID
  updateContract(contractId: number, contract: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateContractById/${contractId}`, contract);
  }

  // Delete contract by ID
  deleteContract(contractId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/deleteContractById/${contractId}`);
  }
}
