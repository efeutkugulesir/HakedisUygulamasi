using Microsoft.AspNetCore.Mvc;
using HakedisAPI.Data;
using HakedisAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HakedisAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KullaniciController : ControllerBase
    {
        private readonly HakedisContext _context;

        public KullaniciController(HakedisContext context)
        {
            _context = context;
        }

        // GET: api/Kullanici
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kullanici>>> GetKullanicis()
        {
            var kullanicilar = await _context.Kullanicis
                .Include(k => k.KullaniciRols)
                .ThenInclude(kr => kr.Rol)
                .AsNoTracking()
                .Select(k => new 
                {
                    k.Id,
                    k.Username,
                    k.Email,
                    Rol = k.KullaniciRols.FirstOrDefault().Rol.RolAdi,
                    k.Password
                })
                .ToListAsync();

            return Ok(kullanicilar);
        }

        // GET: api/Kullanici/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Kullanici>> GetKullanici(int id)
        {
            var kullanici = await _context.Kullanicis
                .Include(k => k.KullaniciRols)
                .ThenInclude(kr => kr.Rol)
                .FirstOrDefaultAsync(k => k.Id == id);

            if (kullanici == null)
            {
                return NotFound();
            }

            return Ok(kullanici);
        }

        // PUT: api/Kullanici/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKullanici(int id, Kullanici kullanici)
        {
            if (id != kullanici.Id)
            {
                return BadRequest();
            }

            _context.Entry(kullanici).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KullaniciExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Kullanici
        [HttpPost]
        public async Task<ActionResult<Kullanici>> PostKullanici(Kullanici kullanici)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Yeni kullanıcı eklerken rastgele bir şifre oluştur
            kullanici.Password = GenerateRandomPassword(6);

            _context.Kullanicis.Add(kullanici);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKullanici", new { id = kullanici.Id }, kullanici);
        }

        // DELETE: api/Kullanici/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKullanici(int id)
        {
            var kullanici = await _context.Kullanicis
                .Include(k => k.KullaniciRols)
                .FirstOrDefaultAsync(k => k.Id == id);

            if (kullanici == null)
            {
                return NotFound();
            }

            _context.KullaniciRols.RemoveRange(kullanici.KullaniciRols);
            _context.Kullanicis.Remove(kullanici);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool KullaniciExists(int id)
        {
            return _context.Kullanicis.Any(e => e.Id == id);
        }

        private string GenerateRandomPassword(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
