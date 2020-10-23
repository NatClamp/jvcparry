import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../context/blogContext';
import { Text, Row, Container, Div, Button } from "atomize";
var parse = require('html-react-parser');


const BlogPage = () => {
  const { getPostById, postById, parsedTitle, content, date, categories } = useContext(BlogContext)
  let { id } = useParams()

  useEffect(() => {
    getPostById(id)
    return () => {
    };
  }, [getPostById, id])



  if (!postById) return <Loading />
  return (
    <Container>
      <Row p={{ t: '2rem' }}>
        <Text p={{ t: '2rem' }} tag="h2" textSize="title">{parsedTitle}</Text>
      </Row>
      <Row>
        <Text p={{ t: '2rem' }} tag="p" textSize="subheading">{date}</Text>
      </Row>
      <Row >
        {categories.map(cat =>
          <Text tag="p" textSize="paragraph">{cat}</Text>
        )}
      </Row>
      <Row p={{ b: '2rem' }}>
        <div className="blogPostDiv">
          {parse(content)}
        </div>
      </Row>
    </Container >
  )
}

export default BlogPage
