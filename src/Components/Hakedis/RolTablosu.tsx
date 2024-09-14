import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RolTablosu.css';
import SideMenu from '../utils/SideMenu'; 

const RolTablosu: React.FC = () => {
    const [roles, setRoles] = useState<any[]>([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:5025/api/rol');
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };    

    return (
        <div>
            <SideMenu />
            <div className="rol-tablosu-container">
                <h2>Rol Tablosu</h2>
                <table className="rol-table">
                    <thead>
                        <tr>
                            <th>Rol Adı</th>
                            <th>Rol Kodu</th>
                            <th>Açıklama</th>
                            <th>Oluşturan</th>
                            <th>Oluşturma Tarihi</th>
                            <th>Güncelleyen</th>
                            <th>Güncelleme Tarihi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((rol) => (
                            <tr key={rol.id}>
                                <td>{rol.rolAdi}</td>
                                <td>{rol.rolKodu}</td>
                                <td>{rol.aciklama}</td>
                                <td>{rol.olusturan}</td>
                                <td>{new Date(rol.olusturmaTarihi).toLocaleDateString()}</td>
                                <td>{rol.guncelleyen}</td>
                                <td>{new Date(rol.guncellemeTarihi).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RolTablosu;
