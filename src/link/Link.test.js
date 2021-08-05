import { render } from '../test-utils';


import Link from './Link';

describe('Link', () => {
    it('should render the component correctly', () => {
        const { getByText } = render(
            <table>
                <tbody>
                    <Link link={{ url: 'test url' }} />
                </tbody>
            </table>);

        expect(getByText('test url')).toBeInTheDocument();
    });

});