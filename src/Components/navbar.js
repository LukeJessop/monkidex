import { Component } from "react";
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux'

function Navbar(){
    const location = useLocation()
    if(location.pathname === '/' || location.pathname === '/register'){}else{
        return(
        <div className='navbar'>
            <h1 className='monkidex'>Monkidex</h1>
            <div className='spacer'></div>
            <div className='buttons'>
                <Link className='button' to='/dashboard'><span>Feed</span></Link>
                <Link className='button' to='/map'><span>Map</span></Link>
                <Link className='button' to='/yourdex'><span>Profile</span></Link>
                <Link className='button' to='/' ><span>Logout</span></Link>
            </div>
        </div>
        )
    }
    return(
        <div className='navbar'>
            <h1 className='monkidex'>Monkidex</h1>
        </div>
    )
}


export default Navbar