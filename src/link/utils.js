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

export const data = [
    'https://vimeo.com/416673512',
    'https://www.flickr.com/photos/31779113@N06/51350073139/in/explore-2021-08-01/',
    'https://www.flickr.com/photos/sleepserum114/51349384165/in/explore-2021-08-01/',
    'https://www.flickr.com/photos/schmalpal/51347947627/in/explore-2021-08-01/',
    'https://vimeo.com/369521302',
    'https://www.flickr.com/photos/113375614@N02/51348150818/in/explore-2021-08-01/',
    'https://vimeo.com/42328207',
    'https://www.flickr.com/photos/photobrah/51350728718/in/explore-2021-08-01/',
    'https://vimeo.com/338877975',
    'https://vimeo.com/262186786'
];