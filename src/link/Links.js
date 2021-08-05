import { useEffect } from 'react';
import { array, func, object } from 'prop-types';

import { connect } from 'react-redux';

import CreateElementForm from './CreateElement.form';

const Links = ({ addToList, getList, links, loading }) => {

    useEffect(() => {
        getList();
    }, [getList]);

    const list = (data) => data.map((el) => <div key={el.url}>{ el.title }</div>)

    return (
        <div>
            <CreateElementForm
                onSubmit={addToList}
                name="url"
                placeholder="Vimeo or Flickr url"
                title="Create Link"
                loading={loading.addToList}
            />
            { list(links) }
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