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

        return this.http.get<getEventDto>(`${this.baseUrl}/Events/getBy_PublicEventId/${publicId}`);
    }

    getRequests_ByPublicId(publicId: string): Observable<getEventRequestDto[]> {
        return this.http.get<getEventRequestDto[]>(`${this.baseUrl}/Requests/getBy_PublicEventId/${publicId}`);
    }

    createSongRequest(requestData: CreateSongRequestDto): Observable<getEventRequestDto> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<getEventRequestDto>(`${this.baseUrl}/Requests/create`, requestData, { headers });
    }
}