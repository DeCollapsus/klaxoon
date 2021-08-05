import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { bool, func, object } from 'prop-types';

import { Link } from 'react-router-dom';

import CreateElementForm from './CreateElement.form';

const UpdateLinkForm = ({ addTag, getLink, link, loading, removeTag }) => {
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        (async () => {
          try {
            await getLink(id);
          } catch (err) {
            history.push("/");
          }
        })();
      }, [getLink, id, history]);

    if (!link) return (<Link to="/"><button className="primary">Go back</button></Link>);

    const tagList = link.tags.map((el) => (<div className="tag" key={el} onClick={() => removeTag({index: id, tag: el})}>{ el }</div>));

    return (
        <>
            <Link to="/"><button>Go back</button></Link>
            <h1 data-testid={`title-${id}`}>{ link.title }</h1>
            <h3>{ link.url }</h3>
            { tagList }
            <CreateElementForm
                onSubmit={(payload) => addTag(id)(payload)}
                name="tag"
                placeholder="music, tutorial..."
                title="Create tag"
                loading={loading}
            />
        </>
    );
};

UpdateLinkForm.propTypes = {
    addTag: func,
    getLink: func,
    link: object,
    loading: bool,
    removeTag: func
};

const mapState = ({ link, loading }) => ({
    link: link.current,
    loading: loading.effects.link.addTag
});

const mapDispatch = ({ link }) => ({
    addTag: link.addTagToLink,
    getLink: link.getSingleLink,
    removeTag: link.removeTagFromLink
});

export default connect(mapState, mapDispatch)(UpdateLinkForm);