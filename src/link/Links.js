import { useEffect } from 'react';
import { array, func, number, object } from 'prop-types';

import { connect } from 'react-redux';

import CreateElementForm from './CreateElement.form';
import Link from './Link';

const Links = ({
    addToList,
    count,
    getList,
    goToPage,
    links,
    loading,
    pageIndex,
    removeElement
}) => {

    useEffect(() => {
        getList();
    }, [getList]);

    const list = (data) => data.map((el) => (<Link
        key={el.url}
        link={el}
        removeElement={removeElement}
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

Links.propTypes = {
    addToList: func,
    count: number,
    getList: func,
    goToPage: func,
    links: array,
    loading: object,
    pageIndex: number,
    removeElement: func
};

const mapState = ({ link, loading }) => ({
    count: link.count,
    links: link.list,
    loading: loading.effects.link,
    pageIndex: link.pageIndex
});

const mapDispatch = ({ link }) => ({
    addToList: link.addToList,
    getList: link.getList,
    goToPage: link.goToPage,
    removeElement: link.removeFromList
});

export default connect(mapState, mapDispatch)(Links);