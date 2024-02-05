import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
import { NavigationService } from 'src/app/services/navigation.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {

  @Input() playlist: Playlist;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly spotifyService: SpotifyService,
  ) { }

  ngOnInit(): void {
  }

  goToPlaylist() {
    this.navigationService.navigateToPage(`/playlist/${this.playlist.id}`);

    // To Fix the mutation user object
    localStorage.setItem(`user_${this.spotifyService.user.id}`, JSON.stringify(this.spotifyService.user));

  }

}
