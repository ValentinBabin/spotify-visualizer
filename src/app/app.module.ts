import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { VisualizerComponent } from './components/visualizer/visualizer.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { PlaylistsListComponent } from './components/playlists-list/playlists-list.component';
import { TracksListComponent } from './components/tracks-list/tracks-list.component';
import { TimeConversionPipe } from './pipes/time-conversion.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlaylistItemComponent } from './components/playlist-item/playlist-item.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { TrackItemComponent } from './components/track-item/track-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { CallbackComponent } from './pages/callback/callback.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        VisualizerComponent,
        AudioPlayerComponent,
        PlaylistsListComponent,
        TracksListComponent,
        TimeConversionPipe,
        NavbarComponent,
        PlaylistItemComponent,
        PlaylistComponent,
        TrackItemComponent,
        FooterComponent,
        CallbackComponent
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
