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
    public class KullaniciRolController : ControllerBase
    {
        private readonly HakedisContext _context;

        public KullaniciRolController(HakedisContext context)
        {
            _context = context;
        }

        // GET: api/KullaniciRol
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetKullaniciRoller()
        {
            var kullaniciRoller = await _context.KullaniciRols
                .Include(kr => kr.Kullanici)
                .Include(kr => kr.Rol)
                .Select(kr => new
                {
                    kr.Id,
                    KullaniciAdi = kr.Kullanici.Username,
                    RolAdi = kr.Rol.RolAdi
                })
                .ToListAsync();

            return Ok(kullaniciRoller);
        }

        // GET: api/KullaniciRol/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetKullaniciRol(int id)
        {
            var kullaniciRol = await _context.KullaniciRols
                .Include(kr => kr.Kullanici)
                .Include(kr => kr.Rol)
                .Where(kr => kr.Id == id)
                .Select(kr => new
                {
                    kr.Id,
                    KullaniciAdi = kr.Kullanici.Username,
                    RolAdi = kr.Rol.RolAdi
                })
                .FirstOrDefaultAsync();

            if (kullaniciRol == null)
            {
                return NotFound();
            }

            return Ok(kullaniciRol);
        }

        // POST: api/KullaniciRol
        [HttpPost]
        public async Task<ActionResult<KullaniciRol>> PostKullaniciRol(KullaniciRolRequest kullaniciRol)
        {
            if (kullaniciRol.KullaniciId <= 0 || kullaniciRol.RolId <= 0)
            {
                return BadRequest("KullaniciId ve RolId geçerli bir değer olmalıdır.");
            }

            // Aynı KullaniciId ve RolId kombinasyonunun daha önce var olup olmadığını kontrol edin
            var existingKullaniciRol = await _context.KullaniciRols
                .FirstOrDefaultAsync(kr => kr.KullaniciId == kullaniciRol.KullaniciId && kr.RolId == kullaniciRol.RolId);

            if (existingKullaniciRol != null)
            {
                return Conflict("Bu kullanıcı için bu rol zaten atanmış.");
            }

            KullaniciRol kullaniciRolEntity = new KullaniciRol();
            kullaniciRolEntity.KullaniciId = kullaniciRol.KullaniciId;
            kullaniciRolEntity.RolId = kullaniciRol.RolId;

            _context.KullaniciRols.Add(kullaniciRolEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetKullaniciRol), new { id = kullaniciRolEntity.Id }, kullaniciRol);
        }

        // PUT: api/KullaniciRol/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKullaniciRol(int id, KullaniciRol kullaniciRol)
        {
            if (id != kullaniciRol.Id)
            {
                return BadRequest();
            }

            _context.Entry(kullaniciRol).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.KullaniciRols.Any(e => e.Id == id))
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

        // DELETE: api/KullaniciRol/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKullaniciRol(int id)
        {
            var kullaniciRol = await _context.KullaniciRols.FindAsync(id);
            if (kullaniciRol == null)
            {
                return NotFound();
            }

            _context.KullaniciRols.Remove(kullaniciRol);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class KullaniciRolRequest
    {
        public int KullaniciId{get;set;}
        public int RolId{get;set;}
    }
}
