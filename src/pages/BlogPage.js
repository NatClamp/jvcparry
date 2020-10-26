import { Link } from 'react-router-dom'
import Loading from '../components/Loading';
import React, { useContext, useEffect } from 'react';
import { BlogContext } from '../context/blogContext';
import { Text, Row, Container, Div, Button } from "atomize";


const BlogPage = () => {
  const { getAllPosts, allPosts, postCount } = useContext(BlogContext)

  useEffect(() => {
    getAllPosts()
    return () => {
    };
  }, [getAllPosts])


  if (!postCount) return <Loading />
  return (
    <Container maxW='1000px'>
      <Row>
        <Text p={{ t: '2rem' }} tag="h2" textSize="display2">Blog</Text>
      </Row>
      <Row>
        {allPosts.map(post => (
          <Div key={post.id} p="2rem" m={{ y: "1rem" }} bg='gray400'>
            <Text tag="h3" textSize="title">{post.preparedTitle}</Text>
            <Text p={{ b: '0.5rem' }} tag="h4" textSize="subheader">{post.preparedDate}</Text>
            <Text tag="p" textSize="paragraph">{post.preparedExcerpt}</Text>
            <Link to={`/blog/${post.id}`}>
              <Button
                d="inline-block"
                h="2.5rem"
                p={{ x: "1rem" }}
                textSize="body"
                textColor="black700"
                bg="gray100"
                hoverBg="gray300"
                border="1px solid"
                borderColor="black700"
                hoverBorderColor="black900"
                shadow='2'
                hoverShadow='3'
                m={{ t: '1rem', r: '0' }}
              >Read</Button>
            </Link>

          </Div>
        ))}
      </Row>
    </Container>
  )
}

export default BlogPage
