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
    public class RolController : ControllerBase
    {
        private readonly HakedisContext _context;

        public RolController(HakedisContext context)
        {
            _context = context;
        }

        // GET: api/Rol
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rol>>> GetRoles()
        {
            var roles = await _context.Roles.Include(r => r.KullaniciRols)
                                            .ThenInclude(kr => kr.Kullanici)
                                            .AsNoTracking()
                                            .Select(r => new 
                                            {
                                                r.Id,
                                                r.RolAdi,
                                                r.RolKodu,
                                                r.Aciklama,
                                                r.Olusturan,
                                                r.OlusturmaTarihi,
                                                r.Guncelleyen,
                                                r.GuncellemeTarihi,
                                                KullaniciAdi = r.KullaniciRols.FirstOrDefault().Kullanici.Username
                                            })
                                            .ToListAsync();

            return Ok(roles);
        }

        // GET: api/Rol/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rol>> GetRol(int id)
        {
            var rol = await _context.Roles.Include(r => r.KullaniciRols)
                                           .ThenInclude(kr => kr.Kullanici)
                                           .FirstOrDefaultAsync(r => r.Id == id);

            if (rol == null)
            {
                return NotFound();
            }

            return Ok(rol);
        }

        // POST: api/Rol
        [HttpPost]
        public async Task<ActionResult<Rol>> PostRol(Rol rol)
        {
            _context.Roles.Add(rol);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRol), new { id = rol.Id }, rol);
        }

        // PUT: api/Rol/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRol(int id, Rol rol)
        {
            if (id != rol.Id)
            {
                return BadRequest();
            }

            _context.Entry(rol).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolExists(id))
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

        // DELETE: api/Rol/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRol(int id)
        {
            var rol = await _context.Roles.Include(r => r.KullaniciRols)
                                           .FirstOrDefaultAsync(r => r.Id == id);
            if (rol == null)
            {
                return NotFound();
            }

            _context.Roles.Remove(rol);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RolExists(int id)
        {
            return _context.Roles.Any(e => e.Id == id);
        }
    }
}
