import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Playlist } from '../models/playlist';
import { User } from '../models/user';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
    providedIn: 'root'
})
export class PlaylistResolver implements Resolve<boolean> {
    constructor(
        private readonly spotifyService: SpotifyService
    ) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<any> | any {
        const id = route.paramMap.get('id');
        if (route.fragment) {
            return this.spotifyService.getPlaylistFromID(id);
        } else {
            return this.spotifyService.getPlaylistFromID(id);
        }
    }
}
