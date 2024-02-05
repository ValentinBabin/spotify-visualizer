import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';

@Component({
  selector: 'app-playlists-list',
  templateUrl: './playlists-list.component.html',
  styleUrls: ['./playlists-list.component.scss']
})
export class PlaylistsListComponent implements OnInit {

  @Input() playlists: Playlist[];

  constructor() { }

  ngOnInit(): void {
  }

}
