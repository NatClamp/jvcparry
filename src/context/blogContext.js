import React, { Component } from "react";
import axios from 'axios';
var parse = require('html-react-parser');


const BlogContext = React.createContext();

class BlogProvider extends Component {
  state = {
    isLoading: false,
    allPosts: [],
    totalPostCount: 0,
    currentPage: 1,
    lastPage: false,
    pageCount: 0,
    postById: {},
    allCategories: [],
    parsedTitle: '',
    content: '',
    categories: [],
    tags: [],
  };

  getAllPosts = async (page) => {
    this.setState({ isLoading: true });
    let apiCall;
    if (page) {
      apiCall = `${process.env.REACT_APP_WORDPRESS_API}/posts?page=${page}`
    } else {
      apiCall = `${process.env.REACT_APP_WORDPRESS_API}/posts`
    }
    let posts = await axios.get(apiCall);
    this.preparePosts(posts.data);
    if (!this.state.totalPostCount) {
      this.setState({ totalPostCount: Number(posts.headers['x-wp-total']) })
      this.getPageCount();
    }
  }

  getPostById = async (id) => {
    this.setState({ isLoading: true })
    const post = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/posts/${id}`)
    const postCopy = JSON.parse(JSON.stringify(post.data))
    this.getPostCategories(postCopy.categories).then(data => {
      this.setState({ categories: data })
    })
    this.getPostTags(postCopy.tags).then(data => {
      this.setState({ tags: data })
    })
    const parsedTitle = parse(postCopy.title.rendered)
    const formattedDate = new Date(postCopy.date).toLocaleDateString('en-gb', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    this.setState({
      postById: post.data,
      parsedTitle: parsedTitle,
      content: postCopy.content.rendered,
      date: formattedDate,
      isLoading: false,
    })
  }

  getAllCategories = async () => {
    const cats = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/categories`);
    let categories = cats.data.map(cat => cat.name)
    this.setState({ allCategories: categories })
  }

  getAllTags = async () => {
    const tags = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/tags`);
    this.setState({ allTags: tags.data })
  }

  preparePosts = async (posts) => {
    const postsCopy = await [...posts]
    // this.getAllTags();
    // this.getAllCategories();
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
    this.setState({ allPosts: parsedPosts, isLoading: false })
  }

  convertCategoryIds = async (id) => {
    const categories = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/categories`);
    let matchedCat = categories.data.filter((cat) => (
      cat.id === id
    ))
    return matchedCat[0].name;
  }

  convertTagIds = async (id) => {
    const tags = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/tags`);
    let matchedTag = tags.data.filter((tag) => {
      return tag.id === id
    })
    if (matchedTag[0] !== undefined) {
      return matchedTag[0].name.replace('&amp;', '&')
    } else {
      return null
    }
  }

  getPostCategories = async (postCategoryIds) => {
    return Promise.all(postCategoryIds.map(id => this.convertCategoryIds(id)))
  }

  getPostTags = async (postTagIds) => {
    return Promise.all(postTagIds.map(id => this.convertTagIds(id)))
  }



  getPageCount = () => {
    let pageCount = (this.totalPostCount / 10) + 1;
    this.setState({ pageCount })
  }

  handleNextPage = () => {
    this.setState(
      prevState => {
        prevState.currentPage++;
      },
      () => {
        this.getAllPosts(this.state.currentPage);
      },
    );
  };

  handlePrevPage = () => {
    this.setState(
      prevState => {
        prevState.currentPage--;
      },
      () => {
        this.getAllPosts(this.state.currentPage)
      },
    );
  };


  render() {
    return (
      <BlogContext.Provider
        value={{
          ...this.state,
          getAllPosts: this.getAllPosts,
          getPostById: this.getPostById,
          handleNextPage: this.handleNextPage,
          handlePrevPage: this.handlePrevPage,
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
