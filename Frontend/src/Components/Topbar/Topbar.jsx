import React from "react"
import styled from 'styled-components'
import searchIcon from '../Assets/search.png'
import locationIcon from '../Assets/location.png'


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
  padding-right: 30 px;
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



const Topbar = () => {

  

  
    return (
 
            <Container>
                <Wrapper>
                    <Left>
                        <Logo>NEXUS</Logo>
                        <MessageContainer>
                        <LocationIcon src={locationIcon} alt="Location"/>
                        <Message>Colombia</Message>
                        </MessageContainer>
                    </Left>
                    <Center>
                      <SearchContainer>
                            <Input placeholder="Buscar productos en Nexus"/> 
                            <SearchButton>
                              <SearchIcon src={searchIcon} alt="Search"/>
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