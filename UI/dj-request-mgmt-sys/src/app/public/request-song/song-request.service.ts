import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { getEventDto } from '../../shared/interfaces/getEventDto';
import { getEventRequestDto } from '../../shared/interfaces/getRequestDto';
import { CreateSongRequestDto } from '../../shared/interfaces/createSongRequestDto';



@Injectable({
    providedIn: 'root'
})

export class SongRequestService {

    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

    getEvent_ByPublicId(publicId: string): Observable<getEventDto> {
        const params = new HttpParams().set('id', publicId);
        return this.http.get<getEventDto>(`${this.baseUrl}/events/getBy_EventId`, { params });
    }

    getRequests_ByPublicId(publicId: string): Observable<getEventRequestDto[]> {
        const params = new HttpParams().set('publicEventId', publicId);
        return this.http.get<getEventRequestDto[]>(`${this.baseUrl}/requests/getBy_PublicEventId`, { params });
    }

    createSongRequest(requestData: CreateSongRequestDto): Observable<getEventRequestDto> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<getEventRequestDto>(`${this.baseUrl}/requests/create`, requestData, { headers });
    }
}