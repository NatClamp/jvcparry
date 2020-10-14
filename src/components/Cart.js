import React, { useContext } from 'react'
import { Div, SideDrawer, Text, Row, Col, Anchor, Button, Container, Icon } from "atomize";
import { ShopContext } from '../context/shopContext'

const Cart = () => {

    const { isCartOpen, closeCart, checkout, updateItemToCheckout } = useContext(ShopContext)

    if (checkout.lineItems) {
        return (
            <SideDrawer isOpen={isCartOpen} onClose={closeCart}>
                <Container d="flex" flexDir="column" h="100%">
                    <Row justify="space-between" border={{ b: '1px solid' }} p="0.7rem" borderColor="gray300">
                        <Text tag="h1" textColor="black500" textSize="paragraph" hoverTextColor="black700" transition="0.3s">Bag</Text>
                        <Anchor onClick={() => closeCart()} ><Icon name="Cross" color="black500" /></Anchor>
                    </Row>
                    <Row flexGrow="2" p="0.7rem" overflow="auto" flexWrap="nowrap" flexDir="column">
                        {checkout.lineItems.length < 1 ?
                            <Row>
                                <Col><Text tag="h1" textColor="black500" textSize="paragraph" hoverTextColor="black700" transition="0.3s">Cart Is Empty</Text></Col>
                            </Row>
                            :
                            <>
                                {checkout.lineItems && checkout.lineItems.map(item => (
                                    <Row key={item.id} p={{ t: "5px" }}>
                                        <Col>
                                            <Div bgImg={item.variant.image.src} bgSize="cover" bgPos="center" h="5rem" w="4rem" />
                                        </Col>
                                        <Col>
                                            <Text>{item.title}</Text>
                                            {item.variant.title !== "Default Title" && <Text>{item.variant.title}</Text>}
                                            <Text>Quantity: {item.quantity}</Text>
                                            <Text>{item.variant.price}{" "}<span style={{ fontSize: '12px', color: '#48556f' }}>{checkout.currencyCode}</span></Text>

                                            <Text textSize='body' onClick={() => updateItemToCheckout(item.id, item.quantity)} textColor="danger800" cursor="pointer" p={{ t: '10px' }}>Remove</Text>
                                        </Col>
                                    </Row>
                                ))}
                            </>
                        }
                    </Row>
                    <Row border={{ t: '1px solid' }} p="0.7rem" borderColor="gray300" d='flex' flexDir='column'>
                        <Text tag='h5' textSize='paragraph'>Subtotal</Text>
                        <Text tag='p' textSize='subheader'>{Number(checkout.lineItemsSubtotalPrice.amount).toFixed(2)} <span style={{ fontSize: '12px', color: '#48556f' }}>{checkout.lineItemsSubtotalPrice.currencyCode}</span></Text>
                    </Row>
                    <Row border={{ t: '1px solid' }} p="0.7rem" borderColor="gray300">
                        <Anchor w="100%" href={checkout.webUrl} target="_blank" rel="noopener noreferrer">
                            <Button w="100%" rounded="0" bg="black500" shadow="2" hoverShadow="3" m={{ t: '1rem' }}>
                                Checkout
                            </Button>
                        </Anchor>
                    </Row>
                </Container>
            </SideDrawer>
        )
    }

    return null

}

export default Cart

