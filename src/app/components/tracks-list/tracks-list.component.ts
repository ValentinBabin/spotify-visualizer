import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';

@Component({
  selector: 'app-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
