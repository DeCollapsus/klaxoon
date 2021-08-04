import { prop } from "ramda";

export const noEmbedMapper = (obj) => ({
    url: prop('url', obj),
    title: prop('title', obj),
    author: prop('author_name', obj),
    uploadDate: prop('upload_date', obj),
    height: prop('height', obj),
    width: prop('width', obj),
    duration: prop('duration', obj),
    tags: []
});