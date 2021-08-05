import { func, object } from 'prop-types';

const Link = ({ link, removeElement }) => {
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
            <td>
                <button onClick={() => removeElement(link.url)}>Delete</button>
            </td>
        </tr>
    );
};

Link.propTypes = {
    removeElement: func,
    link: object
};

export default Link;