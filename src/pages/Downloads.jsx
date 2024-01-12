import React, { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
border: none;
padding: 15px 20px;
background-color: red;
color: black;
cursor: pointer;
font-weight: 600;
font-size: 16px;
border-radius: 15px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  border-style: none none solid none;
`;

const Downloads = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/photos/find/${id}`);
        setPhoto(res.data);
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    };
    getProduct();
  }, [id]);

  const handleDownloadOnClick = (req, res) => {
    try {
      const url = "http://localhost:3000/" + photo.img;
      const filename = url.split("/").pop();
      const aTag = document.createElement("a");
      aTag.href = url;
      aTag.setAttribute("download", filename);
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };

  return (
    <div>
      <Wrapper>
        <h1 style={{ color: "red", marginLeft: "37%" }}>DOWNLOAD PAGE</h1>
      </Wrapper>
      {photo && (
        <ButtonDiv>
          <Button type='submit' onClick={handleDownloadOnClick}>Download Photo</Button>
        </ButtonDiv>
      )}
    </div>
  );
};

export default Downloads;
