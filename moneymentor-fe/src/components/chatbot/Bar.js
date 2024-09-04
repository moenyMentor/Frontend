import styled from "styled-components";
import React, { useState } from 'react';
import send from "../../assets/chatbot/send.png";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed; /* 바닥에 고정시키기 위한 설정 */
    bottom: 20px; /* 화면 아래쪽에 위치하도록 설정 */
    left: 0;
    padding: 0 20px;
    margin-top: 20px;
    z-index: 1000; /* 다른 콘텐츠 위에 배치 */
`;

const ChattingBar = styled.div`
    width: 70%;
    min-height: 10vh;
    max-height: 50vh;
    border-radius: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f1f8e9;
    padding: 0 20px;
    position: relative;
    overflow: hidden;
`;

const InputField = styled.textarea`
    width: calc(100% - 65px);
    min-height: 60%;
    border: none;
    font-size: 16px;
    outline: none;
    background-color: #f1f8e9;
    margin-right: 10px;
    resize: none;
    padding: 0 15px;
`;

const SendButton = styled.button`
    width: 55px;
    height: 55px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SendImg = styled.img`
    width: 80%;
    height: 70%;
`;

function Bar({ onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.nativeEvent.isComposing) {
            return; // 조합 중이면 동작을 막는다.
        }
        if (e.key === 'Enter' && e.shiftKey) {
            return; // Shift + Enter는 줄바꿈으로 처리
        } else if (e.key === 'Enter') {
            e.preventDefault(); // Enter의 기본 동작을 막아 텍스트 줄바꿈을 방지
            if (message.trim()) {
                onSendMessage(message);
                setMessage(''); // 메시지를 전송한 후, 입력 필드를 초기화
            }
        }
    };

    const handleSendClick = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage(''); // 메시지를 전송한 후, 입력 필드를 초기화
        }
    };

    return (
        <Wrapper>
            <ChattingBar>
                <InputField
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} // 한 이벤트 핸들러로 통합
                    placeholder="MoneyMentor에게 질문하세요"
                />
                <SendButton onClick={handleSendClick}>
                    <SendImg src={send} />
                </SendButton>
            </ChattingBar>
        </Wrapper>
    );
}

export default Bar;
