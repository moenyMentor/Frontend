import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;

  height: 60px;
  //border-bottom: 1px solid gray;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Text = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: end;
`;

const Logo = styled.div`
  font-size: 40px;
  font-weight: Light;
  cursor: pointer;
  letter-spacing: 0.1px;
`;


const PageName = styled.div`
  padding-bottom: 3px;
`;

const Navi = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  label {
    cursor: pointer;
  }
`;

const NomalText = styled.div`
  cursor: pointer;
`;

function Header({ text }) {

  const navigate = useNavigate();


  
  return (
    <Wrapper>
      <Text>
        <Logo
          onClick={() => {
            navigate("/");
          }}
        >
         MoneyMentor
        </Logo>
        <PageName>{text}</PageName>
      </Text>
    </Wrapper>
  );
}

export default Header;