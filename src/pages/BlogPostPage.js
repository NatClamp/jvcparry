// import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import React, { useContext, useEffect } from 'react';
import { BlogContext } from '../context/blogContext';
import Error from '../components/Error';
import { Text, Row, Container, Div, Icon, Anchor } from "atomize";
var parse = require('html-react-parser');


const BlogPage = () => {
  const { getPostById, parsedTitle, content, date, categories, tags, isLoading, err } = useContext(BlogContext)
  let { id } = useParams()

  useEffect(() => {
    getPostById(id)
    return () => {
    };
  }, [getPostById, id])

  if (err) return <Error />
  if (isLoading) return <Loading />
  return (
    <Container maxW='1000px' >
      <Row d='flex' justify='flex-start' align='center' p={{ y: '2rem' }}>
        <Icon name="Back" size="20px" color="gray900" /> <Anchor href='/blog' textColor="gray900" textSize='body'>Back</Anchor>
      </Row>
      <Row p={{ x: { xs: '1rem', md: '0' } }} d='flex' flexDir='column'>
        <Text tag="h2" textSize="display2">{parsedTitle}</Text>
        <Text tag="h3" textSize="heading" >{date}</Text>
      </Row>
      <Row p={{ b: '2rem', x: { xs: '1rem', md: '0' } }}>
        <Div className="blogPostDiv" d='flex' flexDir='column' justify='center' align='center'>
          {parse(content)}
        </Div>
      </Row>
      <Row p={{ b: '2rem', x: { xs: '1rem', md: '0' } }} d='flex' flexDir='column' justify='center' align='center'>
        <Text tag='p' m={{ r: '1rem' }} textSize='paragraph' textWeight='500'>
          <Icon name="FolderSolid" size="20px" m={{ r: '1rem' }} />
          {typeof (categories[0]) === 'string' && categories.map((cat, index) =>
            <Text tag='span' p={{ r: '0.5rem' }} key={`cat-${index}`}>{cat}</Text>
          )}
        </Text>
        {/* <Div d='flex' justify='center' align='center'>
          <Icon name="BookmarkSolid" size="20px" m={{ r: '1rem' }} />{typeof (tags[0]) === 'string' && tags.map((tag, index) =>
            <Text tag='p' key={`tag-${index}`} m={{ r: '1rem' }} textSize='paragraph' textWeight='500'>{tag}</Text>
          )}
        </Div> */}
      </Row>
    </Container >
  )
}

export default BlogPage
