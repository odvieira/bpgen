import React from 'react'
import { withRouter } from 'react-router-dom';

import './Card.styles.scss'
import { CardDetail } from '../CardDetail/CardDetail.component';

const Card = ({ itemId, itemsRoot, itemTitle, kvp, history}) => (
    <div
        className="card-container"
        onClick={() => history.push(`${itemsRoot}${itemId}`)}>
        <h3 className='card-title'>{ itemTitle }</h3>
        <div className="card-detail-block">
            <ul className='card-details-list'>
                { kvp.map( detail => {
                    return(
                        <li
                            key={ detail[0] + detail[1] + Math.random().toString() }
                            className='card-detail-line'
                        >
                            <CardDetail kvp={ detail } />
                        </li>
                    )
                })}
            </ul>
        </div>
    </div>
)

export default withRouter(Card)