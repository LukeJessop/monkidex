import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard'
import Login from "./Components/Login";
import Register from "./Components/Register";
import Post from "./Components/Post";
import Yourdex from "./Components/Yourdex"
import Map from "./Components/Map"

export default (
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/map' component={Map}/>
            <Route path='/yourdex' component={Yourdex}/>
            <Route path='/post/:id' component={Post}/>
        </Switch>
)