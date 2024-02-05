export class Artist {
    private externalUrlSpotify: string;
    private href: string;
    private id: string;
    public name: string;
    private type: string;
    private uri: string;

    constructor(
        externalUrlSpotify: string,
        href: string,
        id: string,
        name: string,
        type: string,
        uri: string
    ) {
        this.externalUrlSpotify = externalUrlSpotify;
        this.href = href;
        this.id = id;
        this.name = name;
        this.type = type;
        this.uri = uri;
    }
}
