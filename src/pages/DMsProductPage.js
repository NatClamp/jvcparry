import React, { Component } from 'react';
import { Text, Div, Row, Col, Container, Anchor, Input, Icon } from "atomize";
import Loading from '../components/Loading'
import Pagination from '../components/Pagination';

import dmsguildProducts from '../data/dmsguild-products';

class DMsProductPage extends Component {

  state = {
    allProducts: [],
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    searchValue: '',
  }

  componentDidMount = () => {
    const { products } = dmsguildProducts;
    this.setState({ allProducts: products });
  }

  componentDidUpdate = () => {
    window.scrollTo(0, 0);
  }

  searchTitles = async term => {
    if (term === '') {
      this.setState({ allProducts: dmsguildProducts })
    } else {
      let lowercaseTerm = term.toLowerCase();
      const { allProducts } = this.state;
      let products = await allProducts.filter((product) => {
        let titleArray = product.title.toLowerCase().split(" ");
        return titleArray.includes(lowercaseTerm)
      });
      let pageLimit = 18;
      let totalPages = Math.ceil(products.length / pageLimit)
      this.setState({ allProducts: products, currentPage: 1, totalPages }, () => {
        this.onPageChanged({ currentPage: 1, totalPages, pageLimit })
      })
    }
  }

  handleChange = e => {
    this.setState({ searchValue: e.target.value })
  }

  handleKeypress = e => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.searchTitles(this.state.searchValue)
  }

  resetSearch = e => {
    const { products } = dmsguildProducts;
    this.setState({ allProducts: products, searchValue: '' }, () => {
      let pageLimit = 18;
      let totalPages = Math.ceil(products.length / pageLimit)
      this.onPageChanged({ currentPage: 1, totalPages, pageLimit })

    });
  }

  onPageChanged = data => {
    const { allProducts } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = allProducts.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentProducts, totalPages });
  }


  render() {
    const { allProducts, currentProducts, currentPage, totalPages } = this.state;
    const totalProducts = allProducts.length;


    if (totalProducts === 0) return null;
    if (!dmsguildProducts) return <Loading />
    return (
      <>
        <Container>
          <Row d='flex' flexDir={{ xs: 'column', md: 'row' }} justify={{ xs: 'center', md: 'space-around' }} p={{ t: '2rem' }}>
            <Col size={{ xs: '12', md: '5' }}>
              <Text tag="p" textSize="title">DMsGuild products</Text>
            </Col>
            <Col size={{ xs: '12', md: '2' }} d='flex' justify='center'>
              {currentPage && <Text tag="p" textWeight="300" textSize="body" textAlign='center'>Page {currentPage} / {totalPages}</Text>}
            </Col>
            <Col size={{ xs: '12', md: '5' }} d='flex' align='center' justify='flex-end' w='100%'>
              <Text onClick={this.resetSearch} p={{ x: '1rem' }}>Reset</Text>
              <Input
                w='100%'
                placeholder="Search"
                onKeyPress={this.handleKeypress}
                onChange={this.handleChange}
                value={this.state.searchValue}
                suffix={
                  <Icon
                    name="Search"
                    size="20px"
                    cursor="pointer"
                    onClick={this.handleSubmit}
                    pos="absolute"
                    top="50%"
                    right="1rem"
                    transform="translateY(-50%)"
                  />
                }
              />
            </Col>
          </Row>
          <Row>
            {currentProducts.map(product => (
              <Col key={product.id} size={{ xs: '12', md: '4' }}>
                <Anchor href={product.uri} target='_blank' style={{ textDecoration: 'none' }}>
                  <Div p="2rem">
                    <Div
                      h="25rem"
                      bgImg={product.image}
                      bgSize="cover"
                      bgPos="center center"
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
          <Row p={{ y: '2rem', l: '2rem' }}>
            <Col size={{ xs: '12', md: '7' }} d='flex' align='center'>
              {currentPage && <Text tag="p" textWeight="300" textSize="body">Page {currentPage} / {totalPages}</Text>}
            </Col>
            <Col size={{ xs: '12', md: '5' }} d='flex' justify='center' >
              <Pagination totalRecords={totalProducts} pageLimit={18} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </Col>
          </Row>
        </Container>
      </>
    )
  }

}

export default DMsProductPage
