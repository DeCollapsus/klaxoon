import { init } from "@rematch/core";

import loadingPlugin from '@rematch/loading';
import { toast } from 'react-toastify';
import { link } from './link/model';
import LinkService from './link/service';


const store = init(
    {
        models: {
            link: link(new LinkService(), toast)
        },
        plugins: [loadingPlugin()]
    });

export default store;