import { Artist } from './artist';
import { Album } from './album';

export class Track {
    public album: Album;
    public artists: Artist[];
    public discNumber: number;
    public durationInMs: number;
    public externalUrlSpotify: string;
    public href: string;
    public id: string;
    public name: string;
    public popularity: number;
    public previewUrl: string;
    public trackNumber: number;
    public type: string;
    public uri: string;

    constructor(
        album: Album,
        artists: Artist[],
        discNumber: number,
        durationInMs: number,
        externalUrlSpotify: string,
        href: string,
        id: string,
        name: string,
        popularity: number,
        previewUrl: string,
        trackNumber: number,
        type: string,
        uri: string
    ) {
        this.album = album;
        this.artists = artists;
        this.discNumber = discNumber;
        this.durationInMs = durationInMs;
        this.externalUrlSpotify = externalUrlSpotify;
        this.href = href;
        this.id = id;
        this.name = name;
        this.popularity = popularity;
        this.previewUrl = previewUrl;
        this.trackNumber = trackNumber;
        this.type = type;
        this.uri = uri;
    }
}
