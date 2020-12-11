import Axios from "axios";
import { Component } from "react";
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {updateUser} from './../redux/reducer'

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
            <div className="container postContainer">
                <div className="loginBox">
                    <h1 className='title'>Login</h1>
                    <input className='usernameInput' placeholder='username' onChange={(e) => this.setState({username: e.target.value})}></input>
                    <input className='password' placeholder='password' type='password' onChange={(e) => this.setState({password: e.target.value})}></input>
                    <br/>
                    <button onClick={this.login}>Login</button>
                    <br/>
                    <br/>
                    <Link to='/register' className='registerLink'>Dont have an account? Register here!</Link>
                </div>
            </div>
        )
    }
}


export default connect(null, {updateUser})(Login)