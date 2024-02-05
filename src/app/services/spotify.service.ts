import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { NavigationService } from './navigation.service';
import * as moment from 'moment';
import { Playlist } from '../models/playlist';
import { Track } from '../models/track';
import { Album } from '../models/album';
import { Artist } from '../models/artist';
import { UtilsService } from './utils.service';
import { Buffer } from 'buffer';

export interface TokenObject {
    access_token: string;
    token_type: string;
    expires_in: string;
    date: moment.Moment;
    expiration_time: moment.Moment;
}

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {

    private static ACCESS_OBJECT_KEY = 'ACCESS_OBJECT';

    private clientId: string = environment.client_id;
    private redirectUri: string = environment.redirect_uri;
    private redirectUriHome: string = environment.redirect_uri_abs;
    private redirectUriCallback: string = environment.redirect_uri_callback;

    private accessToken: string;
    private tokenType: string;
    private expireIn: number;

    public user: User;

    constructor(
        private readonly navigationService: NavigationService,
        private readonly utilsService: UtilsService,
        private readonly httpClient: HttpClient
    ) { }

    public login() {
        const params: object = {
            response_type: 'code',
            client_id: this.clientId,
            scope: 'user-read-private user-read-email playlist-read-private user-library-read ugc-image-upload user-follow-read',
            redirect_uri: this.redirectUriCallback
        };
        const query = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');
        console.log(query);
        window.location.href = 'https://accounts.spotify.com/authorize?' + query;
    }

    public logout() {
        localStorage.removeItem(SpotifyService.ACCESS_OBJECT_KEY);
        this.navigationService.navigateToPage('/login');
    }

    public getToken(code?: string): Promise<TokenObject> {
        return new Promise((resolve, reject) => {
            const headers = {
                'Authorization': 'Basic ' + Buffer.from(`${this.clientId}:${environment.client_secret}`, 'utf-8').toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            let httpParams = new HttpParams()
                .append("grant_type", "authorization_code")
                .append("code", code)
                .append("redirect_uri", this.redirectUriCallback);

            if (this.accessToken == null) {
                this.httpClient.post('https://accounts.spotify.com/api/token', httpParams, { headers: headers }).subscribe((data: any) => {

                    const accessObject: TokenObject = {
                        access_token: data.access_token,
                        token_type: data.token_type,
                        expires_in: data.expires_in,
                        date: moment.utc().local(),
                        expiration_time: moment.utc().local().add(data.expires_in, 's')
                    };

                    this.accessToken = accessObject.access_token;
                    this.tokenType = accessObject.token_type;

                    localStorage.setItem(SpotifyService.ACCESS_OBJECT_KEY, JSON.stringify(accessObject));

                    return resolve(accessObject);
                }, (error) => {
                    return reject(JSON.stringify(error));
                });
            }

        });
    }

    /**
     * Method that get data user and return it
     */
    public getUserRequest(accessToken: TokenObject): Promise<User> {
        return new Promise((resolve) => {
            // Create http header with the access token and the token type
            const headers = { Authorization: `${this.tokenType} ` + this.accessToken };
            // Request at 'https://api.spotify.com/v1/me' and return data
            this.httpClient.get('https://api.spotify.com/v1/me', { headers }).subscribe((dataUser: any) => {
                // Create an user with the data
                this.user = new User(
                    dataUser.country,
                    dataUser.display_name,
                    dataUser.email,
                    dataUser.external_urls.spotify,
                    dataUser.href,
                    dataUser.id,
                    dataUser.images[0].url,
                    dataUser.type,
                    dataUser.uri);

                // Return the user
                if (localStorage.getItem(`user_${this.user.id}`)) {
                    this.user = JSON.parse(localStorage.getItem(`user_${this.user.id}`));
                    return resolve(this.user);
                } else {
                    this.getPlaylistsRequest().then((playlists: Playlist[]) => {
                        this.user.playlists = playlists;
                        return resolve(this.user);
                    });
                }
            }, (error) => {
                this.navigationService.navigateToPage('/home');
            });
        });
    }

    private getPlaylistsRequest(): Promise<Playlist[]> {
        return new Promise((resolve) => {
            const headers = { Authorization: `${this.tokenType} ` + this.accessToken };
            this.httpClient.get(`https://api.spotify.com/v1/me/playlists?limit=50`, { headers }).subscribe((res: any) => {

                this.getPlaylistsFromObject(res.items).then((playlists: Playlist[]) => {
                    return resolve(playlists);
                }).catch((error) => {
                    console.error(error);
                });

            });
        });
    }

    private getPlaylistsFromObject(items): Promise<Playlist[]> {
        return new Promise((resolve) => {
            let playlists: Playlist[] = [];

            for (const item of items) {

                this.getPlaylistFromObject(item).then((playlist: Playlist) => {
                    // console.log('playlist: ', playlist);
                    playlists.push(playlist);
                }).catch((error) => {
                    console.error(error);
                });
            }

            return resolve(playlists);

        });
    }

    private getPlaylistFromObject(itemTracks): Promise<Playlist> {
        return new Promise((resolve) => {
            const headers = { Authorization: `${this.tokenType} ` + this.accessToken };
            this.httpClient.get(itemTracks.tracks.href, { headers }).subscribe((playlist: any) => {
                let tracks: Track[] = [];

                // for (const item of playlist.items) {
                //     this.getTrackFromObject(item).then((track: Track) => {
                //         // console.log('track: ', track);
                //         tracks.push(track);
                //     }).catch((error) => { console.error(error); });
                // }

                return resolve(
                    new Playlist(
                        itemTracks.description,
                        itemTracks.external_urls.spotify,
                        itemTracks.href,
                        itemTracks.id,
                        (itemTracks.images[0] && itemTracks.images[0].url) ? itemTracks.images[0].url : '',
                        itemTracks.name,
                        itemTracks.owner,
                        itemTracks.tracks.href,
                        tracks,
                        itemTracks.type,
                        itemTracks.uri
                    )
                );
            });
        });
    }

    public getPlaylistFromID(id: string): Promise<Playlist> {
        return new Promise((resolve) => {
            const headers = { Authorization: `${this.tokenType} ` + this.accessToken };
            this.httpClient.get(`https://api.spotify.com/v1/playlists/${id}`, { headers }).subscribe((playlist: any) => {
                let tracks: Track[] = [];

                playlist.tracks.items.forEach(item => {
                    this.getTrackFromObject(item).then((track: Track) => {
                        tracks.push(track);
                    }).catch((error) => { console.error(error); });
                });

                return resolve(
                    new Playlist(
                        this.utilsService.htmlDecode(playlist.description),
                        playlist.external_urls.spotify,
                        playlist.href,
                        playlist.id,
                        (playlist.images[0] && playlist.images[0].url) ? playlist.images[0].url : '',
                        playlist.name,
                        playlist.owner,
                        playlist.tracks.href,
                        tracks,
                        playlist.type,
                        playlist.uri
                    )
                );
            });
        });
    }

    private getTrackFromObject(itemTrack): Promise<Track> {
        return new Promise((resolve) => {
            let artists: Artist[] = [];
            for (const itemArtist of itemTrack.track.artists) {
                this.getArtistsFromTrack(itemArtist).then((artist: Artist) => {
                    artists.push(artist);
                }).catch((error) => { console.error(error); });
            }

            return resolve(
                new Track(
                    new Album(
                        itemTrack.track.album.type,
                        artists,
                        itemTrack.track.album.external_urls.spotify,
                        itemTrack.track.album.href,
                        itemTrack.track.album.id,
                        itemTrack.track.album.images[0].url,
                        itemTrack.track.album.name,
                        itemTrack.track.album.release_date,
                        itemTrack.track.album.release_date_precision,
                        itemTrack.track.album.total_tracks,
                        itemTrack.track.album.type,
                        itemTrack.track.album.uri
                    ),
                    artists,
                    itemTrack.track.disc_number,
                    itemTrack.track.duration_ms,
                    itemTrack.track.external_urls.spotify,
                    itemTrack.track.href,
                    itemTrack.track.id,
                    itemTrack.track.name,
                    itemTrack.track.popularity,
                    itemTrack.track.preview_url,
                    itemTrack.track.track_number,
                    itemTrack.track.type,
                    itemTrack.track.uri
                )
            );
        });
    }

    private getArtistsFromTrack(itemArtist): Promise<Artist> {
        return new Promise((resolve) => {
            const artist = new Artist(
                itemArtist.external_urls.spotify,
                itemArtist.href,
                itemArtist.id,
                itemArtist.name,
                itemArtist.type,
                itemArtist.uri
            );
            return resolve(artist);
        });
    }
}
