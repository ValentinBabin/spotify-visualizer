import { Artist } from './artist';

export class Album {
    private albumType: string;
    private artists: Artist[];
    private externalUrlSpotify: string;
    private href: string;
    private id: string;
    public imageUrl: string;
    public name: string;
    private releaseDate: string;
    private releaseDatePrecision: string;
    private totalTracks: number;
    private type: string;
    private uri: string;

    constructor(
        albumType: string,
        artists: Artist[],
        externalUrlSpotify: string,
        href: string,
        id: string,
        imageUrl: string,
        name: string,
        releaseDate: string,
        releaseDatePrecision: string,
        totalTracks: number,
        type: string,
        uri: string
    ) {
        this.albumType = albumType;
        this.artists = artists;
        this.externalUrlSpotify = externalUrlSpotify;
        this.href = href;
        this.id = id;
        this.imageUrl = imageUrl;
        this.name = name;
        this.releaseDate = releaseDate;
        this.releaseDatePrecision = releaseDatePrecision;
        this.totalTracks = totalTracks;
        this.type = type;
        this.uri = uri;
    }
}
