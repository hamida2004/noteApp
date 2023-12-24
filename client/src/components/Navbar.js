import React from 'react'
import styled from 'styled-components'

const Nav = styled.div`
padding-left:20px;
width:100%;
height : 50px;
background-color: #444;
margin-bottom : 25px;
display : flex;
justify-content : flex-start;
align-items : center;


`

const Logout = styled.button`
 color : #fff;
 border: none;
 cursor : pointer;
 font-size : 16px;
 background-color: transparent;
`
function Navbar() {
    const logout = () =>{
        localStorage.setItem('token','');
        window.location.href = '/';

    }
  return (
    <Nav>
        <Logout onClick={logout}>Log out</Logout>
    </Nav>
  )
}

export default Navbar
