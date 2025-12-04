import { Routes } from '@angular/router';
import { RequestSongComponent } from './public/request-song/request-song.component';
import { SongRequestEventResolver, SongRequestRequestsResolver } from './public/request-song-event.resolver';

export const routes: Routes = [
    {
        path: '/request-song/:id',
        component: RequestSongComponent,
        resolve: {
            event: SongRequestEventResolver,
            requests: SongRequestRequestsResolver
        }
    },
    {
        path: '**',
        redirectTo: ''
    }
];
