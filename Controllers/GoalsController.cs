using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CleanBrightCompany.Data;
using CleanBrightCompany.Models;
using ICT2106_P1_4.Models.Goals;

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

        [HttpGet]
        public ActionResult<IEnumerable<Goals>> GetGoals()
        {
            IGoalsManagement goalManager = GoalsManagement.Instance;
            return Ok(goalManager.GetAllGoals());
        }

        [HttpGet("getgoal/{id}")]
        public ActionResult<Goals> GetGoal(int id)
        {
            IGoalsManagement goalManager = GoalsManagement.Instance;
            IGoals? goal = goalManager.GetGoalById(id);

            if (goal == null)
            {
                return NotFound();
            } else
            {
                return Ok();
            }
        }

        [HttpPost]
        [Route("goals/create")]
        public ActionResult<IEnumerable<Goals>> CreateGoal([FromBody] Goals goal)
        {
            IGoals newGoal = new GoalBuilder().CreateGoal()
                .BuildGoalStartingPoint(goal.cumulativeCF)
                .BuildGoalTarget(goal.targetCF)
                .BuildGoalDuration(goal.goalDuration)
                .BuildGoalDate(goal.startDate, goal.endDate)
                .GetGoal();

            IGoalsManagement goalManager = GoalsManagement.Instance;
            goalManager.AddGoal(newGoal);

            return Ok();
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
