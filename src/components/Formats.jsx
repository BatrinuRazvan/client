import styled from "styled-components";
import FormatItem from "./FormatItem";
import { formats } from "../data";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

const Formats = () => {
  return (
    <Container>
      {formats.map((item) => (
        <FormatItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Formats;
