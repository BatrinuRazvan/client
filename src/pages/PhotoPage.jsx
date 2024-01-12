import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { addProduct } from "../redux/bagRedux";
import { useDispatch } from "react-redux";
import axios from "axios";

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
  border-style: none none solid none;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 20px;
  border-style: none none solid none;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const PhotoPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [photo, setPhoto] = useState({});
  const [quantity] = useState(1);
  const [format, setFormat] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get("http://localhost:5000/api/photos/find/" + id);
      setPhoto(res.data);
      setLoading(false);
      setFormat(res.data.format[0]);
    };
    getProduct();
  }, [id]);

  const handleClick = () => {
    dispatch(
      addProduct({ ...photo, quantity, format })
    );
  };

  if (loading) {
    return (
      <LoadingContainer />
    );
  }

  return (
    <div>
      <Navbar />
      <Wrapper>
        <ImgContainer >
          <Image src={require('../../public/images/' + photo.img)} />
        </ImgContainer>
        <InfoContainer>
          <Title><b>Title: </b>{photo.title}</Title>
          <Desc><b>TAGS: </b> {photo.categories}</Desc>
          <Price>$ {photo.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Format</FilterTitle>
              <FilterSize onChange={(e) => setFormat(e.target.value)}>
                {photo.format?.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <Button onClick={handleClick}>ADD TO BAG</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default PhotoPage;
