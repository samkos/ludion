import React from 'react';
import './App.css';
import DisplayServices from './components/DisplayServices';
import Nav from './components/Nav';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'


import { Router, Route, Switch } from 'react-router-dom';
import history from './lib/history';



function renderDisplay() {
	
  return (
            <Switch>
              {/* <Route path="/job" exact component={TableForecast} /> */}
              <Route path="/" exact component={DisplayServices} />
              <Route path="/service/:target" exact component={Nav} /> 
              {/* <Route path="/job/:target/:from_date" exact component={Nav} />
              <Route path="/job/:target/:from_date/:attempt" exact component={Nav} />
              <Route path="/job/:target/:from_date/:attempt/:ui_component" exact component={Nav} />
              <Route component={NoMatch} /> */}
            </Switch>                  
  )
}




function App() {
  return (
    <div>
    <div className="Signout">
	    <AmplifySignOut />
    </div>
	  <div className="App">
      <Router history={history}>
        <div>
          { renderDisplay() }
        </div>
      </Router>
    </div>
    </div>
  );
}


export default withAuthenticator(App);
//export default App;
