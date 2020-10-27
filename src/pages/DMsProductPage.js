import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Text, Div, Row, Col, Container, Anchor, Input, Icon, Button } from "atomize";
import Loading from '../components/Loading'
import Pagination from '../components/Pagination';
import NoSearchItems from '../components/NoSearchItems';

import dmsguildProducts from '../data/dmsguild-products';

class DMsProductPage extends Component {

  state = {
    allProducts: [],
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    searchValue: '',
    searchActive: false,
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
        let title = product.title.toLowerCase().replace(":", " ").replace("(", " ").replace(")", " ")
        // let singleTermMatch = title.split(" ").includes(lowercaseTerm)
        let multipleTermMatch = title.includes(lowercaseTerm);
        let completeMatch = title === lowercaseTerm;
        if (completeMatch) {
          return completeMatch
        }
        // else if (singleTermMatch) {
        //   return singleTermMatch;
        // }
        else if (multipleTermMatch) {
          return multipleTermMatch
        }

        else {
          return false
        }

      });

      let pageLimit = 18;
      let totalPages = Math.ceil(products.length / pageLimit)
      this.setState({ allProducts: products, currentPage: 1, totalPages, searchActive: true }, () => {
        this.onPageChanged({ currentPage: 1, totalPages, pageLimit })
      })
    }
  }

  handleChange = e => {
    this.setState({ searchValue: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.searchTitles(this.state.searchValue)
  }

  resetSearch = e => {
    const { products } = dmsguildProducts;
    this.setState({ allProducts: products, searchValue: '', searchActive: false }, () => {
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
    const { allProducts, currentProducts, currentPage, totalPages, searchActive, searchValue } = this.state;
    const totalProducts = allProducts.length;


    if (totalProducts === 0) return <NoSearchItems searchValue={searchValue} resetSearch={this.resetSearch} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    if (!dmsguildProducts) return <Loading />
    return (
      <>
        <Container>
          <Row d='flex' justify='flex-start' align='center' p={{ y: '1rem' }}>
            <Icon name="Back" size="20px" color="gray900" /> <Link to='/products'><Text textColor="gray900" textSize='body'>Back to all products</Text></Link>
          </Row>
          <Row d='flex' flexDir={{ xs: 'column', md: 'row' }} justify={{ xs: 'center', md: 'space-around' }} >
            <Col size={{ xs: '12', md: '5' }}>
              <Text tag="p" textSize="title" textAlign={{ xs: 'center', md: 'justify' }}>DMsGuild products</Text>
            </Col>
            <Col size={{ xs: '12', md: '2' }} d='flex' justify='center'>
              {currentPage && <Text tag="p" textWeight="300" textSize="body" textAlign='center' m={{ y: { xs: '1rem' } }}>Page {currentPage} / {totalPages}</Text>}
            </Col>
            <Col size={{ xs: '12', md: '5' }} d='flex' align='center' justify={{ xs: 'center', md: 'flex-end' }}  >
              <form style={{ width: '85%' }} onSubmit={this.handleSubmit}>
                <Input
                  placeholder="Search"
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
              </form>
              {searchActive && <Button d='flex' align='center' m={{ x: '1rem' }} p={{ x: '0.75rem' }} onClick={this.resetSearch} bg='white' >
                <Icon name="Close" color="black" size="20px" />
                <Text textSize='caption' textColor='black' p={{ x: '0.5rem' }}>Clear</Text>
              </Button>}

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
          <Row p={{ y: '2rem', x: '2rem' }} >
            <Col size={{ xs: '12', md: '7' }} d='flex' align='center' justify={{ xs: 'center', md: 'flex-start' }}>
              {currentPage && <Text tag="p" textWeight="300" textSize="body" textAlign='center'>Page {currentPage} / {totalPages}</Text>}
            </Col>
            <Col size={{ xs: '12', md: '5' }} d='flex' justify={{ xs: 'center', md: 'flex-end' }} >
              <Pagination totalRecords={totalProducts} pageLimit={18} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </Col>
          </Row>
        </Container>
      </>
    )
  }



}

export default DMsProductPage
