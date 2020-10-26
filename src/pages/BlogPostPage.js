// import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import React, { useContext, useEffect } from 'react';
import { BlogContext } from '../context/blogContext';
import { Text, Row, Container, Div, Icon } from "atomize";
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
    <Container maxW='1000px'>
      <Row p={{ x: { xs: '1rem', md: '0' } }} d='flex' flexDir='column'>
        <Text p={{ t: '2rem' }} tag="h2" textSize="display2">{parsedTitle}</Text>
        <Text tag="h3" textSize="heading" >{date}</Text>
      </Row>
      <Row p={{ b: '2rem', x: { xs: '1rem', md: '0' } }}>
        <Div className="blogPostDiv" d='flex' flexDir='column' justify='center' align='center'>
          {parse(content)}
        </Div>
      </Row>
      <Row p={{ b: '2rem', x: { xs: '1rem', md: '0' } }} d='flex' justify='center' align='center'>
        <Icon name="FolderSolid" size="20px" m={{ r: '1rem' }} />
        {typeof (categories[0]) === 'string' && categories.map((cat, index) =>
          <Text tag='p' key={`cat-${index}`} m={{ r: '1rem' }} textSize='paragraph' textWeight='500'>{cat}</Text>
        )}
      </Row>

    </Container >
  )
}

export default BlogPage
