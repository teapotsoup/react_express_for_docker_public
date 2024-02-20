import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [navigate]);

    return (
        <div>
            <h1>404 - 페이지를 찾을 수 없습니다.</h1>
            <p>{countdown}초 후에 홈페이지로 이동합니다.</p>
        </div>
    );
}

export default Error;