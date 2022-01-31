import Axios from "axios";
import { Component } from "react";
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {updateUser} from './../../redux/reducer'
import './login.css'
class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
        this.login = this.login.bind(this);
    }

    login(){
        Axios.post('/auth/login', this.state).then(res => {
            this.props.updateUser(res.data);
            this.props.history.push('/yourdex')
        })
    }

    render(){
        return(
            <div className="loginbox-container">
                <div className="loginBox">
                    <h2 className='title'>Login</h2>
                    <div className="login-inputs">
                        <input className='username-input' placeholder='username' onChange={(e) => this.setState({username: e.target.value})}></input>
                        <input className='password-input' placeholder='password' type='password' onChange={(e) => this.setState({password: e.target.value})}></input>
                        <button className="login-button" onClick={this.login}>Login</button>
                    </div>
                        <Link to='/register'><button className="registerLink">Dont have an account? Register here!</button></Link>
                </div>
            </div>
        )
    }
}


export default connect(null, {updateUser})(Login)