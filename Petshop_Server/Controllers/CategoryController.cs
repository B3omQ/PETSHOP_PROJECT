using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Petshop_Server.Services.Category;

namespace Petshop_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var response = await _service.getAllCategoriesAsync();
            return Ok(response);
        }
    }
}
