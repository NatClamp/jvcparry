/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

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
    filter: null,
    filterName: null,
    err: null,
    search: '',
  };

  getAllPosts = async (page = 1, filter = null) => {
    let apiCall;
    const BASE_URL = process.env.REACT_APP_WORDPRESS_API;
    this.setState({ isLoading: true, search: '' });
    const URL = filter ? `${BASE_URL}/posts?categories=${filter}` : `${BASE_URL}/posts`;
    if (page) {
      if (URL.includes('?')) {
        // combine queries
        apiCall = `${URL}&page=${page}`;
      } else {
        // just add page query
        apiCall = `${URL}?page=${page}`;
      }
      this.setState({ currentPage: page });
    } else {
      apiCall = URL;
    }
    const { currentPage, pageCount } = this.state;
    try {
      const posts = await axios.get(apiCall);
      posts.data.length < 10
        ? this.setState({ lastPage: true }) : this.setState({ lastPage: false });
      this.preparePosts(posts.data);
      this.setState({ totalPostCount: Number(posts.headers['x-wp-total']), pageCount: Number(posts.headers['x-wp-totalpages']), err: null });
      if (currentPage === pageCount) this.setState({ lastPage: true });
    } catch (err) {
      this.setState({ err });
    }
  }

  getPostById = async (id) => {
    this.setState({ isLoading: true });
    try {
      const post = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/posts/${id}`);
      const postCopy = JSON.parse(JSON.stringify(post.data));
      this.getPostCategories(postCopy.categories).then((data) => {
        this.setState({ categories: data });
      });
      this.getPostTags(postCopy.tags).then((data) => {
        this.setState({ tags: data });
      });
      const parsedTitle = parse(postCopy.title.rendered);
      const formattedDate = new Date(postCopy.date).toLocaleDateString('en-gb', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      });

      this.setState({
        postById: post.data,
        parsedTitle,
        content: postCopy.content.rendered,
        date: formattedDate,
        isLoading: false,
        err: null,
      });
    } catch (err) {
      this.setState({ err });
    }
  }

  getAllCategories = async () => {
    try {
      const cats = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/categories`);
      const categories = cats.data.map((cat) => {
        const categoryObj = {};
        categoryObj.name = cat.name;
        categoryObj.id = cat.id;
        return categoryObj;
      });
      this.setState({ allCategories: categories, err: null });
    } catch (err) {
      this.setState({ err });
    }
  }

  setFilter = (filter, filterName) => {
    this.setState({ filter, filterName });
  }

  removeFilter = () => {
    this.setState({ filter: null, filterName: null }, () => this.getAllPosts());
  }

  searchPagination = async (posts) => {
    const postsNumber = posts.length;
    const pageNumber = Math.ceil(postsNumber / 10);
    posts.length < 10 ? this.setState({ lastPage: true }) : this.setState({ lastPage: false });
    this.setState({ totalPostCount: postsNumber, pageCount: pageNumber, err: null });
    const { currentPage, pageCount } = this.state;
    if (currentPage === pageCount) this.setState({ lastPage: true });
  }

  setSearch = async (searchTerm) => {
    this.setState({ search: searchTerm });
    const { allPosts } = this.state;
    const lcSearchTerm = searchTerm.toLowerCase();
    // eslint-disable-next-line max-len
    const searchedPosts = allPosts.filter((post) => post.content.rendered.toLowerCase().includes(lcSearchTerm));
    console.log('search results', searchedPosts);
    this.setState({ allPosts: searchedPosts });
    this.searchPagination(searchedPosts);
  }

  removeSearch = () => {
    this.setState({ search: '' }, () => this.getAllPosts());
  }

  preparePosts = async (posts) => {
    try {
      const postsCopy = await [...posts];
      const parsedPosts = await postsCopy.map((post) => {
        const parsedExcerpt = parse(post.excerpt.rendered);
        const parsedTitle = parse(post.title.rendered);
        const formattedDate = new Date(post.date).toLocaleDateString('en-gb', {
          weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
        });
        const excerpt = `${parsedExcerpt[0].props.children[0].split('Continue reading')[0]}...`;
        post.preparedExcerpt = excerpt;
        post.preparedTitle = parsedTitle;
        post.preparedDate = formattedDate;
        return post;
      });
      this.setState({ allPosts: parsedPosts, isLoading: false, err: null });
    } catch (err) {
      this.setState({ err });
    }
  }

  convertCategoryIds = async (id) => {
    let result;
    try {
      const categories = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/categories`);
      const matchedCat = categories.data.filter((cat) => (
        cat.id === id
      ));
      if (matchedCat.length > 0) {
        result = matchedCat[0].name;
      }
      return result;
    } catch (err) {
      this.setState({ err });
    }
  }

  convertTagIds = async (id) => {
    let result;
    try {
      const tags = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/tags`);
      const matchedTag = tags.data.filter((tag) => tag.id === id);
      if (matchedTag[0] !== undefined) {
        result = matchedTag[0].name.replace('&amp;', '&');
      }
      return result;
    } catch (err) {
      this.setState({ err });
    }
  }

  getPostCategories = async (postCategoryIds) => {
    try {
      return Promise.all(postCategoryIds.map((id) => this.convertCategoryIds(id)));
    } catch (err) {
      this.setState({ err });
    }
  }

  getPostTags = async (postTagIds) => {
    try {
      return Promise.all(postTagIds.map((id) => this.convertTagIds(id)));
    } catch (err) {
      this.setState({ err });
    }
  }

  handleNextPage = () => {
    const { currentPage, filter } = this.state;
    const newCurrentPage = currentPage + 1;
    this.setState(
      { currentPage: newCurrentPage },
      () => {
        this.getAllPosts(newCurrentPage, filter);
      },
    );
  };

  handlePrevPage = () => {
    const { currentPage, filter } = this.state;
    const newCurrentPage = currentPage - 1;

    this.setState(
      { currentPage: newCurrentPage },
      () => {
        this.getAllPosts(newCurrentPage, filter);
      },
    );
  };

  render() {
    const { children } = this.props;
    return (
      <BlogContext.Provider
        value={{
          ...this.state,
          getAllPosts: this.getAllPosts,
          getPostById: this.getPostById,
          handleNextPage: this.handleNextPage,
          handlePrevPage: this.handlePrevPage,
          getAllCategories: this.getAllCategories,
          setFilter: this.setFilter,
          removeFilter: this.removeFilter,
          setSearch: this.setSearch,
          removeSearch: this.removeSearch,
        }}
      >
        { children }
      </BlogContext.Provider>
    );
  }
}

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const BlogConsumer = BlogContext.Consumer;

export { BlogConsumer, BlogContext };

export default BlogProvider;
