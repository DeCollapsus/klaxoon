import { useEffect } from 'react';
import { array, func, object } from 'prop-types';

import { connect } from 'react-redux';

import CreateElementForm from './CreateElement.form';
import Link from './Link';

const Links = ({ addToList, getList, links, loading }) => {

    useEffect(() => {
        getList();
    }, [getList]);

    const list = (data) => data.map((el) => (<Link
        key={el.url}
        link={el}
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
                </tr>
                </thead>
                <tbody>
                    { list(links) }
                    { links.length === 0 && <tr><td colSpan={8}>No link available</td></tr> }
                </tbody>  
            </table>
        </div>
    )
};

Links.propTypes = {
    addToList: func,
    getList: func,
    links: array,
    loading: object
};

const mapState = ({ link, loading }) => ({
    links: link.list,
    loading: loading.effects.link
});

const mapDispatch = ({ link }) => ({
    addToList: link.addToList,
    getList: link.getList
});

export default connect(mapState, mapDispatch)(Links);