import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'


const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Dummy login check
        if (username === 'user' && password === 'password') {
            navigate('/hakediş-listesi');
        } else {
            setError('Kullanıcı adı veya şifre hatalı.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input 
                type="text" 
                placeholder="Kullanıcı Adı" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Şifre" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
