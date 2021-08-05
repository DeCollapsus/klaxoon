import { data, noEmbedMapper } from './utils';

type Link = {
    url: string,
    title: string,
    author: string,
    uploadDate: string,
    height: number,
    width: number,
    duration: number,
    tags: string[]
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
         * 
         * @param {number} pageIndex la page à retourner (commencd à 0)
         * @returns {{ list: Array<Link>, count: number }} le tableau des liens de la page fournie en paramètre,
         * et le nombre total de liens disponibles
         */
        getPageFromList(pageIndex: number): { list: Link[], count: number } {
            try {
                return { 
                    list: this.list.slice(pageIndex * 5, pageIndex * 5 + 5),
                    count: this.list.length
                };
            } catch(error) {
                throw error;
            }
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

        /**
         * remplit la liste avec les données disponibles du fichier utils
         */
        async populate() {
            try {
                await Promise.allSettled(data.map((el) => this.addElementToList(el)));
            } catch (error) {
                throw error;
            }
        }

        /**
         * 
         * @param {number} index 
         * @returns {Link} le lien disponible à l'index donné en paramètre
         */
        getElementFromList(index: number): Link {
            try {
                return this.list[index];
            } catch(error) {
                throw error;
            }
        }

        /**
         * 
         * @param {number} index l'index du lien à modifier
         * @param {string} tag le tag à ajouter au lien correspondant
         * @returns {Link} le lien correspondant modifié
         */
        addTagToLink(index: number, tag: string): Link {
            try {
                if (this.list[index].tags.find((el) => el.toLowerCase() === tag.toLowerCase())) throw new Error('This tag already exists.');
                
                this.list[index].tags.push(tag);
                
                return this.list[index];
            } catch (error) {
                throw error;
            }
        }

        /**
         * 
         * @param {number} indexLink l'index du lien à modifier
         * @param {string} tag le tag à retirer
         * @returns le lien correspondant modifié
         */
        removeTagFromLink(indexLink: number, tag: string): Link {
            try {
                this.list[indexLink].tags = this.list[indexLink].tags.filter((el) => el !== tag);
                return this.list[indexLink];
            } catch (error) {
                throw error;
            }
        }
};

export default LinkService;