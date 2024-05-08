import React, { useState } from "react";
import styled from 'styled-components';
import searchIcon from '../Assets/search.png';
import locationIcon from '../Assets/location.png';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate de react-router-dom

const Container = styled.div`
  height: 60px;
  background-color: #F5E091;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 30px;
  padding: 5px;
  width: 800px;
  height: 28px;
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
  width:800px;
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
  const navigate = useNavigate(); // Obtiene la función de navegación

  

  const handleChange = (value) => {
    setInput(value);
  };

  const fetchData = (value) => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((product) => {
          return value && product && product.name && product.name.toLowerCase().includes(value.toLowerCase());
        });
        console.log('Resultados encontrados:', results);
        setResults(results);
        setShowSearchResults(true);
        navigate('/search-results'); // Navega a la página de resultados
      })
      .catch((error) => {
        console.error('Error al buscar productos:', error);
      });
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    fetchData(input);
    setInput('');
  };

  const handleClearSearch = () => {
    setInput('');
    setResults([]);
    setShowSearchResults(false);
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
