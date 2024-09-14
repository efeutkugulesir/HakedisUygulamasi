import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './KullaniciTablosu.css';
import SideMenu from '../utils/SideMenu';

const KullaniciTablosu: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [newUser, setNewUser] = useState({ id: null, username: '', email: '' });
    const [editingUser, setEditingUser] = useState<any>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const role = localStorage.getItem('role');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5025/api/kullanici');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleAddUser = async () => {
        if (role === 'tester') {
            alert('Bu işlemi yapmak için yetkiniz yok.');
            return;
        }

        if (!newUser.username || !newUser.email) {
            console.error('All fields are required.');
            return;
        }

        try {
            if (editingUser) {
                await axios.put(`http://localhost:5025/api/kullanici/${editingUser.id}`, newUser);
                setUsers(users.map(user => (user.id === editingUser.id ? newUser : user)));
                setEditingUser(null);
            } else {
                const { id, ...userWithoutId } = newUser;
                const response = await axios.post('http://localhost:5025/api/kullanici', userWithoutId);
                setUsers([...users, response.data]);
            }
            setNewUser({ id: null, username: '', email: '' });
        } catch (error) {
            console.error('Error adding/updating user:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error data:', error.response?.data);
            }
        }
    };

    const handleDeleteUser = (id: number) => {
        if (role !== 'admin') {
            alert('Bu işlemi yapmak için yetkiniz yok.');
            return;
        }
        setShowDeleteModal(true);
        setUserToDelete(id);
    };

    const confirmDeleteUser = async () => {
        if (userToDelete !== null) {
            try {
                await axios.delete(`http://localhost:5025/api/kullanici/${userToDelete}`);
                setUsers(users.filter(user => user.id !== userToDelete));
                setShowDeleteModal(false);
                setUserToDelete(null);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const cancelDeleteUser = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const handleEditUser = (user: any) => {
        if (role === 'tester') {
            alert('Bu işlemi yapmak için yetkiniz yok.');
            return;
        }
        setEditingUser(user);
        setNewUser(user);
    };

    return (
        <div>
            <SideMenu />
            <div className="kullanici-tablosu-container">
                <h2>Kullanıcı Tablosu</h2>
                {role !== 'tester' && (
                    <div className="user-form">
                        <div className="form-group">
                            <label>Kullanıcı Adı</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Kullanıcı Adı"
                                value={newUser.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button onClick={handleAddUser}>
                            {editingUser ? 'Güncelle' : 'Ekle'}
                        </button>
                    </div>
                )}
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Kullanıcı Adı</th>
                            <th>Email</th>
                            <th>Şifre</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    {role !== 'tester' && (
                                        <>
                                            <button className="edit-button" onClick={() => handleEditUser(user)}>Düzenle</button>
                                            {role === 'admin' && (
                                                <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>Sil</button>
                                            )}
                                        </>
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
                        <p>Bu kullanıcıyı silmek istediğinizden emin misiniz?</p>
                        <button onClick={confirmDeleteUser}>Evet</button>
                        <button onClick={cancelDeleteUser}>Hayır</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KullaniciTablosu;
