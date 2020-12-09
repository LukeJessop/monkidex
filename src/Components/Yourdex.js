import Axios from "axios";
import { Component } from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
class Yourdex extends Component {
    constructor(props){
        super(props)
        this.state = {
            newPost: true,
            yourPosts: [],
            description: '',
            img: ''
        }
        this.post = this.post.bind(this)
        
    }

    componentDidMount(){
        this.getYourPosts()
    }

    post(){
        Axios.post('/api/post', this.state).then(() => {
            if(this.state.newPost === false){
                this.setState({newPost: true})
            }
        })
    }

    getYourPosts(){
        console.log("hello")
        Axios.get('/api/yourposts').then(res => {
            console.log("hello", res.data)
            this.setState({yourPosts: res.data})

        })
    }
    
    render(){
        if(!this.state.newPost){
            return(
                <div className="container postContainer">
                    <div>New Monkey</div>
                    <input placeholder="About this monkey!" className="descriptionbox" onChange={(e) => {this.setState({description: e.target.value})}}></input>
                    <br/>
                    <input placeholder="Img link here!" onChange={(e) => {this.setState({img: e.target.value})}}></input>
                    <br/>
                    <div>
                        <img className="newPostPic" src={this.state.img}/>
                    </div>
                    <button onClick={this.post}>Post</button>
                </div>
            )
        }
        let mappedPosts = this.state.yourPosts.map((element) => {
            return(
                <Link to={`/post/${element.post_id}`} key={element.post_id}>
                    <div className="post" >
                        <div className="informationContainer">
                            <img/>
                            <h3>{element.username}</h3>
                            <div className="description">{element.description}</div>
                            <div className="imgContainer">
                                <img className='imgPost' src={element.img_link}/>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })
        return(
            <div>
                <div className="create" onClick={() => {
                    if(this.state.newPost === true){this.setState({newPost: false})}else{this.setState({newPost: true})}
                }}><span>+</span></div>
                
                <div className="container">
                    <div className="profilecontainer">
                        <img className='banner' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>
                        <img className='profile'src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>
                        <div className='username'>{this.props.username}</div>
                    </div>
                    <div>{mappedPosts}</div>
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

export default connect(mapStateToProps)(Yourdex)