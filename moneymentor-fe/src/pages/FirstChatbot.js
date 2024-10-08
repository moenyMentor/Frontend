import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from 'axios';

import left from "../assets/chatbot/leftArrow.png";
import record from "../assets/chatbot/record.png";
import Bar from "../components/chatbot/Bar";
import Sidebar from "../components/chatbot/Sidebar";

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

// 로딩 스피너 스타일
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

function FirstChatbot() {
    const [messages, setMessages] = useState([]); // 통합된 메시지 배열
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const messageEndRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSendMessage = async (newMessage) => {
        console.log("input:", newMessage);
        if (newMessage) {
            // 보낸 메시지 추가
            setMessages(prevMessages => [
                ...prevMessages,
                { text: newMessage, type: 'sent' } // 보낸 메시지는 'sent' 타입
            ]);

            try {
                setLoading(true);
                // 메시지를 서버로 POST 요청
                const response = await axios.post('http://localhost:8000/api/messages', {
                    message: newMessage
                });

                const serverResponse = response.data.response; // 서버의 응답 메시지
                console.log('서버 응답:', serverResponse);

                // 서버 응답 메시지를 추가
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: serverResponse, type: 'received' } // 받은 메시지는 'received' 타입
                ]);
                setLoading(false);
            } catch (error) {
                console.error("메시지 전송 실패:", error);
                alert("메시지 전송 중 문제가 발생했습니다.");
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
                    "안녕하세요 머니멘토 경제공부 챗봇입니다😎",
                    "궁금하신 경제 용어에 대해 질문해주세요",
                ];

                dummyMessages.forEach(message => {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { text: message, type: 'received' }
                    ]);
                });
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
                    {messages.map((msg, index) =>
                        msg.type === 'sent' ? (
                            <Message key={index}>{msg.text}</Message>
                        ) : (
                            <ReceiveMessage key={index}>{msg.text}</ReceiveMessage>
                        )
                    )}
                    <div ref={messageEndRef} />
                    {loading && <Spinner />} {/* 로딩 상태일 때 스피너 표시 */}
                </MessageList>
            </ChatWrapper>
            <Bar onSendMessage={handleSendMessage} />
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </Wrapper>
    );
}

export default FirstChatbot;
