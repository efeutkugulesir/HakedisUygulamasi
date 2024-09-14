import './HakedisTanim.css';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import SideMenu from '../utils/SideMenu'; // Yan menü bileşenini import edin

const HakedisTanim: React.FC = () => {
    const [id, setId] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [grossWage, setGrossWage] = useState('');
    const [netWage, setNetWage] = useState(0);
    const [cId, setCId] = useState<string | number>('');
    const [createDate, setCreateDate] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Kullanıcı adı yerine rol yerine kullanılacak
    const username = localStorage.getItem('username'); 

    const handleCalculateNetWage = useCallback(() => {
        const net = parseFloat(grossWage) * 0.8;
        setNetWage(net);
    }, [grossWage]);

    useEffect(() => {
        if (location.state && location.state.hakedis) {
            const hakedis = location.state.hakedis;
            setId(hakedis.id);
            setFirstName(hakedis.firstName);
            setLastName(hakedis.lastName);
            setEstimatedTime(hakedis.estimatedTime ? hakedis.estimatedTime.toString() : '');
            setGrossWage(hakedis.grossWage ? hakedis.grossWage.toString() : '');
            setNetWage(hakedis.netWage ? hakedis.netWage : 0);
            setCId(hakedis.cId ? hakedis.cId.toString() : '');
            setCreateDate(hakedis.createDate ? new Date(hakedis.createDate).toISOString() : null);
        }
    }, [location.state]);

    useEffect(() => {
        if (grossWage) {
            handleCalculateNetWage();
        }
    }, [grossWage, handleCalculateNetWage]);

    const handleEstimatedTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && (value === '' || parseInt(value, 10) <= 30)) {
            setEstimatedTime(value);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, setName: React.Dispatch<React.SetStateAction<string>>) => {
        const value = e.target.value;
        if (/^[a-zA-ZığüşöçİĞÜŞÖÇ ]*$/.test(value)) {
            setName(value);
        }
    };

    const handleGrossWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setGrossWage(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const currentDateTime = new Date().toISOString();

        let existingHakedis: { createDate?: string; creater?: string } | null = null;
        if (id) {
            const response = await axios.get(`http://localhost:5025/api/hakedis/${id}`);
            existingHakedis = response.data;
        }

        const newHakedis = {
            id: id ? parseInt(id) : 0,
            firstName,
            lastName,
            estimatedTime: estimatedTime ? parseInt(estimatedTime) : null,
            grossWage: grossWage ? parseFloat(grossWage) : null,
            netWage,
            createDate: existingHakedis?.createDate || createDate || currentDateTime, // Oluşturma tarihi değişmeden kalır
            creater: existingHakedis?.creater || username, // Oluşturan kişi değişmeden kalır, yeni veri ekleniyorsa mevcut kullanıcı adı kullanılır
            updater: username, // Güncelleyen kişi kullanıcı adı belirtilir
            updateDate: currentDateTime,
            cId: cId ? parseInt(cId.toString()) : null
        };

        try {
            if (id) {
                await axios.put(`http://localhost:5025/api/hakedis/${id}`, newHakedis);
            } else {
                await axios.post('http://localhost:5025/api/hakedis', newHakedis);
            }
            navigate('/hakedis-listesi');
        } catch (error) {
            console.error('There was an error saving the hakedis!', error);
            if (axios.isAxiosError(error)) {
                console.error('Error data:', error.response?.data); // Backend'den gelen hata mesajı
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };

    const handleBack = () => {
        navigate('/hakedis-listesi');
    };

    return (
        <div>
            <SideMenu />
            <div className="container">
                <h2>Hakediş Tanım / Güncelleme</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Şirket</label>
                        <select value={cId} onChange={(e) => setCId(e.target.value)}>
                            <option value="">Seçiniz</option>
                            <option value="2007">Erdemir</option>
                            <option value="2">Oyak</option>
                            <option value="3">İndisol</option>
                            <option value="2008">Mais</option>
                            <option value="2009">Tamek</option>
                        </select>
                    </div>
                    <div>
                        <label>Çalışan Adı</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => handleNameChange(e, setFirstName)}
                        />
                    </div>
                    <div>
                        <label>Çalışan Soyadı</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => handleNameChange(e, setLastName)}
                        />
                    </div>
                    <div>
                        <label>Çalışan Tam Adı</label>
                        <input
                            type="text"
                            value={`${firstName} ${lastName}`}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Süre</label>
                        <input
                            type="text"
                            value={estimatedTime}
                            onChange={handleEstimatedTimeChange}
                        />
                    </div>
                    <div>
                        <label>Brüt Ücret</label>
                        <input
                            type="text"
                            value={grossWage}
                            onChange={handleGrossWageChange}
                        />
                    </div>
                    <div>
                        <label>Net Ücret</label>
                        <input
                            type="text"
                            value={netWage.toFixed(2)}
                            readOnly
                        />
                    </div>
                    <div className="buttons-container">
                        <button type="submit">Kaydet</button>
                        <button type="button" onClick={handleBack}>Geri</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HakedisTanim;
