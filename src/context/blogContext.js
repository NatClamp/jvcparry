import React, { Component } from "react";
import axios from 'axios';
var parse = require('html-react-parser');


const BlogContext = React.createContext();

class BlogProvider extends Component {
  state = {
    allPosts: [],
    postCount: 0,
    postById: {},
    categories: [],
    parsedTitle: '',
    content: '',
  };

  getAllPosts = async () => {
    const posts = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/posts`)
    this.preparePosts(posts.data);
  }

  getAllCategories = async () => {
    const cats = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/categories`);
    this.setState({ categories: cats.data })
  }

  preparePosts = async (posts) => {
    const postsCopy = await [...posts]
    this.getAllCategories()
    const parsedPosts = await postsCopy.map(post => {
      let parsedExcerpt = parse(post.excerpt.rendered);
      let parsedTitle = parse(post.title.rendered);
      let formattedDate = new Date(post.date).toLocaleDateString('en-gb', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
      let excerpt = `${parsedExcerpt[0].props.children[0].split("Continue reading")[0]}...`;
      post['preparedExcerpt'] = excerpt;
      post['preparedTitle'] = parsedTitle;
      post['preparedDate'] = formattedDate;
      return post;
    })
    const postNumber = parsedPosts.length;
    this.setState({ allPosts: parsedPosts, postCount: postNumber })
  }

  convertCategoryIds = async (id) => {
    const categories = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/categories`);
    let matchedCat = categories.data.filter((cat) => (
      cat.id === id
    ))
    return matchedCat[0].name;
  }

  getPostCategories = async (postCategoryIds) => {
    return Promise.all(postCategoryIds.map(id => this.convertCategoryIds(id)))
  }

  getPostById = async (id) => {
    const post = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/posts/${id}`)
    const postCopy = JSON.parse(JSON.stringify(post.data))
    this.getPostCategories(postCopy.categories).then(data => {
      this.setState({ categories: data })
    })
    const parsedTitle = parse(postCopy.title.rendered)
    const formattedDate = new Date(postCopy.date).toLocaleDateString('en-gb', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    this.setState({
      postById: post.data,
      parsedTitle: parsedTitle,
      content: postCopy.content.rendered,
      date: formattedDate,
    })
  }


  render() {
    return (
      <BlogContext.Provider
        value={{
          ...this.state,
          getAllPosts: this.getAllPosts,
          getPostById: this.getPostById,
          getAllCategories: this.getAllCategories,
        }}
      >
        {this.props.children}
      </BlogContext.Provider>
    );
  }
}

const BlogConsumer = BlogContext.Consumer;

export { BlogConsumer, BlogContext };

export default BlogProvider;
