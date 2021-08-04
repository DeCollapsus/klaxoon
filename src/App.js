import './App.scss';
import { connect } from 'react-redux';

import { func, object } from 'prop-types';

import CreateElementForm from './link/CreateElement.form';

const App = ({ getLink, link }) => {

  return (
    <div className="App">
      <CreateElementForm
        onSubmit={getLink}
        name="url"
        placeholder="Vimeo or Flickr url"
        title="Create Link"
      />
      { link && link.title }

    </div>
  );
};

App.propTypes = {
  getLink: func,
  link: object
};

const mapState = ({ link }) => ({
  link: link.current
});

const mapDispatch = ({ link }) => ({
  getLink: link.getLink
});

export default connect(mapState, mapDispatch)(App);
