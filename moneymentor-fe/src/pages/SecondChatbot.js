import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from 'axios';

import left from "../assets/chatbot/leftArrow.png";
import record from "../assets/chatbot/record.png";
import Bar from "../components/chatbot/Bar";
import Sidebar from "../components/chatbot/Sidebar";
import useReceiveMessages from '../hooks/useReceiveMessages'; // 훅 임포트

// 페이드 인 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px); /* 아래에서 위로 올라오는 효과 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 100vh;
`;

const EmojiWrapper = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom:20px;
`;

const Logo = styled.div`
    font-size: 35px;
    font-weight: light;
    cursor: pointer;
    letter-spacing: 0.1px;
    flex-grow: 1;
    text-align: center;
`;

const IconButton = styled.button`
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &:hover {
        opacity: 0.7;
    }
`;

const RecordButton = styled(IconButton)`
    width: 30px;
    height: 30px;
`;

const IconImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const ChatWrapper = styled.div`
    width: 70%;
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 12vh;
`;

const MessageList = styled.div`
    width: 100%;
    margin-bottom: 20px;
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Message = styled.div`
    background-color: #f1f8e9;
    border-radius: 20px;
    padding: 13px;
    margin-bottom: 10px;
    max-width: 70%;
    word-wrap: break-word;
    align-self: flex-end;
    white-space: pre-wrap;
    animation: ${fadeIn} 0.5s ease-out;
`;

const ReceiveMessage = styled.div`
    background-color: #B5BE83;
    border-radius: 20px;
    padding: 13px;
    margin-bottom: 10px;
    max-width: 70%;
    word-wrap: break-word;
    align-self: flex-start;
    white-space: pre-wrap;
    animation: ${fadeIn} 0.5s ease-out;
`;

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #000;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

function SecondChatbot(props) {
    const [messages, setMessages] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const messageEndRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSendMessage = async (newMessage) => {
        console.log("input:", newMessage);
        if (newMessage) {
            setMessages(prevMessages => [...prevMessages, { text: newMessage, type: 'user' }]);
            setLoading(true);
            
            try {
                // 서버로 POST 요청
                const response = await axios.post('http://localhost:8000/api/recommend', {
                    message: newMessage
                });

                // 서버 응답 처리
                const serverResponse = response.data.response;
                console.log('서버 응답:', serverResponse);

                // 응답 메시지 추가
                setMessages(prevMessages => [...prevMessages, { text: serverResponse, type: 'bot' }]);
            } catch (error) {
                console.error("메시지 전송 실패:", error);
                alert("메시지 전송 중 문제가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        }
    };
    

    const handleArrowClick = () => {
        navigate(-1);
    };

    const handleRecordClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        const fetchDummyData = () => {
            setTimeout(() => {
                const dummyMessages = [
                    { text: "안녕하세요 머니멘토 경제상품 추천 챗봇입니다😎<br>상품 추천을 위해 다음 질문에 답변해주세요!", type: 'bot' },
                    { text: "이름과 나이,연봉, 목표, 현재 저축액, 투자 경험, 투자 성향, 월별 투자 가용금액을 알려주세요", type: 'bot' },
                    { text: "투자성향은 <a href='https://terms.naver.com/entry.naver?docId=1630644&cid=42106&categoryId=42106' target='_blank' rel='noopener noreferrer'>여기서 확인할 수 있어요!</a>", type: 'bot' }
                ];
                
                dummyMessages.forEach(message => setMessages(prevMessages => [...prevMessages, message]));
            }, 1000);
        };

        fetchDummyData();
    }, []);

    return (
        <Wrapper>
            <EmojiWrapper>
                <IconButton onClick={handleArrowClick}>
                    <IconImage src={left} alt="Back" />
                </IconButton>
                <Logo>MoneyMentor</Logo>
                <RecordButton onClick={handleRecordClick}>
                    <IconImage src={record} alt="Record" />
                </RecordButton>
            </EmojiWrapper>
            <ChatWrapper>
                <MessageList>
                    {messages.map((msg, index) => (
                        msg.type === 'user' ? 
                            <Message key={index}>{msg.text}</Message> : 
                            <ReceiveMessage key={index} dangerouslySetInnerHTML={{ __html: msg.text }} />
                    ))}
                    <div ref={messageEndRef} />
                    {loading && <Spinner />}
                </MessageList>
            </ChatWrapper>
            <Bar onSendMessage={handleSendMessage} />
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </Wrapper>
    );
}

export default SecondChatbot;
