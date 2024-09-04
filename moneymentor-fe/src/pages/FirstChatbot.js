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
    flex-direction: column; /* flex-direction을 원래대로 */
    align-items: center;
    padding-bottom: 12vh;
`;

const MessageList = styled.div`
    width: 100%;
    margin-bottom: 20px;
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column; /* flex-direction을 원래대로 */
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
    animation: ${fadeIn} 0.5s ease-out; /* 애니메이션 추가 */
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
    animation: ${fadeIn} 0.5s ease-out; /* 애니메이션 추가 */
`;

function FirstChatbot(props) {
    const [messages, setMessages] = useState([]);
    const { receivedMessages, addReceivedMessage } = useReceiveMessages(); // 훅 사용
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const messageEndRef = useRef(null);

    const navigate = useNavigate(); 

    const handleSendMessage = (newMessage) => {
        setMessages([...messages, newMessage]); // 새로운 메시지를 뒤에 추가
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
    }, [messages, receivedMessages]);

    useEffect(() => {
        const fetchDummyData = () => {
            setTimeout(() => {
                const dummyMessages = [
                    "안녕하세요 머니멘토 경제상품 추천 챗봇입니다😎<br>상품 추천을 위해 다음 질문에 답변해주세요!",
                    "이름과 나이를 알려주세요",
                ];

                dummyMessages.forEach(message => addReceivedMessage(message));
            }, 1000);
        };

        fetchDummyData();
    }, [addReceivedMessage]);

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
                    {receivedMessages.map((msg, index) => (
                        <ReceiveMessage key={index} dangerouslySetInnerHTML={{ __html: msg }} />
                    ))}
                    {messages.map((msg, index) => (
                        <Message key={index}>{msg}</Message>
                    ))}
                    <div ref={messageEndRef} />
                </MessageList>
            </ChatWrapper>
            <Bar onSendMessage={handleSendMessage} />
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </Wrapper>
    );
}

export default FirstChatbot;
