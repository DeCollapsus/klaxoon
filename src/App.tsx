import './App.scss';

import { Redirect, Route, Switch } from 'react-router-dom';

import Links from './link/Links';
import UpdateLinkForm from './link/UpdateLink.form';

const App = () => {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/"><Links /></Route>
        <Route path="/updateLink/:id"><UpdateLinkForm /></Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
