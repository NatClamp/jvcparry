import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import parse from 'html-react-parser/dist/html-react-parser';

const BlogContext = React.createContext();

class BlogProvider extends Component {
  state = {
    isLoading: false,
    completePostList: [],
    totalPostCount: 0,
    totalPageCount: 0,
    postsOnPage: [],
    currentPostCount: 0,
    currentPageCount: 0,
    currentPage: 1,
    lastPage: false,
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
    searchResultTotal: 0,
    searchResult: [],
  };

  getCompletePostList = async () => {
    const { totalPageCount } = this.state;
    const BASE_URL = process.env.REACT_APP_WORDPRESS_API;
    this.setState({ isLoading: true });
    const apiCalls = [];
    const pageRange = [];
    for (let i = 1; i <= totalPageCount; i++) {
      pageRange.push(i);
    }
    pageRange.forEach((pageNum) => {
      const newPromise = axios({
        method: 'get',
        url: `${BASE_URL}/posts?page=${pageNum}`,
      });
      apiCalls.push(newPromise);
    });
    try {
      const promiseResolution = await Promise.all(apiCalls);
      const data = promiseResolution.map((result) => result.data);
      const postsArray = data.flat();
      console.log(data);
      this.setState({ completePostList: postsArray });
    } catch (err) {
      this.setState({ err });
    }
  }

  pagination = async (posts) => {
    const { currentPage } = this.state;
    if (posts.data) {
      posts.data.length < 10
        ? this.setState({ lastPage: true }) : this.setState({ lastPage: false });
      const currentPostCount = Number(posts.headers['x-wp-total']);
      const currentPageCount = Number(posts.headers['x-wp-totalpages']);
      this.setState({
        currentPostCount, currentPageCount, err: null,
      });
    } else {
      // for searched items
      const numberOfPostsOnPage = posts.length;
      const { searchResultTotal } = this.state;
      const numberOfPages = Math.ceil(searchResultTotal / 10);
      numberOfPostsOnPage < 10
        ? this.setState({ lastPage: true }) : this.setState({ lastPage: false });
      this.setState({
        currentPageCount: numberOfPages,
        currentPostCount: searchResultTotal,
        err: null,
      });
    }
    const { currentPageCount } = this.state;
    if (currentPage === currentPageCount) this.setState({ lastPage: true });
  }

  getPostsOnPage = async (page = 1, filter = null) => {
    const { search, searchResult, totalPostCount } = this.state;
    if (search) {
      const sliceTo = page * 10;
      const sliceFrom = sliceTo - 10;
      const searchedPosts = searchResult.slice(sliceFrom, sliceTo);
      this.pagination(searchedPosts);
      this.preparePosts(searchedPosts);
    } else {
      let apiCall;
      const BASE_URL = process.env.REACT_APP_WORDPRESS_API;
      this.setState({ isLoading: true });
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
      try {
        const posts = await axios.get(apiCall);
        if (totalPostCount === 0) {
          // Set the full blog post and page count in state and don't alter these. Only run once.
          const completePostCount = Number(posts.headers['x-wp-total']);
          const completePageCount = Number(posts.headers['x-wp-totalpages']);
          this.setState({ totalPostCount: completePostCount, totalPageCount: completePageCount });
        }
        this.pagination(posts);
        this.preparePosts(posts.data);
      } catch (err) {
        this.setState({ err });
      }
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
    this.setState({
      filter,
      filterName,
      search: '',
      searchResultTotal: 0,
      currentPage: 1,
    });
  }

  removeFilter = () => {
    this.setState({ filter: null, filterName: null }, () => this.getPostsOnPage());
  }

  setSearch = async (searchTerm) => {
    await this.getCompletePostList();
    this.setState({
      search: searchTerm,
      currentPage: 1,
      filter: null,
      filterName: null,
    });
    const { completePostList } = this.state;
    const lcSearchTerm = searchTerm.toLowerCase();
    const searchedPosts = completePostList
      .filter((post) => post.content.rendered.toLowerCase().indexOf(lcSearchTerm) !== -1);
    const firstPageOfSearchedPosts = searchedPosts.slice(0, 10);
    const searchResultTotal = searchedPosts.length;
    this.setState({ searchResultTotal, searchResult: searchedPosts });
    this.pagination(firstPageOfSearchedPosts);
    this.preparePosts(firstPageOfSearchedPosts);
  }

  removeSearch = () => {
    this.setState({ search: '', searchResultTotal: 0 }, () => this.getPostsOnPage());
  }

  blogClearAll = () => {
    this.setState({
      search: '', searchResultTotal: 0, filter: null, filterName: null,
    }, () => this.getPostsOnPage(1));
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
      this.setState({ postsOnPage: parsedPosts, isLoading: false, err: null });
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
    } catch (err) {
      this.setState({ err });
    }
    return result;
  }

  convertTagIds = async (id) => {
    let result;
    try {
      const tags = await axios.get(`${process.env.REACT_APP_WORDPRESS_API}/tags`);
      const matchedTag = tags.data.filter((tag) => tag.id === id);
      if (matchedTag[0] !== undefined) {
        result = matchedTag[0].name.replace('&amp;', '&');
      }
    } catch (err) {
      this.setState({ err });
    }
    return result;
  }

  getPostCategories = async (postCategoryIds) => {
    let postCats;
    try {
      postCats = Promise.all(postCategoryIds.map((id) => this.convertCategoryIds(id)));
    } catch (err) {
      this.setState({ err });
    }
    return postCats;
  }

  getPostTags = async (postTagIds) => {
    let postTags;
    try {
      postTags = Promise.all(postTagIds.map((id) => this.convertTagIds(id)));
    } catch (err) {
      this.setState({ err });
    }
    return postTags;
  }

  handleNextPage = () => {
    const { currentPage, filter } = this.state;
    const newCurrentPage = currentPage + 1;
    this.setState(
      { currentPage: newCurrentPage },
      () => {
        this.getPostsOnPage(newCurrentPage, filter);
        window.scrollTo(0, 0);
      },
    );
  };

  handlePrevPage = () => {
    const { currentPage, filter } = this.state;
    const newCurrentPage = currentPage - 1;

    this.setState(
      { currentPage: newCurrentPage },
      () => {
        this.getPostsOnPage(newCurrentPage, filter);
        window.scrollTo(0, 0);
      },
    );
  };

  render() {
    const { children } = this.props;
    return (
      <BlogContext.Provider
        value={{
          ...this.state,
          getPostsOnPage: this.getPostsOnPage,
          getPostById: this.getPostById,
          handleNextPage: this.handleNextPage,
          handlePrevPage: this.handlePrevPage,
          getAllCategories: this.getAllCategories,
          setFilter: this.setFilter,
          removeFilter: this.removeFilter,
          setSearch: this.setSearch,
          removeSearch: this.removeSearch,
          blogClearAll: this.blogClearAll,
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
