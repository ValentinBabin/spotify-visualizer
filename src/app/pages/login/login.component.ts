import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
        private readonly spotifyService: SpotifyService
    ) { }

    ngOnInit(): void {
    }

    public login() {
        this.spotifyService.login();
    }

}
