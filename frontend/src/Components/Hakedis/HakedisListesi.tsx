import React from 'react';
import { Link } from 'react-router-dom';

const HakedisListesi: React.FC = () => {
    return (
        <div>
            <h2>Hakediş Listeleme</h2>
            <table>
                <thead>
                    <tr>
                        <th>Şirket</th>
                        <th>Çalışan Adı</th>
                        <th>Çalışan Soyadı</th>
                        <th>Süre</th>
                        <th>Brüt Ücret</th>
                        <th>Net Ücret</th>
                        <th>Oluşturan</th>
                        <th>Oluşturma Tarihi</th>
                        <th>Güncelleyen</th>
                        <th>Güncelleme Tarihi</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Hakediş verileri burada listelenecek */}
                </tbody>
            </table>
            <Link to="/hakediş-tanim">Yeni Hakediş</Link>
        </div>
    );
};

export default HakedisListesi;
