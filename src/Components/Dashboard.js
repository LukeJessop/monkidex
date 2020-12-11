import Axios from "axios";
import { Component } from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
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
            this.setState({allPosts: res.data})
        })
    }

    render(){
        let mappedPosts = this.state.allPosts.map((element) => {
            return(
                <Link to={`/post/${element.post_id}`} key={element.post_id}>
                    <div className="post" >
                        <div className="informationContainer">
                            <div className="profileContainer">
                                <img className='profilePicture' src={element.profile_picture}/>
                            </div>
                            <div className="items">
                                <h3>{element.username}</h3>
                                <div className="descriptionContainer"><div className="description">{element.description}</div></div>
                                <div className="imgContainer">
                                    <img className="imgPost" src={element.img_link}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })
        return(
            <div className="container dashboardContainer">
                {mappedPosts}
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