import './App.scss';
import { connect } from 'react-redux';

import { string } from 'prop-types';

const App = ({ link }) => {
  return (
    <div className="App">
      { link }
    </div>
  );
};

App.propTypes = {
  link: string
};

const mapState = ({ link }) => ({
  link: link.current
});

export default connect(mapState, null)(App);
