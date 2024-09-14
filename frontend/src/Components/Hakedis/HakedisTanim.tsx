import React, { useState } from 'react';

const HakedisTanim: React.FC = () => {
    const [company, setCompany] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [duration, setDuration] = useState('');
    const [grossWage, setGrossWage] = useState('');
    const [netWage, setNetWage] = useState(0);

    const handleCalculateNetWage = () => {
        // Brüt Ücretten Net Ücret Hesaplama
        const net = parseFloat(grossWage) * 0.8; // Dummy hesaplama
        setNetWage(net);
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && parseInt(value, 10) <= 30) {
            setDuration(value);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, setName: React.Dispatch<React.SetStateAction<string>>) => {
        const value = e.target.value;
        if (/^[a-zA-Z]*$/.test(value)) {
            setName(value);
        }
    };

    return (
        <div>
            <h2>Hakediş Tanım/Güncelleme</h2>
            <form>
                <div>
                    <label>Şirket</label>
                    <select value={company} onChange={(e) => setCompany(e.target.value)}>
                        <option value="">Seçiniz</option>
                        {/* Şirketler listesi buraya eklenecek */}
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
                        value={duration} 
                        onChange={handleDurationChange} 
                    />
                </div>
                <div>
                    <label>Brüt Ücret</label>
                    <input 
                        type="text" 
                        value={grossWage} 
                        onChange={(e) => setGrossWage(e.target.value)} 
                    />
                    <button type="button" onClick={handleCalculateNetWage}>Hesapla</button>
                </div>
                <div>
                    <label>Net Ücret</label>
                    <input 
                        type="text" 
                        value={netWage.toString()} 
                        readOnly 
                    />
                </div>
            </form>
        </div>
    );
};

export default HakedisTanim;
