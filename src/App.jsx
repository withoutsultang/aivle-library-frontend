import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import BookReg from "./pages/BookReg";
import BookBody from "./pages/BookBody";
import LoginPage from "./pages/LoginPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BookList />} />
            </Routes>
            <Routes>
                <Route path="/loginpage" element={<LoginPage />} />
            </Routes>
            <Routes>
                <Route path="/booklist" element={<BookList />} />
            </Routes>
            <Routes>
                <Route path="/detail/:id" element={<BookDetail />} />
            </Routes>
            <Routes>
                <Route path="/bookreg" element={<BookReg />} />
            </Routes>
            <Routes>
                <Route path="/bookreg/:id" element={<BookReg />} />
            </Routes>
            <Routes>
                <Route path="/body" element={<BookBody />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
