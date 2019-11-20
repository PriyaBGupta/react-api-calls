import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    state = {
        posts:[],
        selectedPost : null
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response=>{
            const posts = response.data.slice(0,4);
            const updatedPost = posts.map(post=>{
                return{
                    ...post,
                    author:"Priya"
                }
            });
            this.setState({posts:updatedPost});
        })
    }
    postSelectHandler = (id) =>{
        this.setState({selectedPost:id});
    }

    render () {
        const posts = this.state.posts.map(post=>{
            return <Post title ={post.title}
                         key={post.id}
                         author ={post.author}
                         clicked = {()=>{this.postSelectHandler(post.id)}}
                    />
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id ={this.state.selectedPost}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
