import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './YetkiTablosu.css';
import SideMenu from '../utils/SideMenu';

const YetkiTablosu: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [roles, setRoles] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [kullaniciRoller, setKullaniciRoller] = useState<any[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<number | null>(null);

    const role = localStorage.getItem('role');

    useEffect(() => {
        fetchUsers();
        fetchRoles();
        fetchKullaniciRoller();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5025/api/kullanici');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:5025/api/rol');
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchKullaniciRoller = async () => {
        try {
            const response = await axios.get('http://localhost:5025/api/kullaniciRol');
            setKullaniciRoller(response.data);
        } catch (error) {
            console.error('Error fetching kullaniciRoller:', error);
        }
    };

    const handleAddKullaniciRol = async () => {
        if (role === 'tester') {
            alert('Bu işlemi yapmak için yetkiniz yok.');
            return;
        }

        if (!selectedUser || !selectedRole) {
            console.error('Tüm alanlar zorunludur.');
            return;
        }

        try {
            await axios.post('http://localhost:5025/api/kullaniciRol', {
                KullaniciId: selectedUser,
                RolId: selectedRole
            });

            // Kullanıcı rollerini tekrar yükleyerek güncellenmiş veriyi getiriyoruz.
            await fetchKullaniciRoller();
            setSelectedUser('');
            setSelectedRole('');
        } catch (error) {
            console.error('Kullanıcı rolü eklenirken hata oluştu:', error);
        }
    };

    const handleDeleteKullaniciRol = (id: number) => {
        if (role !== 'admin') {
            alert('Bu işlemi yapmak için yetkiniz yok.');
            return;
        }
        setShowDeleteModal(true);
        setRoleToDelete(id);
    };

    const confirmDeleteKullaniciRol = async () => {
        if (roleToDelete !== null) {
            try {
                await axios.delete(`http://localhost:5025/api/kullaniciRol/${roleToDelete}`);
                setKullaniciRoller(kullaniciRoller.filter(kr => kr.id !== roleToDelete));
                setShowDeleteModal(false);
                setRoleToDelete(null);
            } catch (error) {
                console.error('Kullanıcı rolü silinirken hata oluştu:', error);
            }
        }
    };

    const cancelDeleteKullaniciRol = () => {
        setShowDeleteModal(false);
        setRoleToDelete(null);
    };

    return (
        <div>
            <SideMenu />
            <div className="yetki-tablosu">
                <h2>Kullanıcı Rol ve Yetki Tablosu</h2>
                <div className="yetki-form">
                    <div className="form-group">
                        <label>Kullanıcı Seç</label>
                        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                            <option value="">Kullanıcı Seç</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Rol Seç</label>
                        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="">Rol Seç</option>
                            {roles.map(rol => (
                                <option key={rol.id} value={rol.id}>{rol.rolAdi}</option>
                            ))}
                        </select>
                    </div>
                    {role !== 'tester' && (
                        <button onClick={handleAddKullaniciRol}>Ekle</button>
                    )}
                </div>
                <table className="yetki-table">
                    <thead>
                        <tr>
                            <th>Kullanıcı Adı</th>
                            <th>Rol Adı</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kullaniciRoller.map(kr => (
                            <tr key={kr.id}>
                                <td>{kr.kullaniciAdi ?? 'Bilinmiyor'}</td>
                                <td>{kr.rolAdi ?? 'Bilinmiyor'}</td>
                                <td>
                                    {role === 'admin' && (
                                        <button className="delete-button" onClick={() => handleDeleteKullaniciRol(kr.id)}>Sil</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Bu kullanıcı rolünü silmek istediğinizden emin misiniz?</p>
                        <button onClick={confirmDeleteKullaniciRol}>Evet</button>
                        <button onClick={cancelDeleteKullaniciRol}>Hayır</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YetkiTablosu;
