import { func, number, object } from 'prop-types';
import { Link as Route } from 'react-router-dom';

const Link = ({ index, link, pageIndex, removeElement }) => {
    if (!link) return null;

    return (
        <tr data-testid={`row-${pageIndex * 5 + index}`}>
            <td>{ link.url }</td>
            <td>{ link.title }</td>
            <td>{ link.author }</td>
            <td>{ link.uploadDate }</td>
            <td>{ link.width }</td>
            <td>{ link.height }</td>
            <td>{ link.duration }</td>
            <td>
                <button onClick={() => removeElement(link.url)}>Delete</button>
                <Route to={`updateLink/${pageIndex * 5 + index}`}><button>Go to edit</button></Route>
            </td>
        </tr>
    );
};

Link.propTypes = {
    index: number,
    link: object,
    pageIndex: number,
    removeElement: func
};

export default Link;