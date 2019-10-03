import React from 'react'
import { Link } from 'react-router-dom'

import './NotFound.styles.scss'

const NotFound = () => (
    <div className='not-found-page'>
        <div>Error 404 - Not Found</div>
        <div><Link to="/">Return to Home Page</Link></div>
    </div>
)

export default NotFound;