import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MyAppBar from './AppBar';
import Detail from './Detail';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDOM.render(
    <MuiThemeProvider>
        <BrowserRouter>
        <div>
            <MyAppBar/>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/detail" component={Detail}/>
            </Switch>
        </div>
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();
