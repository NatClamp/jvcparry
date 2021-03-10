import React, { useContext, useEffect } from 'react';
import {
  Text, Div, Row, Col, Container, Anchor, Button,
} from 'atomize';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import Loading from '../components/Loading';

import dmsguildProducts from '../data/dmsguild-products';
import driveThruProducts from '../data/drivethru-products';

const ProductsPage = () => {
  const { fetchAllProducts, products, isLoading } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  if (isLoading) return <Loading />;
  return (
    <>
      <Container>
        <Row>
          <Col size="12">
            <Text p={{ t: '2rem' }} tag="p" textSize="title">DMsGuild products</Text>
          </Col>
        </Row>
        <Row>
          {[dmsguildProducts.products[0], dmsguildProducts.products[1],
            dmsguildProducts.products[2]].map((product) => (
              <Col key={product.id} size={{ xs: '12', md: '4' }}>
                <Anchor href={product.uri} target="_blank" style={{ textDecoration: 'none' }}>
                  <Div p="2rem">
                    <Div
                      h="20rem"
                      bgImg={product.image}
                      bgSize="cover"
                      bgPos="top center"
                      shadow="3"
                      hoverShadow="4"
                      transition="0.3s"
                      m={{ b: '1.5rem' }}
                    />
                    <Text tag="p" textWeight="300" textSize="subheader" textDecor="none" textColor="black500">{product.title}</Text>
                    <Text tag="p" textWeight="300" textSize="body" textDecor="none" textColor="gray800">
                      {product.price}
                      {' '}
                      {product.currencyCode}
                    </Text>
                  </Div>
                </Anchor>
              </Col>
          ))}
        </Row>
        <Row d="flex" justify="center" p={{ x: '2rem', b: '2rem' }}>
          <Link to="/products/dmsguild">
            <Button
              d="inline-block"
              h="2.5rem"
              p={{ x: '1rem' }}
              textSize="body"
              textColor="black700"
              bg="gray100"
              hoverBg="gray300"
              border="1px solid"
              borderColor="black700"
              hoverBorderColor="black900"
              shadow="2"
              hoverShadow="3"
              m={{ t: '1rem', r: '0' }}
            >
              See more DMsGuild products
            </Button>
          </Link>
        </Row>
        <Row>
          <Col size="12">
            <Text p={{ t: '2rem' }} tag="p" textSize="title">Indie Products</Text>
          </Col>
        </Row>
        {
            products.length === 0 ? (
              <Row>
                <Col size="12">
                  <Text p={{ t: '2rem' }} tag="p" textSize="paragraph">We're currently having issues with our online store for Indie Products - please check back at a later date to purchase these. All other products are available via external services.</Text>
                </Col>
              </Row>
            ) : (
              <Row d="flex" flexDir={{ xs: 'column', md: 'row' }} flexWrap="wrap">
                {[products[0], products[1], products[2]].map((product) => (
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
            )
}
        <Row d="flex" justify="center" p={{ x: '2rem', b: '2rem' }}>
          <Link to="/products/indie">
            <Button
              d="inline-block"
              h="2.5rem"
              p={{ x: '1rem' }}
              textSize="body"
              textColor="black700"
              bg="gray100"
              hoverBg="gray300"
              border="1px solid"
              borderColor="black700"
              hoverBorderColor="black900"
              shadow="2"
              hoverShadow="3"
              m={{ t: '1rem', r: '0' }}
            >
              See more Indie products
            </Button>
          </Link>
        </Row>
        <Row id="driveThruProducts">
          <Col size="12">
            <Text p={{ t: '2rem' }} tag="p" textSize="title">DriveThruRPG Products</Text>
          </Col>
        </Row>
        <Row>
          {[driveThruProducts.products[0]].map((product) => (
            <Col key={product.id} size={{ xs: '12', md: '4' }}>
              <Anchor href={product.uri} target="_blank" style={{ textDecoration: 'none' }}>
                <Div p="2rem">
                  <Div
                    h="20rem"
                    bgImg={product.image}
                    bgSize="cover"
                    bgPos="top center"
                    shadow="3"
                    hoverShadow="4"
                    transition="0.3s"
                    m={{ b: '1.5rem' }}
                  />
                  <Text tag="p" textWeight="300" textSize="subheader" textDecor="none" textColor="black500">{product.title}</Text>
                  <Text tag="p" textWeight="300" textSize="body" textDecor="none" textColor="gray800">
                    {product.price}
                    {' '}
                    {product.currencyCode}
                  </Text>
                </Div>
              </Anchor>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductsPage;
