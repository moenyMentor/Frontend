import styled from "styled-components";
import React from 'react';
import { useNavigate } from 'react-router-dom';


import Header from "../components/Header";
import News from "../components/main/News";
import chat1 from '../assets/main/chatBtn1.png';
import chat2 from '../assets/main/chatBtn2.png';


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

   
    `
;

const ContentWrapper = styled.div`
    width: 50vw; /* Width of Bigbox */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    margin-top: 50px; /* Space above the News section */
`;

const Text = styled.div`
    width: 230px;
    height: 37px;
    margin-left:30px;
    font-size: 25px;
`;

const ButtonWrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 30px;
    gap: 250px;
`;

const IconButton = styled.button`
    width: 200px; /* 기본적으로 Arrow 크기 */
    height: 100px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* 이미지가 버튼 영역을 넘지 않도록 설정 */

    &:hover {
        opacity: 0.7; /* 마우스 오버 시 살짝 투명하게 */
    }
`;

const IconImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain; /* 이미지가 버튼 영역을 넘지 않도록 설정 */
`;

function MainPage(props) {

    const navigate = useNavigate(); 

    const handleProduct = () => {
        navigate(`/product`);
    };

    const handleStudy = () => {
        navigate(`/study`);
    };

    
    return (
        <Wrapper>
            <Header />
            <ContentWrapper>
                <Text>오늘의 경제뉴스</Text>
                <News />
            </ContentWrapper>
            <ButtonWrapper>
                <IconButton onClick={handleProduct}>
                    <IconImage src={chat1} />
                </IconButton>
                <IconButton onClick={handleStudy}>
                    <IconImage src={chat2} />
                </IconButton>
            </ButtonWrapper>
        </Wrapper>
    );
}

export default MainPage;
