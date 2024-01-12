import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
    color: black;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: red;
    color: blac;
    cursor: pointer;
    font-weight: 600;
    border-radius: 15px;
`;

const FormatItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/photoz/${item.format}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default FormatItem;
