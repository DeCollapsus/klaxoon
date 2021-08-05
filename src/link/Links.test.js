import { fireEvent, renderWithRematchStore, waitFor } from '../test-utils';
import { act } from 'react-dom/test-utils';

import { MemoryRouter, Route } from 'react-router-dom';

import store from '../store';

import { ToastContainer } from "react-toastify";

import Links from './Links';

describe('Links', () => {
    it('should render the component correctly', () => {
        const { getByText } = renderWithRematchStore(<MemoryRouter initialEntries={["/"]}>
        <Links />
    </MemoryRouter>, store);

        expect(getByText('No link available')).toBeInTheDocument();
    });

    it('should display toast error when wrong provider is given', async () => {
        const { getByText, getByPlaceholderText } = renderWithRematchStore(<MemoryRouter initialEntries={["/"]}>
            <ToastContainer />
            <Links />
        </MemoryRouter>, store);
        fireEvent.input(getByPlaceholderText('Vimeo or Flickr url'), {
            target: {
                value: 'https://www.youtube.com/watch?v=jJdlgKzVsnI'
            }
        });

        act(() => {
            fireEvent.submit(getByText('Create Link'));
        });
        await waitFor(() => {
            expect(getByText('Wrong provider: only Vimeo or Flickr are accepted')).toBeInTheDocument();
        });
    });

    it('should add the link to the table', async () => {
        const { getByText, getByPlaceholderText } = renderWithRematchStore(<MemoryRouter initialEntries={["/"]}>
        <Links />
    </MemoryRouter>, store);
        fireEvent.input(getByPlaceholderText('Vimeo or Flickr url'), {
            target: {
                value: 'https://www.flickr.com/photos/149909089@N03/51339434795/in/explore-2021-07-27/'
            }
        });

        act(() => {
            fireEvent.submit(getByText('Create Link'));
        });
        await waitFor(() => {
            expect(getByText('Sleepy meadow')).toBeInTheDocument();
        });
    });

    it('should delete the link from the table', async () => {
        const { getByText, queryByText } = renderWithRematchStore(<MemoryRouter initialEntries={["/"]}>
        <Links />
    </MemoryRouter>, store);

        act(() => {
            fireEvent.click(getByText('Delete'));
        });
        await waitFor(() => {
            expect(queryByText('Sleepy meadow')).not.toBeInTheDocument();
        });
    });

    it('should populate the table', async () => {
        const { getByText, getByTestId } = renderWithRematchStore(<MemoryRouter initialEntries={["/"]}>
        <Links />
    </MemoryRouter>, store);

        act(() => {
            fireEvent.click(getByText('Populate!'));
        });
        await waitFor(() => {
            expect(getByTestId('row-0')).toBeInTheDocument();
        });
    });

    it('should go to the next page', async () => {
        const { getByText, getByTestId } = renderWithRematchStore(<MemoryRouter initialEntries={["/"]}>
        <Links />
    </MemoryRouter>, store);
        act(() => {
            fireEvent.click(getByText('>'));
        });
        await waitFor(() => {
            expect(getByTestId('row-5')).toBeInTheDocument();
        });
    });

    it('should navigate to the UpdateLink page', async () => {
        let testLocation;
        const { getAllByText } = renderWithRematchStore(<MemoryRouter initialEntries={["/"]}>
            <Links />
            <Route
                path="*"
                render={({ location }) => {
                    testLocation = location;
                    return null;
                }}
            />
        </MemoryRouter>, store);

        act(() => {
            fireEvent.click(getAllByText('Go to edit')[0]);
        });
        expect(testLocation.pathname).toBe('/updateLink/5');
    });
});

