import React, {Component} from 'react'
import './comments.css'
class Comments extends Component {
    constructor(){
        super()
        this.state = {
            commentArray : [],

        }
    }
    render(){
        return(
            <div className="comments-container">Comments go here :)</div>
        )
    }
}

export default Comments