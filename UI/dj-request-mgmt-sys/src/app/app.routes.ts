import { Routes } from '@angular/router';
import { RequestSongComponent } from './public/request-song/request-song.component';

export const routes: Routes = [
    {
        path: 'request-song/:id',
        component: RequestSongComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
