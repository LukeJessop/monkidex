import Axios from "axios";
import { Component } from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Comments from './../Comments/Comments'
import './dashboard.css'
class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            allPosts: [],
            userPics: ''
        }
        this.getPosts = this.getPosts.bind(this)
    }
    componentDidMount(){
        this.getPosts()
    }
    getPosts(){
        Axios.get('/api/post').then(res => {
            this.setState({allPosts: res.data.reverse()})
        })
    }

    render(){
        let mappedPosts = this.state.allPosts.map((element) => {
            return(
                <div className="post-container">
                <Link to={`/post/${element.post_id}`} key={element.post_id}>
                    <div className="post">
                        <div className="informationContainer">
                            <div className="items">
                                <div className="imgContainer">
                                    <img className="imgPost" src={element.img_link}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                    <div className="profileContainer">
                        <div className="userInfo">
                            <img className='profilePicture' src={element.profile_picture}/>
                            <h3>{element.username}</h3>
                        </div>
                        <div className="descriptionContainer">
                            <div className="description">{element.description}</div>
                        </div>
                        <div className="interaction-buttons-container">
                            <button className="like-button"></button>
                            <button className="comment-button"></button>
                            <div>
                                <Comments/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return(
            <div className="container dashboardContainer">
                {mappedPosts.length === 0 ? <img className="loading-banana" src="https://monkidex-bucket.s3.amazonaws.com/e0ac908e-83db-4e58-9e4b-24340037a6ef-banana-96.gif"/> : mappedPosts }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps)(Dashboard)