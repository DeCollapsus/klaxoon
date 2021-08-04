import './App.scss';
import { connect } from 'react-redux';

import { bool, func, object } from 'prop-types';

import CreateElementForm from './link/CreateElement.form';

const App = ({ getLink, link, loading }) => {

  return (
    <div className="App">
      <CreateElementForm
        onSubmit={getLink}
        name="url"
        placeholder="Vimeo or Flickr url"
        title="Create Link"
        loading={loading}
      />
      { link && link.title }

    </div>
  );
};

App.propTypes = {
  getLink: func,
  link: object,
  loading: bool
};

const mapState = ({ link, loading }) => ({
  link: link.current,
  loading: loading.effects.link.getLink
});

const mapDispatch = ({ link }) => ({
  getLink: link.getLink
});

export default connect(mapState, mapDispatch)(App);
