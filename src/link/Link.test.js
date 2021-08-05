import { render, fireEvent } from '../test-utils';


import Link from './Link';

describe('Link', () => {
    it('should render the component correctly', () => {
        const { getByText } = render(
            <table>
                <tbody>
                    <Link
                        link={{ url: 'test url' }}
                        index={0}
                        pageIndex={0}
                    />
                </tbody>
            </table>);

        expect(getByText('test url')).toBeInTheDocument();
    });

    it('should call the removeElement function', () => {
        const removeElement = jest.fn();
        const { getByText } = render(
            <table>
                <tbody>
                    <Link
                        link={{ url: 'test url' }}
                        removeElement={removeElement}
                        index={0}
                        pageIndex={0}
                    />
                </tbody>
            </table>);

        fireEvent.click(getByText('Delete'));
        expect(removeElement).toHaveBeenCalled();
    });
});