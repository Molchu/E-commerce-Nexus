import React from 'react';
import styled from 'styled-components';
import GC1 from "../Components/Assets/1.png";
import GC2 from "../Components/Assets/2.png";
import GC3 from "../Components/Assets/3.png";

// Estilos para la sección de la tarjeta de regalo
const GiftCardSection = styled.section`
  padding: 50px 20px;
  background-color: #f7f7f7;
  text-align: center;
`;

// Estilos para el título de la sección
const SectionTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 30px;
`;

// Estilos para el contenedor de la tarjeta de regalo
const GiftCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #f3ecf3, #ee9bd9ad 80%);
  height: 450px;
`;

// Estilos para la tarjeta de regalo
const GiftCard = styled.div`
  width: 450px;
  height: 400px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 0 20px;
  padding: 20px;
`;

// Estilos para el título de la tarjeta de regalo
const GiftCardTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

// Estilos para el texto de descripción de la tarjeta de regalo
const GiftCardDescription = styled.p`
  font-size: 22px;
`;

// Estilos para la imagen de la tarjeta de regalo
const GiftCardImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  transition: transform 0.3s ease-in-out;
`;




// Estilos para la tarjeta de regalo cuando se pasa el mouse sobre ella
const GiftCardHover = styled.div`
  ${GiftCard}:hover ${GiftCardImage} {
    transform: scale(1.1); /* Hace que la imagen se agrande cuando se pasa el mouse sobre la tarjeta */
  }
`;


// Componente de la sección de tarjeta de regalo
const GiftCardSectionComponent = () => {
  return (
    <GiftCardSection>
      <SectionTitle>
        <div>Tarjetas de Regalo</div>
        <div>(Próximamente...)</div>
        </SectionTitle>

      <GiftCardContainer>
        <GiftCardHover>
        <GiftCard>
          <GiftCardTitle>Gift Card 1</GiftCardTitle>
          <GiftCardImage src={GC1} alt="Gift Card 2" />
          <GiftCardDescription>Tarjeta de regalo $50.000</GiftCardDescription>
        </GiftCard>
        </GiftCardHover>

        <GiftCardHover>
        <GiftCard>
          <GiftCardTitle>Gift Card 2</GiftCardTitle>
          <GiftCardImage src={GC2} alt="Gift Card 2" />
          <GiftCardDescription>Tarjeta de regalo $100.000</GiftCardDescription>
        </GiftCard>
        </GiftCardHover>

        <GiftCardHover>
        <GiftCard>
          <GiftCardTitle>Gift Card 3</GiftCardTitle>
          <GiftCardImage src={GC3} alt="Gift Card 2" />
          <GiftCardDescription> Tarjeta de regalo $200.000</GiftCardDescription>
        </GiftCard>
        </GiftCardHover>
      </GiftCardContainer>
    </GiftCardSection>
  );
};

export default GiftCardSectionComponent;
