import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  constructor() {
  	super();
  	this.state = {
  		allMyPosts: [],
  		newPostTitle: '',
  		newPostContent: '',
  		newPostThumbnail: '',
  	};

		this.createPost = this.createPost.bind(this);
		this.updatePostTitle = this.updatePostTitle.bind(this);
		this.updatePostContent = this.updatePostContent.bind(this);
		this.updatePostThumbnail = this.updatePostThumbnail.bind(this);
		this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
  	fetch('http://localhost:8080/api/posts').then((res) => {
  		// console.log(res);
  		return res.json();
  	}).then((json) => {
  		this.setState({
  			allMyPosts: json
  		})
  		//do stuff tiwh the JSON you get back here
  		//console.log(json);
  		//console.log(this.state.newPostTitle)
  		// STEP 2: set state to this json response you got back
  	});
  }

  	deletePost(post_id) {
 		fetch(`http://localhost:8080/api/posts/${ post_id }`, {  
 		  method: 'DELETE',
 		  headers: {
 		    'Accept': 'application/json',
 		    'Content-Type': 'application/json',
 		  }
 		}).then((res) => {
 			this.setState({
 				allMyPosts: this.state.allMyPosts.filter(post => post._id !== post_id)
 			});
 		});
 	}
 

	updatePostTitle(e) {
		this.setState({ newPostTitle: e.target.value })
	}

	updatePostContent(e) {
		this.setState({ newPostContent: e.target.value })
	}

	updatePostThumbnail(e) {
		this.setState({ newPostThumbnail: e.target.value })
	}

  createPost(e) {
  	e.preventDefault();


		fetch('http://localhost:8080/api/posts', {
				method: 'POST',	
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
				  title: this.state.newPostTitle, 
				  content: this.state.newPostContent, 
				  thumbnail_image_url: this.state.newPostThumbnail, 
				  votes: 0, 
				  comments: [] 
				})
			}).then((res) => {
			  return res.json();
			}).then((json) => {
		    this.setState({
		    	allMyPosts: this.state.allMyPosts.concat(json),
		    	newPostTitle: '',
		    	newPostContent: '',
		    	newPostThumbnail: ''
		    });
			});
  }




  render() {
    return (
      <div className="HomePage">
	    Home Page
	          {/* STEP 3: render all the posts in your state */}
	    <form onSubmit={ this.createPost }>
	      	<input 
	      		value={ this.state.newPostTitle } 
	      		onChange={ this.updatePostTitle }
	      		type="text" 
	      		placeholder="title"/>
	      	<input 
	      		value={ this.state.newPostContent }
	      		onChange={ this.updatePostContent } 
	      		type="text" 
	      		placeholder="content"/>
	      	<input 
	      		value={ this.state.newPostThumbnail } 
	      		onChange={ this.updatePostThumbnail }
	      		type="text" 
	      		placeholder="thumbnail_image_url"/>
	      	<button type="submit">Add Post</button>
	    </form>


	      { this.state.allMyPosts.map(eachPost => {
	      	return <li key={ eachPost._id }>
	      		   <img height="30" width="30" src={eachPost.thumbnail_image_url}/>
			       <Link to={ `/posts/${eachPost._id}` }> <h2> { eachPost.title } </h2> </Link>
		    	   <button onClick={ () => { this.deletePost(eachPost._id) } }>X</button>

	      	</li>
	      })}
      </div>
    );
  }
}

export default HomePage;
