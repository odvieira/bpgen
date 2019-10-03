import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

import './AutoNavBar.styles.scss'

const AutoNavBar = ({items, title, logoAlt, logoUrl, logoRef}) => {
    return (
        <Navbar className='auto-nav-bar'>
            <Nav className="mr-auto">
                { items.map( item => {
                    return (
                        <Nav.Link key={ item.id } href={`${item.path}`} >
                            <h5 className="auto-nav-bar-item"> { item.title } </h5>
                        </Nav.Link>
                    )
                })}
            </Nav>
            <Nav className="mr-auto">
                <Nav.Link href='/'><h3 className="auto-nav-bar-title">{ title }</h3></Nav.Link>
            </Nav>
            <Navbar.Brand>
                <Nav.Link href={ logoRef }>
                    <img className="auto-nav-bar-logo" alt={ logoAlt } src={ logoUrl }/>
                </Nav.Link>
            </Navbar.Brand>
        </Navbar>
    )
}

export default AutoNavBar