import styled from "styled-components";

const Wrapper = styled.div`
  height: 55px;
  display: flex;
  gap: 15px;
  align-items: start;
  justify-content: center;

  h2 {
    margin-top: 5px;
    font-weight: 700;
    font-size: 2rem;
    color: var(--primary-500);
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 20%;
  }

  @media (min-width: 992px) {
    h2 {
      font-size: 2.2rem;
    }

    img {
      width: 55px;
      height: 55px;
    }
  }
`;

export default Wrapper;
