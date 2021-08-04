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
        async getLink({ url }) {
            const response = await service.getNoEmbedResponse(url);
            dispatch.link.updateCurrent(response);
        }
    })
});