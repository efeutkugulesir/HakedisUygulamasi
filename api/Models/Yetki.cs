namespace HakedisAPI.Models
{
    public class Yetki
    {
        public int Id { get; set; }
        public int KullaniciId { get; set; }
        public int RolId { get; set; }

        public Kullanici Kullanici { get; set; }  // Bu yetki ile ilişkili kullanıcı
        public Rol Rol { get; set; }  // Bu yetki ile ilişkili rol
    }
}
