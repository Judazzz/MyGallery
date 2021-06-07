export class Gallery {
    id: number;
    title: string;
    description: string;
    images: any;

    constructor(galleryObj) {
        this.id = galleryObj.id;
        this.title = galleryObj.title;
        this.description = galleryObj.description;
        this.images = galleryObj.images;
    }
}
