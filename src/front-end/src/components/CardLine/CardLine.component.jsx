import React from 'react'
import { withRouter } from 'react-router-dom';

import './CardLine.styles.scss'

const CardLine = ({ itemId, itemsRoot, kvp, history}) => (
    <tr
        className='tr-custom'
        onClick={() => history.push(`${itemsRoot}${itemId}`)}
    >{
        kvp.map( detail => {
            return(
                <td key={ detail[0] + detail[1] }>
                    { detail[1] }
                </td>
            )
        })
    }</tr>
)

export default withRouter(CardLine)