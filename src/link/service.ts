import { noEmbedMapper } from './utils';

type Link = {
    url: string,
    title: string,
    author: string,
    uploadDate: string,
    height: number,
    width: number,
    duration: number
};

class LinkService {

    /**
     * 
     * @param {number} url le lien à ajouter à la liste
     * @returns {Link} les metadatas du lien correspondant
     */
    async getNoEmbedResponse(url: string): Promise<Link> {
        try {
            const response = await fetch(`https://noembed.com/embed?url=${url}`);
            const json = await response.json();

            if (json.error) {
                throw new Error(json.error);
            }

            if (json.provider_name !== 'Vimeo' && json.provider_name !== 'Flickr') {
                throw new Error('Wrong provider: only Vimeo or Flickr are accepted');
            }

            return noEmbedMapper(json);

        } catch (error) {
            throw error;
        }
    }
};

export default LinkService;