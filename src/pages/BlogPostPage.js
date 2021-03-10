import { Link, useParams } from 'react-router-dom';

import React, { useContext, useEffect } from 'react';
import {
  Text, Row, Container, Div, Icon,
} from 'atomize';
import parse from 'html-react-parser';
import Loading from '../components/Loading';
import { BlogContext } from '../context/blogContext';
import Error from '../components/Error';

const BlogPage = () => {
  const {
    getPostById, parsedTitle, content, date, categories, isLoading, err,
  } = useContext(BlogContext);
  const { id } = useParams();

  useEffect(() => {
    getPostById(id);
    return () => {
    };
  }, [getPostById, id]);

  if (err) return <Error />;
  if (isLoading) return <Loading />;
  return (
    <Container maxW="1000px">
      <Row d="flex" justify="flex-start" align="center" p={{ y: '2rem' }}>
        <Icon name="Back" size="20px" color="gray900" />
        {' '}
        <Link to="/blog"><Text textColor="gray900" textSize="body">Back</Text></Link>
      </Row>
      <Row p={{ x: { xs: '1rem', md: '0' } }} d="flex" flexDir="column">
        <Text tag="h2" textSize="display2">{parsedTitle}</Text>
        <Text tag="h3" textSize="heading">{date}</Text>
      </Row>
      <Row p={{ b: '2rem', x: { xs: '1rem', md: '0' } }}>
        <Div className="blogPostDiv" d="flex" flexDir="column" justify="center" align="center">
          {parse(content)}
        </Div>
      </Row>
      {categories[0] !== undefined && (
      <Row p={{ b: '2rem', x: { xs: '1rem', md: '0' } }} d="flex" justify="center" align="center">
        <Text tag="p" m={{ r: '1rem' }} textSize="paragraph" textWeight="500" d="flex" align="center">
          <Icon name="FolderSolid" size="20px" m={{ r: '1rem' }} />
          {typeof (categories[0]) === 'string' && categories.map((cat, index) => <Text tag="span" p={{ r: '0.5rem' }} key={`cat-${index}`}>{cat}</Text>)}
        </Text>
      </Row>
      )}
    </Container>
  );
};

export default BlogPage;
