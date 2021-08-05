export const link = (service, toast) => ({
    state: {
        current: null,
        list: []
    },
    reducers: {
        updateCurrent: (state, current) => ({
            ...state,
            current
        }),
        updateList: (state, list) => ({
            ...state,
            list
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
        getList() {
            try {
                const response = service.getList(link.pageIndex);
                dispatch.link.updateList(response);
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
        }
    })
});