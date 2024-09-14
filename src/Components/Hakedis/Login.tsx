import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5025/api/auth/login', { username, password });
            if (response.data.success) {
                localStorage.setItem('username', username);
                localStorage.setItem('role', response.data.role); // Rolü kaydet
                navigate('/hakedis-listesi');
            } else {
                setError('Kullanıcı adı veya şifre hatalı');
            }
        } catch (err) {
            setError('Kullanıcı adı veya şifre hatalı');
        }
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <div className="login-box">
                    <h2 className="login-title">Giriş Yap</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Kullanıcı Adı"
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Şifre"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="login-error">{error}</p>}
                        <button type="submit" className="login-button">Giriş Yap</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
