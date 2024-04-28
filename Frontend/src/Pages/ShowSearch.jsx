import React, {useContext} from 'react'
import './CSS/ShopCategory.css'
import Item from '../Components/Item/Item'

const ShowSearch = ({results}) => {
  return (
    
      <div className="founded-products">
        {results.map((result, i) => {
            return <Item key={i} id={result.id} name={result.name} image={result.image} new_price={result.new_price} old_price={result.old_price}/>
        })}
      </div>
  )
}

export default ShowSearch