import { Link } from 'react-router-dom'
import React, { useContext, useEffect } from 'react';
import { BlogContext } from '../context/blogContext';
import { Text, Row, Container, Div, Col, Tag, Icon } from "atomize";
import Loading from '../components/Loading';
import Error from '../components/Error';
import BlogPagination from '../components/BlogPagination';
import BlogFilter from '../components/BlogFilter';

const BlogPage = () => {
  const { getAllPosts, allPosts, isLoading, getAllCategories, allCategories, pageCount, filterName, removeFilter, currentPage, err } = useContext(BlogContext)

  useEffect(() => {
    getAllPosts()
    getAllCategories()
    removeFilter()
    return () => {
    };
  }, [getAllPosts, getAllCategories, removeFilter])

  if (err) return <Error />
  if (isLoading) return <Loading />
  return (
    <Container maxW='1000px'>
      <Row d='flex' align='center' p={{ t: '2rem' }}>
        <Col>
          <Text tag="h2" textSize="display2">Blog</Text>
        </Col>
        <Col >
          <BlogFilter allCategories={allCategories} />
          {filterName && <Tag m={{ r: "1rem", y: "1rem" }} suffix={
            <Icon
              name="Cross"
              size="12px"
              m={{ l: "1rem" }}
              cursor="pointer"
              onClick={() => removeFilter()}
            />
          }>Filter: {filterName} </Tag>}
        </Col>
      </Row>
      <Row>
        {allPosts.map(post => (
          <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none' }} key={post.id}>
            <Div key={post.id} p="2rem" m={{ y: "1rem" }} bg='gray400' hoverBg='gray500' textColor='black'>
              <Text tag="h3" textSize="title">{post.preparedTitle}</Text>
              <Text p={{ b: '0.5rem' }} tag="h4" textSize="subheader">{post.preparedDate}</Text>
              <Text tag="p" textSize="paragraph">{post.preparedExcerpt}</Text>
            </Div>
          </Link>
        ))}
      </Row>
      <Row d='flex' flexDir='column' justify='center' m={{ y: '1rem' }} align='center'>
        <Text>Page {currentPage} / {pageCount}</Text>
        <BlogPagination />
      </Row>
    </Container >
  )
}

export default BlogPage
