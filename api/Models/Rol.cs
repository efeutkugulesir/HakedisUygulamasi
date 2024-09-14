namespace HakedisAPI.Models
{
    public class Rol
    {
        public int Id { get; set; }
        public string RolAdi { get; set; }
        public string RolKodu { get; set; }
        public string Aciklama { get; set; }
        public string Olusturan { get; set; }
        public DateTimeOffset? OlusturmaTarihi { get; set; }
        public string? Guncelleyen { get; set; }
        public DateTimeOffset? GuncellemeTarihi { get; set; }

        // KullaniciRol ile ilişkisi
        public ICollection<KullaniciRol> KullaniciRols { get; set; }  // KullaniciRol ile olan many-to-many ilişkiyi belirtir

    }
}
