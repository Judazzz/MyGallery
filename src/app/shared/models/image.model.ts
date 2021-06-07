export class Image {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: any;

    constructor(imageObj) {
        this.id = imageObj.id;
        this.albumId = imageObj.albumId;
        this.title = imageObj.title;
        this.url = imageObj.url;
        this.thumbnailUrl = imageObj.thumbnailUrl;
    }
}
