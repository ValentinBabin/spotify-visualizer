import { Playlist } from "./playlist";

export class User {
    public country: string;
    public displayName: string;
    public email: string;
    public externalUrlSpotify: string;
    public href: string;
    public id: string;
    public imageUrl: string;
    public type: string;
    public uri: string;
    public playlists: Playlist[];

    constructor(
        country: string,
        displayName: string,
        email: string,
        externalUrlSpotify: string,
        href: string,
        id: string,
        imageUrl: string,
        type: string,
        uri: string
    ) {
        this.country = country;
        this.displayName = displayName;
        this.email = email;
        this.externalUrlSpotify = externalUrlSpotify;
        this.href = href;
        this.id = id;
        this.imageUrl = imageUrl;
        this.type = type;
        this.uri = uri;
    }
}
