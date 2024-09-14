namespace HakedisAPI.Models
{
    public class KullaniciRol
    {
        public int Id { get; set; }

        public int KullaniciId { get; set; }
        public Kullanici Kullanici { get; set; }

        public int RolId { get; set; }
        public Rol Rol { get; set; }
    }
}
