import React, { useState, useEffect } from "react";
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

const articles = [
    {
        title: "[오늘의 경제뉴스] 국민연금 보험료율 9%→13% 인상…'더 내고 덜 받는' 尹 개혁안",
        description: "(사진=연합뉴스) 1. 연금 고갈 시점 2056년→2088년...'국민 용돈' 수준 허울뿐인 연금 전락 국민연금 보험료율이 현행 9%에서 13%로 오르고, 소득대체율... 2022년 기준 경제협력개발기구(OECD) 회원국 공적연금 평균 보...",
        url: 'https://www.newsverse.kr/news/articleView.html?idxno=6014',
        urlToImage: 'https://cdn.newsverse.kr/news/photo/202409/6014_10731_1320.jpg',
    },
    {
        title: "사람 불러놓고 '임금 깎자'만 외치는 오세훈, 싸게 쓰자가 답인가",
        description: "돌봄 노동의 가치부터 재평가를 '월급 238만원' 필리핀 이모님 비싸다더니… '뜻밖의 상황' [이슈+](24.08.21 한국경제) 외국인 가사도우미·간병인만이라도 최저임금 차등 적용을(24.08.22 한국경제) '238만원' 필리핀 이모",
        url: 'https://www.pressian.com/pages/articles/2024090210332077811?utm_source=naver&utm_medium=search',
        urlToImage: 'https://www.pressian.com/_resources/10/2024/09/03/2024090210323669854_l.jpg',
    },
    {
        title: "[오늘의 경제뉴스] '월급 받고 남는 게 없다'…가계 여윳돈 8분기째 ‘역대 최장’ 감소",
        description: "(사진=연합뉴스) 1. 가계 여윳돈 월 100만원 턱걸이…고물가∙고금리 탓 내수 침체 원인 가계 흑자액이 최근 8개 분기 연속 줄어든 것으로 나타났다.... 주원 현대경제연구원 경제연구실장은 '수출 반도체 기업이 아닌 나",
        url: 'https://www.newsverse.kr/news/articleView.html?idxno=6005',
        urlToImage: 'https://cdn.newsverse.kr/news/photo/202409/6005_10719_2645.jpg',
    }
];

function News() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 뉴스 전환 타이머
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
        }, 3000); // 3초 간격

        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 타이머 해제
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    };

    return (
        <Bigbox>
            <Button onClick={handlePrev} style={{ left: '0.25vw' }}>
                <img src={leftBtn} alt="Previous" />
            </Button>
            <Smallbox>
                <NewsItem article={articles[currentIndex]}></NewsItem>
            </Smallbox>
            <Button onClick={handleNext} style={{ right: '0.25vw' }}>
                <img src={rightBtn} alt="Next" />
            </Button>
        </Bigbox>
    );
}

export default News;
