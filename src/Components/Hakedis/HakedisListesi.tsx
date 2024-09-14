import './HakedisListesi.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideMenu from '../utils/SideMenu';

const companyList = {
    2007: 'Erdemir',
    2: 'Oyak',
    3: 'İndisol',
    2008: 'Mais',
    2009: 'Tamek'
};

const HakedisListesi: React.FC = () => {
    const [hakedisList, setHakedisList] = useState<any[]>([]);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const role = localStorage.getItem('role'); // Rolü localStorage'dan al

    useEffect(() => {
        axios.get('http://localhost:5025/api/hakedis')
            .then(response => {
                setHakedisList(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the hakedis list!', error);
            });
    }, []);

    const handleDelete = (id: string) => {
        if (role !== 'admin') {
            alert('Bu işlemi yapmak için yetkiniz yok.');
            return;
        }
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (deleteId) {
            axios.delete(`http://localhost:5025/api/hakedis/${deleteId}`)
                .then(() => {
                    setHakedisList(hakedisList.filter(h => h.id !== deleteId));
                })
                .catch(error => {
                    console.error('There was an error deleting the hakedis!', error);
                })
                .finally(() => {
                    setShowModal(false);
                    setDeleteId(null);
                });
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
        setDeleteId(null);
    };

    const handleEdit = (hakedis: any) => {
        if (role === 'tester') {
            alert('Bu işlemi yapmak için yetkiniz yok.');
            return;
        }
        navigate('/hakedis-tanim', { state: { hakedis } });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString(); 
    };

    return (
        <div>
            <SideMenu />
            <h2>Hakediş Listesi</h2>
            {role !== 'tester' && (
                <div className="button-container">
                    <button className="yeni-hakedis-button" onClick={() => navigate('/hakedis-tanim')}>Yeni Hakediş Ekle</button>
                </div>
            )}
            <table className="hakediş-listesi-tablosu">
                <thead>
                    <tr>
                        <th>Şirket</th>
                        <th>Çalışan Adı</th>
                        <th>Süre</th>
                        <th>Brüt Ücret</th>
                        <th>Net Ücret</th>
                        <th>Oluşturan</th>
                        <th>Oluşturma Tarihi</th>
                        <th>Güncelleyen</th>
                        <th>Güncelleme Tarihi</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {hakedisList.map((hakedis) => (
                        <tr key={hakedis.id}>
                            <td>{companyList[hakedis.cId]}</td>
                            <td>{`${hakedis.firstName} ${hakedis.lastName}`}</td>
                            <td>{hakedis.estimatedTime}</td>
                            <td>{hakedis.grossWage}</td>
                            <td>{hakedis.netWage}</td>
                            <td>{hakedis.creater}</td>
                            <td>{formatDate(hakedis.createDate)}</td>
                            <td>{hakedis.updater}</td>
                            <td>{formatDate(hakedis.updateDate)}</td>
                            <td>
                                {role !== 'tester' && (
                                    <>
                                        <button className="düzenle-button" onClick={() => handleEdit(hakedis)}>Düzenle</button>
                                        {role === 'admin' && (
                                            <button className="sil-button" onClick={() => handleDelete(hakedis.id)}>Sil</button>
                                        )}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Bu veriyi silmek istediğinize emin misiniz?</p>
                        <button onClick={confirmDelete}>Evet</button>
                        <button onClick={cancelDelete}>Hayır</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HakedisListesi;
