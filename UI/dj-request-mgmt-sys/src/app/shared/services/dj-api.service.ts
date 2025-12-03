import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DjRequest {
  id?: number;
  artistName: string;
  songTitle: string;
  requestedBy: string;
  requestTime: Date;
  priority: 'low' | 'normal' | 'high';
  status: 'pending' | 'approved' | 'rejected' | 'played';
}

@Injectable({
  providedIn: 'root'
})
export class DjApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Get all DJ requests
   */
  getRequests(): Observable<DjRequest[]> {
    return this.http.get<DjRequest[]>(`${this.baseUrl}/requests`);
  }

  /**
   * Get a specific DJ request by ID
   */
  getRequest(id: number): Observable<DjRequest> {
    return this.http.get<DjRequest>(`${this.baseUrl}/requests/${id}`);
  }

  /**
   * Create a new DJ request
   */
  createRequest(request: Omit<DjRequest, 'id'>): Observable<DjRequest> {
    return this.http.post<DjRequest>(`${this.baseUrl}/requests`, request);
  }

  /**
   * Update an existing DJ request
   */
  updateRequest(id: number, request: Partial<DjRequest>): Observable<DjRequest> {
    return this.http.put<DjRequest>(`${this.baseUrl}/requests/${id}`, request);
  }

  /**
   * Delete a DJ request
   */
  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/requests/${id}`);
  }

  /**
   * Get queue status (example of request that skips loading)
   */
  getQueueStatus(): Observable<any> {
    const headers = new HttpHeaders().set('X-Skip-Loading', 'true');
    return this.http.get(`${this.baseUrl}/queue/status`, { headers });
  }

  /**
   * Simulate a long-running operation for demo purposes
   */
  simulateLongOperation(): Observable<string> {
    // This would normally be an HTTP request, but for demo we'll simulate with delay
    return of('Operation completed successfully!').pipe(delay(3000));
  }

  /**
   * Health check endpoint (skips loading)
   */
  healthCheck(): Observable<any> {
    return this.http.get(`${this.baseUrl}/health`);
  }
}