import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/services/navigation.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly spotifyService: SpotifyService,
    private readonly navigationService: NavigationService
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.queryParamMap.get('code')) {
      const token = await this.spotifyService.getToken(this.route.snapshot.queryParamMap.get('code'));
      this.spotifyService.getUserRequest(token).then((user: User) => {
        this.navigationService.navigateToPage('/home');
      }, (error) => {
        console.log(error);
      });
    }
  }

}
