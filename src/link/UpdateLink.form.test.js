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
