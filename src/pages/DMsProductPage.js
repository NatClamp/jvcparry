import React from 'react'
import { Text, Div, Row, Col, Container, Anchor } from "atomize";
import Loading from '../components/Loading'

import dmsguildProducts from '../data/dmsguild-products';

const DMsProductPage = () => {

  if (!dmsguildProducts) return <Loading />
  return (
    <>
      <Container>
        <Row>
          <Text p={{ t: '2rem' }} tag="p" textSize="title">DMsGuild products</Text>
        </Row>
        <Row>
          {dmsguildProducts.products.map(product => (
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
      </Container>
    </>
  )
}

export default DMsProductPage
