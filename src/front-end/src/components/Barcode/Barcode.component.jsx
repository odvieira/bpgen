import React from 'react'
import generateBarcode from "pdf417";

const Barcode = ({ text, blockWidth, blockHeight }) => {
    return (
        <div className="bc-div">
            <img src={generateBarcode(text, blockWidth, blockHeight)} alt={'Barcode'} />
        </div>
    )
}

export default Barcode