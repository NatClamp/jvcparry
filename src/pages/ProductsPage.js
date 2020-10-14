import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/shopContext'
import { Text, Div, Col, Container } from "atomize";
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'


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
    <Container d='flex' flexDir={{ xs: 'column', md: 'row' }} flexWrap="wrap">
      {products.map(product => (
        <Col key={product.id} size={{ xs: '12', md: '4' }} >
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <Div p="2rem">
              <Div
                h="20rem"
                bgImg={product.images[0].src}
                bgSize="cover"
                bgPos="center center"
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
    </Container>
  )
}

export default ProductsPage
