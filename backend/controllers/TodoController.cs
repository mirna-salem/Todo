using Microsoft.AspNetCore.Mvc;
using backend.models;

namespace backend.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private static List<TodoItem> todos = new List<TodoItem>();
        private static int nextId = 1;

        [HttpGet]
        public IEnumerable<TodoItem> Get() => todos;

        [HttpPost]
        public ActionResult<TodoItem> Create(TodoItem item)
        {
            item.Id = nextId++;
            
            todos.Add(item);
            
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTodo(int id, [FromBody] TodoItem updates)
        {
            var existingItem = todos.FirstOrDefault(t => t.Id == id);

            Console.WriteLine(updates.IsCompleted);
            
            if (existingItem == null) 
            {
                return NotFound();
            }

            // Only update fields that are provided
            if (updates.IsCompleted != null)
            {
                existingItem.IsCompleted = updates.IsCompleted;
            } 
            if (!string.IsNullOrEmpty(updates.Task)) 
            {
                existingItem.Task = updates.Task;
            }

            return Ok(existingItem);
        }

        [HttpGet("{id}")]
        public ActionResult<TodoItem> GetById(int id)
        {
            var item = todos.FirstOrDefault(t => t.Id == id);
            
            if (item == null) 
            {
                return NotFound();
            }

            return item;
        }
    }
}
