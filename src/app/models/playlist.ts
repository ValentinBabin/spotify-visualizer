import { Track } from './track';

export interface Owner {
    externalUrlSpotify: string;
    href: string;
    id: string;
    type: string;
    uri: string;
}

export class Playlist {
    public description: string;
    private externalUrlSpotify: string;
    private href: string;
    public id: string;
    public imageUrl: string;
    public name: string;
    private owner: Owner;
    private tracksHref: string;
    public tracks: Track[];
    private type: string;
    private uri: string;

    constructor(
        description: string,
        externalUrlSpotify: string,
        href: string,
        id: string,
        imageUrl: string,
        name: string,
        owner: Owner,
        tracksHref: string,
        tracks: Track[],
        type: string,
        uri: string
    ) {
        this.description = description;
        this.externalUrlSpotify = externalUrlSpotify;
        this.href = href;
        this.id = id;
        this.imageUrl = imageUrl;
        this.name = name;
        this.owner = owner;
        this.tracksHref = tracksHref;
        this.tracks = tracks;
        this.type = type;
        this.uri = uri;
    }
}
