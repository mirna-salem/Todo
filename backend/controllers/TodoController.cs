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
