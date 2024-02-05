import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from 'src/app/models/playlist';
import { Track } from 'src/app/models/track';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

    public playlist: Playlist;
    public user: User;

    public audioList = [];

    public indexOfTrackWanted;

    constructor(
        private readonly route: ActivatedRoute
    ) { }

    async ngOnInit(): Promise<void> {
        this.playlist = this.route.snapshot.data.playlist;
        this.user = this.route.snapshot.data.user;
        this.audioList = this.playlist.tracks;
        console.log('Component: ', this.playlist, this.user, this.audioList);
    }

    public switchToTrack(track: Track): any {
        this.indexOfTrackWanted = this.audioList.map(function (obj) { return obj.id; }).indexOf(track.id);
    }

}
