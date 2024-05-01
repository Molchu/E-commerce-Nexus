import React from 'react';
import './CSS/ShopCategory.css';
import Item from '../Components/Item/Item';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const ShowSearch = ({ results, relatedProducts }) => {
  return (
    <div className='show-search'>
      {results.length > 0 ? (
        <>
          <div className='founded-products'>
            {results.map((result, i) => (
              <Item key={i} id={result.id} name={result.name} image={result.image} new_price={result.new_price} old_price={result.old_price} />
            ))}
          </div>
          <RelatedProducts relatedProducts={relatedProducts} />
        </>
      ) : (
        <div className='no-results'>No se encontró el producto</div>
      )}
    </div>
  );
};

export default ShowSearch;