namespace HakedisAPI.Models
{
    public class Kullanici
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; }  
        
        // KullaniciRol ile ilişkisi
        public ICollection<KullaniciRol> KullaniciRols { get; set; } = new List<KullaniciRol>();
    }
}
