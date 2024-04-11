import React from "react"
import styled from 'styled-components'


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
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 30px;
  padding: 5px;
  width: 400px;
  height: 25px;
`;

const Input = styled.input`
  border: none;
  width:400px;
  height: 25px;
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
                        <Language>ES</Language>
                        <SearchContainer>
                            <Input placeholder="Buscar productos"/>    
                        </SearchContainer>
                    </Left>
                    <Center>
                      <Logo>NEXUS</Logo>
                    </Center>
                    <Right>
                      <MenuItem>Listas</MenuItem>
                      <MenuItem>Devoluciones y pedidos</MenuItem>
                    </Right>
                </Wrapper>
            </Container>
    );
};

export default Topbar;