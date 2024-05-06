import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from '../Components/Item/Item';

// Estilos para el contenedor principal
const PopularContainer = styled.div`
  text-align: center;

  .popular-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

// Estilos para el título
const Title = styled.h1`
  font-size: 32px; 
  color: #333;
  margin-top: 50px;
  text-align: center; 
  font-family: 'Arial', sans-serif; 
  font-weight: bold; 
  letter-spacing: 1px; 
`;


const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, []);

  return (
    <PopularContainer>
      <Title>Ofertas del día</Title>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </PopularContainer>
  );
};

export default Popular;
