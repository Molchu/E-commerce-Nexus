import React from 'react';
import styled from 'styled-components';
import musicBackground from '../Components/Assets/Music.png'; 

// Estilos para la sección de Nexus Music
const NexusMusicSectionWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${musicBackground}); 
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff; /* Color del texto */
`;

// Estilos para el contenedor principal de información
const ContentContainer = styled.div`
  text-align: center;
`;

// Estilos para el título de la sección
const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 36px;
`;

// Estilos para el párrafo de descripción
const Description = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  margin-top: 40px;
`;

// Estilos para el botón de acción
const ActionButton = styled.button`
  padding: 20px 20px;
  font-size: 20px;
  background-color: #ee9bd9ad; 
  color: #fff;
  border: none;
  margin-top: 60px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8a6565; /* Cambiar color al pasar el mouse */
  }
`;

const NexusMusicSection = () => {
  return (
    <NexusMusicSectionWrapper>
      <ContentContainer> 

        <ActionButton>Obtén más información</ActionButton>
        <Description>
          Disfruta de 3 meses gratis de música ilimitada con Nexus Music. Descubre nuevas canciones, crea listas de reproducción personalizadas y disfruta de tus artistas favoritos.
        </Description>
      </ContentContainer>
    </NexusMusicSectionWrapper>
  );
};

export default NexusMusicSection;
