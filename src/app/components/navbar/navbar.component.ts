import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() user: User;

  constructor(
    private readonly spotifyService: SpotifyService
  ) { }

  ngOnInit(): void { }

  public login() {
    this.spotifyService.login();
  }

  public logout() {
    this.spotifyService.logout();
  }
}
