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
    public class HakedisController : ControllerBase
    {
        private readonly HakedisContext _context;

        public HakedisController(HakedisContext context)
        {
            _context = context;
        }

        // GET: api/Hakedis
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hakedis>>> GetHakedis()
        {
            var hakedisList = await _context.Hakedis.ToListAsync();

            return hakedisList;
        }

        // GET: api/Hakedis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hakedis>> GetHakedis(int id)
        {
            var hakedis = await _context.Hakedis.FindAsync(id);

            if (hakedis == null)
            {
                return NotFound();
            }

            return hakedis;
        }

        // PUT: api/Hakedis/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHakedis(int id, Hakedis hakedis)
        {
            if (id != hakedis.Id)
            {
                return BadRequest();
            }

            hakedis.UpdateDate = DateTimeOffset.UtcNow;

            _context.Entry(hakedis).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HakedisExists(id))
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

        // POST: api/Hakedis
        [HttpPost]
        public async Task<ActionResult<Hakedis>> PostHakedis(Hakedis hakedis)
        {
            hakedis.CreateDate = DateTimeOffset.UtcNow; // Oluşturma tarihi UTC olarak kaydediliyor
            hakedis.UpdateDate = DateTimeOffset.UtcNow; // Güncelleme tarihi de başlangıçta aynı şekilde ayarlanıyor

            _context.Hakedis.Add(hakedis);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHakedis", new { id = hakedis.Id }, hakedis);
        }

        // DELETE: api/Hakedis/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHakedis(int id)
        {
            var hakedis = await _context.Hakedis.FindAsync(id);
            if (hakedis == null)
            {
                return NotFound();
            }

            _context.Hakedis.Remove(hakedis);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HakedisExists(int id)
        {
            return _context.Hakedis.Any(e => e.Id == id);
        }
    }
}
