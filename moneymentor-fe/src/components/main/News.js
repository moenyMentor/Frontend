import styled from "styled-components";
import leftBtn from '../../assets/main/leftBtn.png';
import rightBtn from '../../assets/main/rightBtn.png';
import NewsItem from "../main/NewsItem";

const Bigbox = styled.div`
    width: 50vw;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 30px;
    position: relative;
    z-index: 0;
`;

const Smallbox = styled.div`
    width: 46vw;
    height: 33vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #D9D9D9;
    padding: 1rem; /* Add padding to create space around the content */
    border-radius: 20px; /* Round the corners */
    z-index: 1;
    position: relative;
`;

const Button = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 25px;
    z-index: 2;

    &:focus {
        outline: none; /* Remove default focus outline */
    }

    img {
        width: 100%;
        height: 100%;
    }

    &:hover {
        opacity: 0.8; /* Change opacity on hover */
    }
`;

const sampleArticle = {
    title: '테스트제목',
    description: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    url: 'http://google.com',
    urlToImage: 'https://via.placeholder.com/160',
};

function News({ children }) {
    return (
        <Bigbox>
            <Button style={{ left: '0.25vw' }}>
                <img src={leftBtn} alt="Previous" />
            </Button>
            <Smallbox>
                <NewsItem article={sampleArticle}></NewsItem>
            </Smallbox>
            <Button style={{ right: '0.25vw' }}>
                <img src={rightBtn} alt="Next" />
            </Button>
        </Bigbox>
    );
}

export default News;
