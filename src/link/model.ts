import { Models, RematchDispatch, RematchRootState } from '@rematch/core';
import LinkService, { Link } from './service';
import { toast as toastType } from 'react-toastify';

type LinkState = {
    current: Link | null,
    list: Array<Link>,
    pageIndex: number,
    count: number 
};

export const link = (service: LinkService, toast: any) => ({
    state: {
        current: null,
        list: [],
        pageIndex: 0,
        count: 0
    } as LinkState,
    reducers: {
        updateCurrent: (state: LinkState, current: Link) => ({
            ...state,
            current: {
                ...current,
                tags: [...current.tags]
            }
        }),
        updateList: (state: LinkState, list: Array<Link>) => ({
            ...state,
            list
        }),
        updatePage: (state: LinkState, payload: Partial<LinkState>) => ({
            ...state,
            ...payload
        })
    },
    effects: (dispatch: any) => ({
        async addToList({ url }: {url: string}): Promise<void> {
            try {
                await service.addElementToList(url);
                dispatch.link.getList();
            } catch (error: any) {
                toast.error(error.message);
            }
        },
        getList(_: any, { link }: { link: { pageIndex: number }}): void {
            try {
                const { list, count } = service.getPageFromList(link.pageIndex);
                dispatch.link.updatePage({ count });
                dispatch.link.updateList(list);
            } catch (error: any) {
                toast.error(error.message);
            }
        },
        removeFromList(url: string): void {
            try {
                service.removeElementFromList(url);
                dispatch.link.getList();
            } catch (error: any) {
                toast.error(error.message);
            }
        },
        goToPage(pageIndex: number): void {
            try {
                const { count, list } = service.getPageFromList(pageIndex);
                dispatch.link.updatePage({ pageIndex, count });
                dispatch.link.updateList(list);
            } catch (error: any) {
                toast.error(error.message);
            }            
        },
        async populate(): Promise<void> {
            try {
                await service.populate();
                dispatch.link.getList();
            } catch (error: any) {
                toast.error(error.message);
            }
        },
        getSingleLink(index: number): void {
            try {
                const response = service.getElementFromList(index);
                dispatch.link.updateCurrent(response);
            } catch (error: any) {
                toast.error(error.message);
                throw error;
            }
        },
        addTagToLink: (index: number) => ({ tag }: { tag: string }) => {
            try {
                const response = service.addTagToLink(index, tag);
                dispatch.link.updateCurrent(response);
            } catch (error: any) {
                toast.error(error.message);
            }
        },
        removeTagFromLink({ index, tag }: { index: number, tag: string }): void {
            try {
                const response = service.removeTagFromLink(index, tag);
                dispatch.link.updateCurrent(response);
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    })
});

const LinkType = link(new LinkService(), toastType);

export interface RootModel extends Models<RootModel> {
    link: (typeof LinkType)
};

export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>
