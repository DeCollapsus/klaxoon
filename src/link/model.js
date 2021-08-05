export const link = (service, toast) => ({
    state: {
        current: null,
        list: [],
        pageIndex: 0,
        count: 0
    },
    reducers: {
        updateCurrent: (state, current) => ({
            ...state,
            current
        }),
        updateList: (state, list) => ({
            ...state,
            list
        }),
        updatePage: (state, payload) => ({
            ...state,
            ...payload
        })
    },
    effects: (dispatch) => ({
        async addToList({ url }) {
            try {
                await service.addElementToList(url);
                dispatch.link.getList();
            } catch (error) {
                toast.error(error.message);
            }
        },
        getList(_, { link }) {
            try {
                const { list, count } = service.getPageFromList(link.pageIndex);
                dispatch.link.updatePage({ count });
                dispatch.link.updateList(list);
            } catch (error) {
                toast.error(error.message);
            }
        },
        removeFromList(url) {
            try {
                service.removeElementFromList(url);
                dispatch.link.getList();
            } catch (error) {
                toast.error(error.message);
            }
        },
        goToPage(pageIndex) {
            try {
                const { count, list } = service.getPageFromList(pageIndex);
                dispatch.link.updatePage({ pageIndex, count });
                dispatch.link.updateList(list);
            } catch (error) {
                toast.error(error.message);
            }            
        },
        async populate() {
            try {
                await service.populate();
                dispatch.link.getList();
            } catch (error) {
                toast.error(error.message);
            }
        }
    })
});