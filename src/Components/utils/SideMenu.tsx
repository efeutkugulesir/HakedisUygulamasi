import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideMenu.css';

const SideMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(''); // Kullanıcı adı için state
    const [role, setRole] = useState(''); // Rol için state
    const [showLogoutModal, setShowLogoutModal] = useState(false); // Çıkış yapma modalı için state
    const navigate = useNavigate();

    useEffect(() => {
        // localStorage'dan kullanıcı adı ve rolü alın
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedRole) {
            setRole(storedRole);
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.classList.toggle('shifted', !isOpen);
    };

    const handleLogout = () => {
        setShowLogoutModal(true); // Çıkış yapma modalını göster
    };

    const confirmLogout = () => {
        // Çıkış yaparken kullanıcı adı ve rolünü localStorage'dan kaldırın
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setShowLogoutModal(false); // Modalı kapat
        navigate('/login');
    };

    const cancelLogout = () => {
        setShowLogoutModal(false); // Modalı kapat
    };

    return (
        <div>
            <button className="menu-button" onClick={toggleMenu}>
                ☰ Menü
            </button>
            <div className={`side-menu ${isOpen ? 'open' : ''}`}>
                <div className="user-info">
                    <p>SN. {username}</p>
                    <p>Rol: {role}</p>
                </div>
                <ul>
                    <li><Link to="/hakedis-listesi" onClick={toggleMenu}><i className="fas fa-list"></i> Hakediş Listesi</Link></li>
                    <li><Link to="/kullanici-tablosu" onClick={toggleMenu}><i className="fas fa-user"></i> Kullanıcı Tablosu</Link></li>
                    <li><Link to="/rol-tablosu" onClick={toggleMenu}><i className="fas fa-user-tag"></i> Rol Tablosu</Link></li>
                    <li><Link to="/yetki-tablosu" onClick={toggleMenu}><i className="fas fa-user-shield"></i> Yetki Tablosu</Link></li>
                    <li className="logout"><button onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Çıkış Yap</button></li>
                </ul>
            </div>

            {showLogoutModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Çıkış yapmak istediğinizden emin misiniz?</p>
                        <button onClick={confirmLogout}>Evet</button>
                        <button onClick={cancelLogout}>Hayır</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SideMenu;
