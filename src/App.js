import React from 'react';
import Accordion from './components/Accordion';
import "./css/App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Search from './components/Search';

function App() {
    return (
        <div className="App">
            <Accordion />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search/>} />
            </Routes>
            <footer className="footer"></footer>
        </div>
    );
}

export default App;
