import { FunctionComponent } from 'react';
import { Link as Route } from 'react-router-dom';
import { Link as LinkType } from './service';

interface ILinkProps {
    index: number,
    link: LinkType,
    pageIndex: number,
    removeElement: (url: string) => void
};

const Link: FunctionComponent<ILinkProps> = ({ index, link, pageIndex, removeElement }) => {
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
                <button className="danger" onClick={() => removeElement(link.url)}>Delete</button>
                <Route to={`updateLink/${pageIndex * 5 + index}`}><button className="primary">Go to edit</button></Route>
            </td>
        </tr>
    );
};

export default Link;