import { Component } from "react";
import axios from 'axios'
import {connect} from 'react-redux'
class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            description: '',
            img: '',
            author: '',
            authorImg: '',
        }
        this.deletePost = this.deletePost.bind(this)
        this.editPost = this.editPost.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        axios.get(`/api/post/${this.props.match.params.id}`)
          .then(res => {
              const {description, img_link, username, profile_picture} = res.data
            this.setState({
                description: description,
                img: img_link,
                author: username,
                authorImg: profile_picture
            })
        })
    }
    editPost(){
        axios.put(`/api/post/${this.props.match.params.id}`, this.state)
        .then(() => this.props.history.push(`/dashboard`))
    }
    deletePost(){
        console.log(this.props.match.params.id)
        axios.delete(`/api/post/${this.props.match.params.id}`)
        .then(() => this.props.history.push('/yourdex'))
    }
    render(){
        const {description, img, author} = this.state
        if(this.props.username === author){
            return(
            <div className="container">
                <div className="postContainer">
                    <div className="imgContainerPost">
                        <img className='idivImgPost' src={img}/>
                    </div>

                    <div>
                        <img className='profilePicture' src={this.state.authorImg}/>
                        <h1>{author}</h1>
                    </div>

                    <div className='postDescription'>{description}</div>
                    
                    <div className='settings'>
                        <input className="editPost" type='checkbox'></input>
                        <div className="editDropdown">
                            <textarea className='editInput' value={this.state.description} onChange={(e) => this.setState({description: e.target.value})}></textarea>
                            <button className='edit' onClick={this.editPost}>Submit</button>
                        </div>
                        <button className='delete' onClick={this.deletePost}>X</button>
                    </div>              
                </div>
            </div>
                
            )
        }
        return(
            <div className="container">
                <div className="postContainer">
                    <div className="imgContainerPost">
                        <img className='idivImgPost' src={img}/>
                    </div>
                    <div>
                        <img className='profilePicture' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/><h1>{author}</h1>
                        {description}
                    </div>
                </div>
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

export default connect(mapStateToProps)(Post)