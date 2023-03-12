using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CleanBrightCompany.Data;
using CleanBrightCompany.Models;

namespace CleanBrightCompany.Controllers
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

        [HttpGet("getgoals")]
        public ActionResult<Goals> GetGoalsHistory()
        {
            return Ok(_context.Goals.ToList());
        }

        [HttpGet("getgoal/{id}")]
        public ActionResult<Goals> GetCurrentGoal(int id)
        {
            var goal = _context.Goals.Find(id);

            if (goal == null)
            {
                return NotFound();
            }

            return Ok(goal);
        }

        [HttpGet("checkid/{id}")]
        public ActionResult<Goals> checkIfIdExist(int id)
        {
            var goal = _context.Goals.Find(id);

            if (goal != null)
            {
                return Ok(true);
            }

            return Ok(false);
        }

        [HttpPost("creategoal")]
        public ActionResult<IEnumerable<Goals>> CreateGoal([FromBody] Goals goal)
        {
            goal.startDate = goal.startDate.Date;
            _context.Goals.Add(goal);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetCurrentGoal), new { id = goal.goalID }, goal);
        }

        [HttpPost("progressgoal/{id}")]
        public ActionResult<Goals> CalculateGoalProgress(int id)
        {
            var goal = _context.Goals.Find(id);
            var goalProgress = goal.cumulativeCF / goal.targetCF * 100;

            return Ok(goalProgress);
        }

        [HttpPut("updategoal/{id}")]
        public IActionResult UpdateGoal([FromRoute] int id, [FromBody] Goals goal)
        {
            if (id != goal.goalID)
            {
                return BadRequest();
            }

            _context.Entry(goal).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(goal);
        }

        [HttpDelete("deletegoal/{id}")]
        public IActionResult DeleteGoal([FromRoute] int id)
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
