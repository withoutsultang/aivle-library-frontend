import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/api/hello")
            .then((res) => {
                console.log("백엔드 응답:", res.data);
                setMessage(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{ padding: "40px" }}>
            <h1>프론트 → 백엔드 연동 테스트</h1>
            <h2>응답: {message}</h2>
        </div>
    );
}

export default App
