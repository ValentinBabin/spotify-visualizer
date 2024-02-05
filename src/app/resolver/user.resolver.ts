import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { SpotifyService, TokenObject } from '../services/spotify.service';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {

    private static ACCESS_OBJECT_KEY = 'ACCESS_OBJECT';

    constructor(
        private readonly spotifyService: SpotifyService,
        private readonly router: Router
    ) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<boolean> | Promise<any> | any> {
        const storageObject: TokenObject = JSON.parse(localStorage.getItem('ACCESS_OBJECT'));
        if (route.url[0].path == "playlist") {
            return this.spotifyService.getUserRequest(storageObject);
        }
        else if (storageObject != null) {
            localStorage.removeItem('ACCESS_OBJECT');
            return this.spotifyService.getUserRequest(storageObject);
        }
        else {
            this.spotifyService.login();
        }
    }
}
