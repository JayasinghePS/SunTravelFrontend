import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private baseUrl = 'http://localhost:8080/suntravels/contract';

  constructor(private http: HttpClient) {}

  getContracts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getContracts`);
  }

  addContract(contract: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/saveContract`, contract);
  }

  updateContract(contractId: number, contract: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateContractById/${contractId}`, contract);
  }

  deleteContract(contractId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/deleteContractById/${contractId}`);
  }
}
