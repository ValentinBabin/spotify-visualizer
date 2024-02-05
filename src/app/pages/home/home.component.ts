import { Component, OnInit } from '@angular/core';
import { SpotifyService, TokenObject } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { Track } from '../../models/track';
import { Artist } from '../../models/artist';
import { Album } from '../../models/album';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public user: User;
    public currentTrack: Track;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly spotifyService: SpotifyService,
    ) { }

    ngOnInit(): void {
        this.user = this.route.snapshot.data.user;
    }
}
