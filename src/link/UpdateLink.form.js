import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { func, object } from 'prop-types';

import { Link } from 'react-router-dom';

const UpdateLinkForm = ({ getLink, link }) => {
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

    if (!link) return (<Link to="/"><button>Go back</button></Link>);

    return (
        <>
            <Link to="/"><button>Go back</button></Link>
            <h1 data-testid={`title-${id}`}>{ link.title }</h1>
            <h3>{ link.url }</h3>
        </>
    );
};

UpdateLinkForm.propTypes = {
    getLink: func,
    link: object
};

const mapState = ({ link }) => ({
    link: link.current
});

const mapDispatch = ({ link }) => ({
    getLink: link.getSingleLink
});

export default connect(mapState, mapDispatch)(UpdateLinkForm);