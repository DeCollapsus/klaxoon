import { object } from 'prop-types';

const Link = ({ link }) => {
    if (!link) return null;

    return (
        <tr>
            <td>{ link.url }</td>
            <td>{ link.title }</td>
            <td>{ link.author }</td>
            <td>{ link.uploadDate }</td>
            <td>{ link.width }</td>
            <td>{ link.height }</td>
            <td>{ link.duration }</td>
        </tr>
    );
};

Link.propTypes = {
    link: object
};

export default Link;