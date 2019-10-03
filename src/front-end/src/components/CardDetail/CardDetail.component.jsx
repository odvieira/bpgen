import React from 'react'

import './CardDetail.styles.scss'

export const CardDetail = ({ kvp }) => {
    return (
        <div>
            <div className='det-label'>
                { kvp[0] }
            </div>
            <div className='det-value'>
                { kvp[1] }
            </div>
        </div>
    )
}