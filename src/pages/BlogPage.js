import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import {
  Text, Row, Container, Div, Col, Tag, Icon,
} from 'atomize';
import { BlogContext } from '../context/blogContext';
import Loading from '../components/Loading';
import Error from '../components/Error';
import BlogPagination from '../components/BlogPagination';
import BlogFilter from '../components/BlogFilter';
import BlogSearchBar from '../components/BlogSearchBar';

const BlogPage = () => {
  const {
    getAllPosts, allPosts, isLoading, getAllCategories,
    allCategories, pageCount, filterName, removeFilter, currentPage, err,
  } = useContext(BlogContext);

  useEffect(() => {
    getAllPosts();
    getAllCategories();
    removeFilter();
    return () => {
    };
  }, [getAllPosts, getAllCategories, removeFilter]);

  if (err) return <Error />;
  if (isLoading) return <Loading />;
  return (
    <Container maxW="1000px">
      <Row d="flex" align="top" m={{ t: '3rem' }} h="5rem">
        <Col>
          <Text tag="h2" align="top" textSize="display2">Blog</Text>
        </Col>
        <Col>
          <BlogSearchBar />
        </Col>
        <Col>
          <BlogFilter allCategories={allCategories} />
          {filterName && (
          <Tag
            m={{ r: '1rem', y: '1rem' }}
            suffix={(
              <Icon
                name="Cross"
                size="12px"
                m={{ l: '1rem' }}
                cursor="pointer"
                onClick={() => removeFilter()}
              />
          )}
          >
            Filter:
            {' '}
            {filterName}
            {' '}

          </Tag>
          )}
        </Col>
      </Row>
      <Row>
        <Col size="12">
          {allPosts.map((post) => (
            <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none' }} key={post.id}>
              <Div key={post.id} p="2rem" m={{ y: '1rem' }} bg="gray400" hoverBg="gray500" textColor="black" w="100%">
                <Text tag="h3" textSize="title">{post.preparedTitle}</Text>
                <Text tag="p" textSize="subheader" w="100%" overflow="hidden">{post.preparedExcerpt}</Text>
              </Div>
            </Link>
          ))}
        </Col>
      </Row>
      <Row d="flex" flexDir="column" justify="center" m={{ y: '1rem' }} align="center">
        <Text>
          Page
          {currentPage}
          {' '}
          /
          {pageCount}
        </Text>
        <BlogPagination />
      </Row>
    </Container>
  );
};

export default BlogPage;
