import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { clearBag, removeProduct } from "../redux/bagRedux";
import axios from "axios";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  margin-top: 10px;
  background-color: #ff6464;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #d43f3f;
  }
`;

const Bag = () => {
  const [bag] = useSelector((state) => [state.bag, state.dispatch]);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetails();
  });

  const getUserDetails = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
      const currentUser = user && JSON.parse(user).currentUser;
      const userId = currentUser?._id;
      const userDetails = await axios.get(`http://localhost:5000/api/users/find/${userId}`);
      setEmail(userDetails.data.email);
      console.log(email);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const downloadLinks = bag.products.map((product) => {
    return `http://localhost:3000/download/${product._id}`;
  });

  const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sendEmail/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_email: email,
          subject: 'Your Subject',
          text: `Download your photos using the following links:\n\n${downloadLinks.join('\n')}`,
        }),
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleCheckout = () => {
    sendEmail();
    dispatch(clearBag());
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <div>
            <TopButton type="filled">Items in Shopping Bag: ({bag.products.length})</TopButton>
          </div>
          <TopButton onClick={() => history.push('/')}>CONTINUE SHOPPING</TopButton>
        </Top>
        <Bottom>
          <Info>
            {bag.products.map((photo) => (
              <Product key={photo._id}>
                <ProductDetail>
                  <Image src={photo.img} alt={photo.title} />
                  <Details>
                    <span>
                      <b>Photo:</b> {photo.title}
                    </span>
                    <span>
                      <b>ID:</b> {photo._id}
                    </span>
                    <span>
                      <b>Format:</b> {photo.format}
                    </span>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductPrice>
                    $ {photo.price * photo.quantity}
                  </ProductPrice>
                  <RemoveButton onClick={() => dispatch(removeProduct(photo._id))}>Remove</RemoveButton>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <span>Subtotal</span>
              <span>$ {bag.total}</span>
            </SummaryItem>
            {bag.products.length > 0 && (
              <>
                <SummaryItem>
                  <span>Estimated Shipping</span>
                  <span>$ 9</span>
                </SummaryItem>
                <SummaryItem>
                  <span>Shipping Discount</span>
                  <span>- 15%</span>
                </SummaryItem>
              </>
            )}
            {bag.products.length > 0 && (
              <SummaryItem type="total">
                <span>Total</span>
                <span>$ {(bag.total + 9) - (bag.total + 9) * 0.15}</span>
              </SummaryItem>
            )} {bag.products.length === 0 && (
              <SummaryItem type="total">
                <span>Total</span>
                <span>$ 0</span>
              </SummaryItem>
            )}
            <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Bag;
