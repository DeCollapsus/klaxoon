export const link = (service) => ({
    state: {
        current: null
    },
    reducers: {
        updateCurrent: (state, current) => ({
            ...state,
            current
        })
    },
    effects: (dispatch) => ({
        async getLink() {
            const response = await service.getNoEmbedResponse('https://www.youtube.com/watch?v=UTHLKHL_whs');
            dispatch.link.updateCurrent(response);
        }
    })
});