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
            isUploading: false,
            editPfp: true,
            yourPosts: [],
            description: '',
            img: '',
            pfp: '',
            banner: '',
        }
        this.post = this.post.bind(this)
        this.editPfp = this.editPfp.bind(this)
    }

    componentDidMount(){
        this.getYourPosts()
        this.getProfilePictures()
    }

    post(){
        Axios.post('/api/post', this.state).then(() => {
            if(this.state.newPost === false){
                this.setState({newPost: true})
            }
            window.location.reload();
        })
    }

    getYourPosts(){
        console.log("hello")
        Axios.get('/api/yourposts').then(res => {
            console.log("hello", res.data)
            this.setState({yourPosts: res.data})

        })
    }
    
    getProfilePictures(){
      Axios.get('/api/pfp').then(res => {
        this.setState({pfp: res.data[0].profile_picture, banner: res.data[0].profile_banner})
      })
    }

    editPfp(){
      Axios.put(`/api/pfp`, this.state).then(res => {
        console.log(res.data)
        window.location.reload();
      })
    }

    getSignedRequestPost([file]) {
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
            this.uploadFilePost(file, signedRequest, url);
          })
          .catch(err => {
            console.log(err);
          });
    };
    
    uploadFilePost = (file, signedRequest, url) => {
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

    getSignedRequestPfp([file]) {
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
            this.uploadFilePfp(file, signedRequest, url);
          })
          .catch(err => {
            console.log(err);
          });
    };
    
    uploadFilePfp = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        Axios
          .put(signedRequest, file, options)
          .then(response => {
            this.setState({ isUploading: false, pfp: url });
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

    getSignedRequestBanner([file]) {
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
            this.uploadFileBanner(file, signedRequest, url);
          })
          .catch(err => {
            console.log(err);
          });
    };
    
    uploadFileBanner = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        Axios
          .put(signedRequest, file, options)
          .then(response => {
            this.setState({ isUploading: false, banner: url });
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
                      <div>
                          <img className="newPostPic" src={this.state.img}/>
                      </div>
                      <div className="inputBox">
                        <input type='file' accept='image/png, image/jpeg, image/gif' onChange={(e) => {this.getSignedRequestPost(e.target.files)}}></input>
                      </div>
                      <br/>
                      <textarea className='descriptionbox' placeholder="About this monkey!"onChange={(e) => {this.setState({description: e.target.value})}}></textarea>
                      <br/>
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
                        <img className='banner' src={this.state.banner}/>
                        <img className='profile'src={this.state.pfp}/>
                        <div className='username'>{this.props.username}</div>
                        <div className='pfpSettings'>
                          <h4 className='wwaa'>Change your profile pictures!</h4>
                          <input className="addPfp" type="file" onChange={(e) => {this.getSignedRequestPfp(e.target.files)}}></input>
                          <input className="addBanner" type="file" onChange={(e) => {this.getSignedRequestBanner(e.target.files)}}></input>
                          <button onClick={this.editPfp}>Submit</button>
                        </div>
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