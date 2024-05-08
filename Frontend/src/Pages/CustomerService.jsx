import React, { useState } from 'react';
import styled from 'styled-components';

// Estilos para la sección de servicio al cliente
const CustomerServiceSectionWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 60px;
  background-color: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Estilos para el campo de búsqueda
const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

// Estilos para la lista de preguntas frecuentes
const FaqList = styled.div``;

// Estilos para un elemento de la lista de preguntas frecuentes
const FaqItem = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Estilos para la pregunta en un elemento de la lista
const FaqQuestion = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
`;

// Estilos para la respuesta en un elemento de la lista
const FaqAnswer = styled.p`
  margin-top: 0;
  color: #666;

  a {
    color: blue;
    text-decoration: underline;
  }
`;

const CustomerServiceSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [faqData, setFaqData] = useState([
    { question: '¿Cómo puedo realizar un pedido?', answer: 'Puedes realizar un pedido dandole clic a los productos que te llamen la atención, luego los agregas al carrito y para realizar el pago deberas iniciar sesión, en caso de no tener una cuenta te puedes registrar en nuestra página' },
    { question: '¿Cuáles son los métodos de pago aceptados?', answer: 'Aceptamos tarjetas de crédito, débito...' },
    { question: 'No puedo crear una cuenta', answer: 'Lamentamos que tengas problemas creando una cuenta de Nexus. ¿Intentaste utilizar la página <a href="/signup">Crear cuenta</a>?' },
    { question: '¿A que lugares hacen envios?', answer: 'Hacemos envíos a nivel nacional(Colombia), a todos los depertamentos de forma rápida y segura'}
  ]);

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar las preguntas frecuentes basadas en el término de búsqueda
  const filteredFaqs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CustomerServiceSectionWrapper>
      <h2>Servicio al Cliente</h2>
      <SearchInput
        type="text"
        placeholder="Buscar preguntas frecuentes..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <FaqList>
        {filteredFaqs.map((faq, index) => (
          <FaqItem key={index}>
            <FaqQuestion>{faq.question}</FaqQuestion>
            <FaqAnswer dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </FaqItem>
        ))}
      </FaqList>
    </CustomerServiceSectionWrapper>
  );
};

export default CustomerServiceSection;
