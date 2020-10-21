import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/shopContext'
import { Text, Div, Row, Col, Container, Anchor, Button } from "atomize";
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

import dmsguildProducts from '../data/dmsguild-products';

const ProductsPage = () => {
  const { fetchAllProducts, products } = useContext(ShopContext)


  useEffect(() => {
    fetchAllProducts()
    return () => {
      // cleanup
    };
  }, [fetchAllProducts])


  if (!products) return <Loading />
  return (
    <>
      <Container>
        <Row>
          <Text p={{ t: '2rem' }} tag="p" textSize="title">DMsGuild products</Text>
        </Row>
        <Row>
          {[dmsguildProducts.products[0], dmsguildProducts.products[1], dmsguildProducts.products[2]].map(product => (
            <Col key={product.id} size={{ xs: '12', md: '4' }}>
              <Anchor href={product.uri} target='_blank' style={{ textDecoration: 'none' }}>
                <Div p="2rem">
                  <Div
                    h="20rem"
                    bgImg={product.image}
                    bgSize="cover"
                    bgPos="top center"
                    shadow="3"
                    hoverShadow="4"
                    transition="0.3s"
                    m={{ b: "1.5rem" }}
                  >
                  </Div>
                  <Text tag="p" textWeight="300" textSize="subheader" textDecor="none" textColor="black500">{product.title}</Text>
                  <Text tag="p" textWeight="300" textSize="body" textDecor="none" textColor="gray800">{product.price} {product.currencyCode}</Text>
                </Div>
              </Anchor>
            </Col>
          ))}
        </Row>
        <Row d='flex' justify='center' p={{ x: '2rem', b: '2rem' }}>
          <Link to='/products/dmsguild'>
            <Button
              d="inline-block"
              h="2.5rem"
              p={{ x: "1rem" }}
              textSize="body"
              textColor="black"
              hoverTextColor="hsla(217, 14%, 50%)"
              bg="white"
              hoverBg="grey600"
              border="1px solid"
              borderColor="black"
              hoverBorderColor="hsla(217, 14%, 50%)"
              m={{ t: '1rem', r: '0' }}
            >See more DMsGuild products</Button>
          </Link>
        </Row>
        <Row>
          <Text p={{ t: '2rem' }} tag="p" textSize="title">Standalone products</Text>
        </Row>
        <Row d='flex' flexDir={{ xs: 'column', md: 'row' }} flexWrap="wrap">
          {products.map(product => (
            <Col key={product.id} size={{ xs: '12', md: '4' }} >
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
                    m={{ b: "1.5rem" }}
                  >
                  </Div>
                  <Text tag="p" textWeight="300" textSize="subheader" textDecor="none" textColor="black500">{product.title}</Text>
                  <Text tag="p" textWeight="300" textSize="body" textDecor="none" textColor="gray800">{product.variants[0].price} {product.variants[0].priceV2.currencyCode}</Text>
                </Div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default ProductsPage
