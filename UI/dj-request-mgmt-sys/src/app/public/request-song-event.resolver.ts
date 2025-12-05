import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { getEventDto } from '../shared/interfaces/getEventDto';
import { SongRequestService } from './request-song/song-request.service';
import { getEventRequestDto } from '../shared/interfaces/getRequestDto';



export const SongRequestEventResolver: ResolveFn<getEventDto> = (route: ActivatedRouteSnapshot) => {
  const eventService = inject(SongRequestService);
  const id = route.paramMap.get('id')!;

  return eventService.getEvent_ByPublicId(id);
};


export const SongRequestRequestsResolver: ResolveFn<getEventRequestDto[]> = (route: ActivatedRouteSnapshot) => {
  const requestService = inject(SongRequestService);
  const id = route.paramMap.get('id')!;

  return requestService.getRequests_ByPublicId(id);
};