import React, {Component} from 'react'
import {connect} from 'react-redux'
import './comments.css'
import axios from 'axios'
class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            commentArray : [],
            newCommentBody: ''
        }
        this.postComment = this.postComment.bind(this)
    }

    componentDidMount(){
        let {postId} = this.props
        axios
        .get(`/api/comment/${postId}`)
        .then((res) => {
            console.log(res)
            this.setState({
                commentArray: res.data
            })
        })
    }

    postComment(){
        let {newCommentBody} = this.state
        let {postId, userId} = this.props
        console.log('create comment ran!')
        axios
        .post('/api/comment', {newCommentBody, postId, userId})
        .then((res) => {
            console.log(res)
            window.location.reload()
        })
    }



    render(){
        const comments = this.state.commentArray.map((element) => {
            return(
                <div className='comment-container'>
                    <div className='comment-author-info'>
                        <img className='comment-author-pfp'  src={element.profile_picture}/>
                        <div className='comment-author'>{element.username}</div>
                    </div>
                    <div className='comment-body'>{element.body}</div>
                </div>
            )
        })
        return(
            <div className='comment-outer-container'>
                <div className='new-comment-container'>
                    <textarea onChange={(e) => this.setState({newCommentBody: e.target.value})} className='comment-text-area' placeholder='comment on this post'/>
                    <button className='send-comment-button' onClick={this.postComment}>Send</button>
                </div>
                {comments}
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userId: state.userId,
        username: state.username
    }
  }

export default connect(mapStateToProps)(Comments)