import Axios from "axios";
import { Component } from "react";
import Dropzone from "react-dropzone";
import {v4 as randomString} from 'uuid'
import {GridLoader} from "react-spinners"
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
class Yourdex extends Component {
    constructor(props){
        super(props)
        this.state = {
            newPost: true,
            yourPosts: [],
            description: '',
            img: '',
            isUploading: false
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
    
    getSignedRequest([file]) {
        this.setState({ isUploading: true });
        // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
    
        // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
        Axios
          .get('/api/signs3', {
            params: {
              'file-name': fileName,
              'file-type': file.type,
            },
          })
          .then(response => {
            const { signedRequest, url } = response.data;
            this.uploadFile(file, signedRequest, url);
          })
          .catch(err => {
            console.log(err);
          });
      };
    
      uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        Axios
          .put(signedRequest, file, options)
          .then(response => {
            this.setState({ isUploading: false, img: url });
            // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
          })
          .catch(err => {
            this.setState({
              isUploading: false,
            });
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                  err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };

    render(){
        if(!this.state.newPost){
            return(
                <div className="container postContainer">
                  <div className="newPostContainer">
                    <h3>New Monkey</h3>
                    <div className="inputAreas">
                      <input placeholder="About this monkey!" className="descriptionbox" onChange={(e) => {this.setState({description: e.target.value})}}></input>
                      <br/>
                      <input type='file' accept='image/png, image/jpeg, image/gif' placeholder="Img link here!" onChange={(e) => {this.getSignedRequest(e.target.files)}}></input>
                      <br/>
                      <div>
                          <img className="newPostPic" src={this.state.img}/>
                      </div>
                      <button onClick={this.post}>Post</button>
                    </div>
                  </div>
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