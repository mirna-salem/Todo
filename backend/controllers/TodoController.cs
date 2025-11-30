using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.models;
using backend.data;

namespace backend.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoDbContext _context;

        public TodoController(TodoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> Get()
        {
            return await _context.TodoItems.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> Create(TodoItem item)
        {
            _context.TodoItems.Add(item);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] TodoItem updates)
        {
            var existingItem = await _context.TodoItems.FindAsync(id);
            
            if (existingItem == null) 
            {
                return NotFound();
            }

            // Update fields that are provided
            if (!string.IsNullOrEmpty(updates.Task)) 
            {
                existingItem.Task = updates.Task;
            }
            // Always update IsCompleted since bool can't be null
            existingItem.IsCompleted = updates.IsCompleted;

            await _context.SaveChangesAsync();
            return Ok(existingItem);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetById(int id)
        {
            var item = await _context.TodoItems.FindAsync(id);
            
            if (item == null) 
            {
                return NotFound();
            }

            return item;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.TodoItems.FindAsync(id);
            
            if (item == null) 
            {
                return NotFound();
            }

            _context.TodoItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
