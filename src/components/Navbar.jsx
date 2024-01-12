import { Badge, Button, Menu, MenuItem as MuiMenuItem } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons"
import { ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
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

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: red;
  border: double;
  border-color: red;
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

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.bag.quantity);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    localStorage.clear();
    window.location.reload(true);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Button onClick={handleClick}><MenuIcon /></Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to={`/`} style={{ textDecoration: 'none' }}><MuiMenuItem>HOME</MuiMenuItem></Link>
            <Link to={`/photos/landscape`} style={{ textDecoration: 'none' }}><MuiMenuItem>Landscape</MuiMenuItem></Link>
            <Link to={`/photos/portrait`} style={{ textDecoration: 'none' }}><MuiMenuItem>Portrait</MuiMenuItem></Link>
            <Link to={`/photos/landmark`} style={{ textDecoration: 'none' }}>
              <MuiMenuItem>Landmark</MuiMenuItem></Link>
          </Menu>
          {user ? (
            <Button onClick={logOut}>LOGOUT</Button>
          ) : null}
        </Left>
        <Center>
          <Link style={{ textDecoration: "none" }} to="/">
            <Logo>.PHM</Logo>
          </Link>
        </Center>
        <Right>
          <Link to="/register">
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/login">
            <MenuItem>SIGN IN</MenuItem>
          </Link>
          <Link to="/bag">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
