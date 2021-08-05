import { render, fireEvent } from '../test-utils';
import { act } from 'react-dom/test-utils';

import { MemoryRouter, Route } from 'react-router-dom';

import Link from './Link';

describe('Link', () => {
    it('should render the component correctly', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={["/"]}>
                <table>
                    <tbody>
                        <Link
                            link={{ url: 'test url' }}
                            index={0}
                            pageIndex={0}
                        />
                    </tbody>
                </table>
            </MemoryRouter>);

        expect(getByText('test url')).toBeInTheDocument();
    });

    it('should call the removeElement function', () => {
        const removeElement = jest.fn();
        const { getByText } = render(
            <MemoryRouter initialEntries={["/"]}>
                <table>
                    <tbody>
                        <Link
                            link={{ url: 'test url' }}
                            removeElement={removeElement}
                            index={0}
                            pageIndex={0}
                        />
                    </tbody>
                </table>
            </MemoryRouter>);

        fireEvent.click(getByText('Delete'));
        expect(removeElement).toHaveBeenCalled();
    });

    it('should navigate to edit page', () => {
        let testLocation;
        const { getByText } = render(<MemoryRouter initialEntries={["/"]}>
            <table>
                <tbody>
                    <Link link={{ url: 'test url' }} removeElement={() => {}} index={0} pageIndex={0} />
                </tbody>
            </table>
            <Route
                path="*"
                render={({ location }) => {
                    testLocation = location;
                    return null;
                }}
            />
        </MemoryRouter>);
        act(() => {
            fireEvent.click(getByText('Go to edit'));
        });

        expect(testLocation.pathname).toBe('/updateLink/0');
    });
});