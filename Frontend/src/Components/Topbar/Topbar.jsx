import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import searchIcon from '../Assets/search.png';
import locationIcon from '../Assets/location.png';
import { useNavigate } from 'react-router-dom';
import Autocomplete from './Autocomplete';

const Container = styled.div`
  height: 60px;
  background-color: #F5E091;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 22px;
  cursor: pointer;
  font-weight: bold;
`;

const MessageContainer = styled.div`
  margin-left: 20px;
`;

const Message = styled.span`
  font-size: 16px;
`;

const LocationIcon = styled.img`
  width:30px;
  height: 30px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  width: 800px;
  position: relative;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
`;

const SearchIcon = styled.img`
  width:30px;
  height: 30px;
`;

const Input = styled.input`
  border: none;
  width:100%;
  height: 30px;
  padding-right: 30px;
  font-size: 16px;
  font-style: oblique;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Topbar = ({ setResults, setShowSearchResults }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setSuggestions(data))
      .catch((error) => console.error('Error fetching suggestions:', error));
  }, []);

  const handleChange = (value) => {
    setInput(value);
    if (value) {
      const results = suggestions.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(results);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const results = suggestions.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
    setResults(results);
    setShowSearchResults(true);
    navigate('/search-results');
    setInput('');
    setFilteredSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.name);
    fetchDataWithSimilarity(suggestion);
  };

  const fetchDataWithSimilarity = (suggestion) => {
    const primaryResult = suggestions.filter(product => product.id === suggestion.id);
    const relatedResults = suggestions.filter(product =>
      product.id !== suggestion.id && product.name.toLowerCase().includes(suggestion.name.toLowerCase())
    );

    const allResults = [...primaryResult, ...relatedResults];
    setResults(allResults);
    setShowSearchResults(true);
    navigate('/search-results');
    setInput('');
    setFilteredSuggestions([]);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>NEXUS</Logo>
          <MessageContainer>
            <LocationIcon src={locationIcon} alt="Location" />
            <Message>Colombia</Message>
          </MessageContainer>
        </Left>
        <Center>
          <SearchContainer>
            <Input
              placeholder="Buscar productos en Nexus"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SearchButton onClick={handleSearch}>
              <SearchIcon src={searchIcon} alt="Search" />
            </SearchButton>
            {filteredSuggestions.length > 0 && (
              <Autocomplete
                suggestions={filteredSuggestions}
                onSuggestionClick={handleSuggestionClick}
                clearSuggestions={() => setFilteredSuggestions([])}
              />
            )}
          </SearchContainer>
        </Center>
        <Right>
          <Language>ES</Language>
          <MenuItem>Listas</MenuItem>
          <MenuItem>Devoluciones y pedidos</MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Topbar;
