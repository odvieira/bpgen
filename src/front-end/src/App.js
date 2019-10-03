import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.scss';
import logo from './logo.png'

import HomePage from './pages/HomePage/HomePage.component';
import SearchPage from './pages/SearchPage/SearchPage.component'
import CreatePage from './pages/CreatePage/CreatePage.component'
import AutoNavBar from './components/AutoNavBar/AutoNavBar.component';
import ItemPage from './pages/ItemPage/ItemPage.component'
import NotFound from './pages/NotFound/NotFound.component'

import APP_PAGES_DATA from './models/AppPages/AppPages';

class App extends React.Component
{
  render() {
    return(
      <div className='App'>
        <div className='app-content'>
          <AutoNavBar items={ APP_PAGES_DATA } title='Boarding Pass Generator' logoRef='https://www.cinq.com.br/en/' logoAlt="CINQ" logoUrl={ logo }/> 
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/search' component={SearchPage} />
              <Route exact path='/create' component={CreatePage}/>
              <Route exact path='/item/:id' component={ItemPage}/>
              <Route path="*" component={ NotFound }/>
            </Switch>
          </BrowserRouter>
        </div>
        <footer className="app-footer">
          <div>
            <a href="https://www.cinq.com.br/en/">CINQ Technologies </a>
            <span>&copy;</span>
          </div>
          <div className="app-footer-ref">
            <span>Created by </span>
            <a href="https://github.com/odvieira">Daniel Vieira</a>
          </div>
        </footer>
      </div>
    )
  }
}

export default App;
