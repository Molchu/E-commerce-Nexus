import React, {useContext} from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt=""  width="300" height="300"/>
      <div className="shoppercategory-indexSort">
        <p>
          <span>Mostrando 1-12</span> de 36 productos
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" width="20px"/>
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item,i) => {
          if (props.category===item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explorar más
      </div>
    </div>
  )
}

export default ShopCategory
