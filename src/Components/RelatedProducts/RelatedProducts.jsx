import React from 'react'
import './RelatedProducts.css'
import data_products from '../Assets/data'
import Item from '../Item/Item'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {data_products.map((item,i)=>{
                return <Item/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts