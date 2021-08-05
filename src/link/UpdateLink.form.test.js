import { fireEvent, renderWithRematchStore, waitFor } from '../test-utils';
import { act } from 'react-dom/test-utils';

import store from '../store';

import { MemoryRouter, Route } from 'react-router-dom';
import routeData from 'react-router';

import UpdateLinkForm from './UpdateLink.form';

describe('UpdateLinkForm', () => {

    beforeEach(() => {
        jest.spyOn(routeData, 'useParams').mockReturnValue({ id: 0 });
      });

    it('should render the component correctly', async () => {
        await store.dispatch.link.populate();
        const { getByTestId } = renderWithRematchStore(<MemoryRouter initialEntries={["/updateLink/0"]}>
            <UpdateLinkForm />
        </MemoryRouter>, store);
    
        await waitFor(() => {
            expect(getByTestId('title-0')).toBeInTheDocument();
        });
    });

    it('should create tag', async () => {
        const { getByText, getByPlaceholderText } = renderWithRematchStore(<MemoryRouter initialEntries={["/updateLink/0"]}>
            <UpdateLinkForm />
        </MemoryRouter>, store);

        fireEvent.input(getByPlaceholderText('music, tutorial...'), {
            target: {
                value: 'test'
            }
        });

        act(() => {
            fireEvent.submit(getByText('Create tag'));
        });
        await waitFor(() => {
            expect(getByText('test')).toBeInTheDocument();
        });
    });

    it('should delete tag', async () => {
        const { getByText, queryByText } = renderWithRematchStore(<MemoryRouter initialEntries={["/updateLink/0"]}>
            <UpdateLinkForm />
        </MemoryRouter>, store);
        
        act(() => {
            fireEvent.click(getByText('test'));
        });
        await waitFor(() => {
            expect(queryByText('test')).not.toBeInTheDocument();
        });
    });

    it('should navigate back to home', async () => {
        let testLocation;
        const { getByText } = renderWithRematchStore(<MemoryRouter initialEntries={["/updateLink/0"]}>
            <UpdateLinkForm />
            <Route
                path="*"
                render={({ location }) => {
                    testLocation = location;
                    return null;
                }}
            />
        </MemoryRouter>, store);

        act(() => {
            fireEvent.click(getByText('Go back'));
        });
        expect(testLocation.pathname).toBe('/');
    });
});
