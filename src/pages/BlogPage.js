import { Link } from 'react-router-dom'
import Loading from '../components/Loading';
import React, { useContext, useEffect } from 'react';
import { BlogContext } from '../context/blogContext';
import { Text, Row, Container, Div } from "atomize";
import BlogPagination from '../components/BlogPagination';
import BlogFilter from '../components/BlogFilter';

const BlogPage = () => {
  const { getAllPosts, allPosts, isLoading, getAllCategories, allCategories } = useContext(BlogContext)

  useEffect(() => {
    getAllPosts()
    getAllCategories()
    return () => {
    };
  }, [getAllPosts, getAllCategories])

  if (isLoading) return <Loading />
  return (
    <Container maxW='1000px'>
      <Row>
        <Text p={{ t: '2rem' }} tag="h2" textSize="display2">Blog</Text>
      </Row>
      {/* <Row>
        <BlogFilter allCategories={allCategories} />
      </Row> */}
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
      <Row d='flex' justify='center' m={{ y: '1rem' }}>
        <BlogPagination />
      </Row>
    </Container >
  )
}

export default BlogPage
