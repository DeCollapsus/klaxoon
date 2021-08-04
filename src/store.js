import { init } from "@rematch/core";

import { link } from './link/model';
import LinkService from './link/service';

const store = init(
    {
        models: {
            link: link(new LinkService())
        }
    });

export default store;