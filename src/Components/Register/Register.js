import axios from "axios";
import { Component } from "react";
import {Link, withRouter} from 'react-router-dom';
import {updateUser} from './../../redux/reducer'
import './../Login/login.css'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
        this.register = this.register.bind(this);
    }

    register(){
        axios.post('/auth/register', this.state).then(res => {
            this.props.history.push('/')
        })
    }

    render(){
        return(
            <div className="container postContainer">
                <div className="loginBox">
                    <h1 className='title'>Register</h1>
                    <input className='usernameInput' placeholder='username' onChange={(e) => this.setState({username: e.target.value})}></input>
                    <input className='password' placeholder='password' type='password' onChange={(e) => this.setState({password: e.target.value})}></input>
                    <br/>
                    <button onClick={this.register}>Register</button>
                    <br/>
                    <Link to='/' className='loginLink'>Already have an account? Login here!</Link>
                </div>
            </div>
        )
    }
}


export default Register