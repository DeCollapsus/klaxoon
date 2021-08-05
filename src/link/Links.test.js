import { fireEvent, renderWithRematchStore, waitFor } from '../test-utils';
import { act } from 'react-dom/test-utils';

import store from '../store';

import { ToastContainer } from "react-toastify";

import Links from './Links';

describe('Links', () => {
    it('should render the component correctly', () => {
        const { getByText } = renderWithRematchStore(<Links />, store);

        expect(getByText('No link available')).toBeInTheDocument();
    });

    it('should display toast error when wrong provider is given', async () => {
        const { getByText, getByPlaceholderText } = renderWithRematchStore(<>
            <ToastContainer />
            <Links />
        </>, store);
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
});

