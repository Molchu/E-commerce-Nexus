import React from 'react';
import styled from 'styled-components';

const SuggestionsList = styled.ul`
  position: absolute; 
  top: 40px;
  left: 0; 
  width: 100%; 
  max-height: 300px; 
  overflow-y: auto;
  border: 1px solid #ccc;
  background-color: white;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10000;
`;

const SuggestionItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SuggestionImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const Autocomplete = ({ suggestions, onSuggestionClick, clearSuggestions }) => {
  const handleSuggestionClick = (suggestion) => {
    onSuggestionClick(suggestion);
    clearSuggestions();
  };

  return (
    <SuggestionsList>
      {suggestions.map((suggestion, index) => (
        <SuggestionItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
          <SuggestionImage src={suggestion.image_urls[0]} alt={suggestion.name} />
          {suggestion.name}
        </SuggestionItem>
      ))}
    </SuggestionsList>
  );
};

export default Autocomplete;
