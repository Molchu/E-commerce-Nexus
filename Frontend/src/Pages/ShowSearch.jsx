import React from 'react';
import './CSS/ShowSearch.css';
import Item from '../Components/Item/Item';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const ShowSearch = ({ results, relatedProducts }) => {
  // Extrae la categoría del primer resultado de la búsqueda
  const category = results.length > 0 ? results[0].category : '';

  return (
    <div className='show-search'>
      {results.length > 0 ? (
        <>
          <div className='founded-products'>
            {results.map((result, i) => (
              <Item key={i} id={result.id} name={result.name} image={result.image_urls[0]} new_price={result.new_price} old_price={result.old_price} />
            ))}
          </div>
          {/* Pasa la categoría de los resultados al componente RelatedProducts */}
          <RelatedProducts category={category} />
        </>
      ) : (
        <div className='no-results'>
          <p>No se encontró el producto</p>
          <p>¡Pero tenemos muchos otros productos increíbles para ti!</p>
        </div>
      )}
    </div>
  );
};

export default ShowSearch;
