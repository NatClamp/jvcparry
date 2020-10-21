import React from 'react'
import { Div, Button } from 'atomize'
import { Link } from 'react-router-dom'

const Nav = () => {

  return (
    <>
      <Div d={{ xs: 'none', md: 'flex' }} flexDir="row" justify="space-around" align="center" w={{ xs: 'auto', md: '300px' }}>
        <Link to='/products' style={{ textDecoration: 'none' }}>
          <Button
            h="2.5rem"
            p={{ x: "1rem" }}
            textSize="body"
            textColor="white"
            hoverTextColor="hsla(217, 14%, 60%)"
            bg="black"
            hoverBg="grey600"
            border="1px solid"
            borderColor="white"
            hoverBorderColor="hsla(217, 14%, 60%)"
            m={{ r: "0.5rem" }}
          >Products
                        </Button>
        </Link>
        <Link to='/hire-me' style={{ textDecoration: 'none' }}>
          <Button
            h="2.5rem"
            p={{ x: "1rem" }}
            textSize="body"
            textColor="white"
            hoverTextColor="hsla(217, 14%, 60%)"
            bg="black"
            hoverBg="grey600"
            border="1px solid"
            borderColor="white"
            hoverBorderColor="hsla(217, 14%, 60%)"
            m={{ r: "0.5rem" }}
          >Hire Me
                        </Button>
        </Link>
        {/* <Link to='/Blog' style={{ textDecoration: 'none' }}>
          <Button
            h="2.5rem"
            p={{ x: "1rem" }}
            textSize="body"
            textColor="white"
            hoverTextColor="hsla(217, 14%, 60%)"
            bg="black"
            hoverBg="grey600"
            border="1px solid"
            borderColor="white"
            hoverBorderColor="hsla(217, 14%, 60%)"
            m={{ r: "0.5rem" }}
          >Blog
                        </Button>
        </Link> */}
      </Div>
    </>
  )
}

export default Nav


