import { init } from "@rematch/core";

import { link } from './link/model';

const store = init(
    {
        models: {
            link
        }
    });

export default store;