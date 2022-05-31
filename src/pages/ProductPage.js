/* eslint-disable max-len */
import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Text, Row, Col, Container, Icon, Button,
} from 'atomize';
import { ShopContext } from '../context/shopContext';
import Loading from '../components/Loading';
import Error from '../components/Error';
import VariantDropdown from '../components/VariantDropdown';

const ProductPage = () => {
  const { id } = useParams();
  const {
    fetchProductWithId, addItemToCheckout, product, variantIndex, setVariantTypesAvailable, availableVariants, err,
  } = useContext(ShopContext);

  useEffect(() => {
    fetchProductWithId(id);
    return () => {};
  }, [fetchProductWithId, id]);
  useEffect(() => {
    setVariantTypesAvailable(product);
    return () => {};
  }, [product]);

  if (err) return <Error />;
  if (!product.title) return <Loading />;
  return (
    <Container>
      <Row d="flex" justify="flex-start" align="center" p={{ y: '2rem', x: '1rem' }}>
        <Icon name="Back" size="20px" color="gray900" />
        {' '}
        <Link to="/products/indie"><Text textColor="gray900" textSize="body">Back to products</Text></Link>
      </Row>
      <Row m={{ b: '2rem' }} p={{ y: '2rem', x: '1rem' }} d="flex" justify={{ xs: 'center', sm: 'space-around' }}>
        <Col size={{ xs: '12', sm: '4' }} d="flex" justify="center" align="center">
          <img src={product.images[0].src} alt={`${product.title} product`} style={{ maxWidth: '350px' }} />
        </Col>
        <Col size={{ xs: '12', sm: '6' }}>
          <Text tag="h2" textColor="black500" textSize="2rem" textWeight="200" m={{ y: '2rem' }}>{product.title}</Text>
          {product.variants.length > 1 && <VariantDropdown title={product.variants[variantIndex].title} variantTitles={availableVariants} />}
          <Text tag="h3" m={{ y: '2rem' }} textWeight="200">
            {product.variants[variantIndex].price}
            {' '}
            {product.variants[variantIndex].priceV2.currencyCode}
          </Text>
          <Text tag="p" textSize="paragraph" textColor="black400" textWeight="200">{product.description}</Text>
          <Button rounded="0" shadow="3" bg="black500" m={{ y: '2rem' }} onClick={() => addItemToCheckout(product.variants[variantIndex].id, 1)}>Add To Cart</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
