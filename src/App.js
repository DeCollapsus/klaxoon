import './App.scss';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { func, object } from 'prop-types';

const App = ({ getLink, link }) => {

  useEffect(() => {
    if (!link) getLink();
  }, [getLink, link])

  if (!link) return null;

  return (
    <div className="App">
      { link.title }
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
