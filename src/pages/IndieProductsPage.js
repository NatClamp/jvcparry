import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Text, Div, Row, Col, Container, Icon,
} from 'atomize';
import { ShopContext } from '../context/shopContext';
import Loading from '../components/Loading';

const IndieProductsPage = () => {
  const { fetchAllProducts, products, isLoading } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  if (isLoading) return <Loading />;
  return (
    <>
      <Container>
        <Row d="flex" justify="flex-start" align="center" p={{ y: '1rem' }}>
          <Icon name="Back" size="20px" color="gray900" />
          {' '}
          <Link to="/products"><Text textColor="gray900" textSize="body">Back to all products</Text></Link>
        </Row>
        <Row>
          <Col size="12">
            <Text p={{ t: '2rem' }} tag="p" textSize="title">Indie Products</Text>
          </Col>
        </Row>
        <Row d="flex" flexDir={{ xs: 'column', md: 'row' }} flexWrap="wrap">
          {products.map((product) => (
            <Col key={product.id} size={{ xs: '12', md: '4' }}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <Div p="2rem">
                  <Div
                    h="20rem"
                    bgImg={product.images[0].src}
                    bgSize="cover"
                    bgPos="top center"
                    shadow="3"
                    hoverShadow="4"
                    transition="0.3s"
                    m={{ b: '1.5rem' }}
                  />
                  <Text tag="p" textWeight="300" textSize="subheader" textDecor="none" textColor="black500">{product.title}</Text>
                  <Text tag="p" textWeight="300" textSize="body" textDecor="none" textColor="gray800">
                    {product.variants[0].price}
                    {' '}
                    {product.variants[0].priceV2.currencyCode}
                  </Text>
                </Div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default IndieProductsPage;
