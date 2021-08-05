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
    private list: Link[] = [];

    /**
     * 
     * @param {number} url le lien à ajouter à la liste
     * @returns {Link} les metadatas du lien correspondant
     */
    private async getNoEmbedResponse(url: string): Promise<Link> {
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

        /**
         * ajoute le lien à la liste de liens
         * @param {string} url le lien à ajouter
         */
        public async addElementToList(url: string) {
            try {
                if (this.list.find((el) => el.url === url)) throw new Error('This link already exists.');
    
                const newEl = await this.getNoEmbedResponse(url);
    
                this.list = [...this.list, newEl];
            } catch (error) {
                throw error;
            }
        }

        /**
         * @returns {Link[]} la liste de liens
         */
        public getList(): Array<Link> {
            return this.list;
        }

    /**
     * retire un lien de la liste
     * @param url l'url du lien à retirer
     */
     removeElementFromList(url: string): void {
        try {
            this.list = this.list.filter((el) => el.url !== url);
        } catch (error) {
            throw error;
        }
    }
};

export default LinkService;