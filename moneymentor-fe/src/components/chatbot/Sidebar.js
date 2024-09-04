import styled from "styled-components";
import React from 'react';

const SidebarContainer = styled.div`
    width: 250px;
    height: 100%;
    background-color: #f4f4f4;
    position: fixed;
    top: 0;
    right: 0;
    transform: translateX(${props => (props.isOpen ? '0' : '100%')});
    transition: transform 0.3s ease;
    box-shadow: -2px 0 5px rgba(0,0,0,0.3);
    z-index: 1000;
    padding: 20px;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    left: 20px;
`;

const SidebarContent = styled.div`
    margin-top: 60px;
`;

function Sidebar({ isOpen, onClose }) {
    return (
        <SidebarContainer isOpen={isOpen}>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <SidebarContent>
                {/* 사이드바 내용 추가 */}
                <p>사이드바 내용</p>
            </SidebarContent>
        </SidebarContainer>
    );
}

export default Sidebar;
