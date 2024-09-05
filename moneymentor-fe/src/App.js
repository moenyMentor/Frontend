import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useState } from "react";
import MainPage from "./pages/MainPage";
import FirstChatbot from "./pages/FirstChatbot";
import SecondChatbot from "./pages/SecondChatbot";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box; 
  }
  body {
    display: flex;
    background-color:#DBE4A9;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  #root {
    width: 80%;
       
    
    // border: 1px solid gray;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/product" element={<SecondChatbot/>}></Route>
        <Route path="/study" element={<FirstChatbot/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;