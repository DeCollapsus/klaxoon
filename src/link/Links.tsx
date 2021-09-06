import { FunctionComponent, useEffect } from 'react';

import { connect } from 'react-redux';

import CreateElementForm from './CreateElement.form';
import Link from './Link';

import { Link as LinkType } from './service';

interface ILinksProps {
    addToList: () => {},
    count: number,
    getList: () => void,
    goToPage: (page: number) => void,
    links: Array<LinkType>,
    loading: {
        addToList: boolean,
        populate: boolean
    },
    pageIndex: number,
    populate: () => void,
    removeElement: (url: string)  => {}
};

const Links: FunctionComponent<ILinksProps> = ({
    addToList,
    count,
    getList,
    goToPage,
    links,
    loading,
    pageIndex,
    populate,
    removeElement
}) => {

    useEffect(() => {
        getList();
    }, [getList]);

    const list = (data: Array<LinkType>) => data.map((el: LinkType, index: number) => (<Link
        key={el.url}
        link={el}
        removeElement={removeElement}
        index={index}
        pageIndex={pageIndex}
    />));

    return (
        <div>
            <CreateElementForm
                onSubmit={addToList}
                name="url"
                placeholder="Vimeo or Flickr url"
                title="Create Link"
                loading={loading.addToList}
            />
            <button disabled={loading.populate} onClick={populate}>Populate!</button>
            <table>
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Upload Date</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Duration (s)</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    { list(links) }
                    { links.length === 0 && <tr><td colSpan={8}>No link available</td></tr> }
                </tbody>  
            </table>
            { count > 5 && <div>
                {pageIndex !== 0 && <button className="primary" onClick={() => goToPage(pageIndex - 1)}>{'<'}</button>}{' '}
                <span>Showing page {pageIndex + 1} of {Math.ceil(count / 5)}</span>{' '}
                {pageIndex + 1 < Math.ceil(count / 5) && <button className="primary" onClick={() => goToPage(pageIndex + 1)}>{ '>' }</button>}
            </div> }
        </div>
    )
};

const mapState = ({ link, loading }: any) => ({
    count: link.count,
    links: link.list,
    loading: loading.effects.link,
    pageIndex: link.pageIndex
});

const mapDispatch = ({ link }: any) => ({
    addToList: link.addToList,
    getList: link.getList,
    goToPage: link.goToPage,
    populate: link.populate,
    removeElement: link.removeFromList
});

export default connect(mapState, mapDispatch)(Links);