import { toast } from "react-toastify";

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
            try {
                const response = await service.getNoEmbedResponse(url);
                dispatch.link.updateCurrent(response);
            } catch (error) {
                toast.error(error.message);
            }
        }
    })
});