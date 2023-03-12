using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CleanBrightCompany.Data;
using CleanBrightCompany.Models;

namespace MyGoalApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoalsController : ControllerBase
    {
        private readonly CleanBrightCompanyDBContext _context;

        public GoalsController(CleanBrightCompanyDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Goals>> GetGoals()
        {
            return Ok(_context.Goals.ToList());
        }

        [HttpGet("getgoal/{id}")]
        public ActionResult<Goals> GetGoal(int id)
        {
            var goal = _context.Goals.Find(id);

            if (goal == null)
            {
                return NotFound();
            }

            return goal;
        }

        [HttpPost("creategoal")]
        public ActionResult<IEnumerable<Goals>> CreateGoal([FromBody] Goals goal)
        {
            _context.Goals.Add(goal);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetGoal), new { id = goal.goalID }, goal);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateGoal(int id, Goals goal)
        {
            if (id != goal.goalID)
            {
                return BadRequest();
            }

            _context.Entry(goal).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGoal(int id)
        {
            var goal = _context.Goals.Find(id);

            if (goal == null)
            {
                return NotFound();
            }

            _context.Goals.Remove(goal);
            _context.SaveChanges();

            return NoContent();
        }
    }
}