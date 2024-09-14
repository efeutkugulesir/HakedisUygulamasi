using Microsoft.AspNetCore.Mvc;
using HakedisAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly HakedisContext _context;

    public AuthController(HakedisContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
    {
        var user = await _context.Kullanicis
            .Include(u => u.KullaniciRols)
            .ThenInclude(kr => kr.Rol)
            .FirstOrDefaultAsync(u => u.Username == loginModel.Username && u.Password == loginModel.Password);
        
        if (user != null)
        {
            // Kullanıcının ilk rolünü alıyoruz (Eğer birden fazla rol varsa bunu uyarlayabilirsiniz)
            var userRole = user.KullaniciRols.FirstOrDefault()?.Rol?.RolAdi;

            return Ok(new { success = true, role = userRole });
        }
        else
        {
            return Unauthorized(new { success = false, message = "Kullanıcı adı veya şifre hatalı" });
        }
    }
}

public class LoginModel
{
    public string Username { get; set; }
    public string Password { get; set; }
}
