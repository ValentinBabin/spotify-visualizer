import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Audio-visualizer';

    constructor(
        private readonly router: Router,
        private readonly spotifyService: SpotifyService,
        private readonly route: ActivatedRoute
    ) { }

    ngOnInit() {
        // this.router.setUpLocationChangeListener();

        // this.router.events.subscribe((ev) => {
        //     if (ev instanceof NavigationEnd) {
        //         const url = ev.url;
        //         const urlTab = url.split('#');
        //         const query = urlTab[1];
        //         this.spotifyService.getAuth(query);
        //     }
        // });

        // this.spotifyService.getAuth(this.route.snapshot.fragment);
    }
}
