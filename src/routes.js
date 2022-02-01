import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard'
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Post from "./Components/Post/Post";
import Yourdex from "./Components/Yourdex/Yourdex"
import Map from "./Components/Map/Map"

export default (
        <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/register' component={Register}/>
            <Route path='/dashboard' component={Login}/>
            <Route path='/map' component={Map}/>
            <Route path='/yourdex' component={Yourdex}/>
            <Route path='/post/:id' component={Post}/>
        </Switch>
)