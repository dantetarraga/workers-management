using Microsoft.AspNetCore.Mvc;
using WorkersManagementApi.DTOs;
using WorkersManagementApi.Services;

namespace WorkersManagementApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkersController(WorkerService workerService) : ControllerBase
{
    private readonly WorkerService _workerService = workerService;

    [HttpGet]
    public async Task<ActionResult<object>> GetWorkers([FromQuery] string? sexo = null)
    {
        var workers = await _workerService.GetAllWorkers(sexo);
        return Ok(new
        {
            success = true,
            data = workers,
            message = workers.Count > 0 ? "Trabajadores obtenidos exitosamente" : "No se encontraron trabajadores"
        });
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<object>> GetWorkerById(int id)
    {
        var worker = await _workerService.GetWorkerById(id);

        if (worker == null)
        {
            return NotFound(new
            {
                success = false,
                data = (object?)null,
                message = $"No se encontró el trabajador"
            });
        }

        return Ok(new
        {
            success = true,
            data = worker,
            message = "Trabajador obtenido exitosamente"
        });
    }

    [HttpPost]
    public async Task<ActionResult<object>> CreateWorker([FromBody] CreateWorkerDto createWorkerDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                success = false,
                data = ModelState,
                message = "Datos de entrada inválidos"
            });
        }

        var workerData = await _workerService.CreateWorker(createWorkerDto);

        return CreatedAtAction(
            nameof(GetWorkerById),
            new { id = workerData.Id },
            new
            {
                success = true,
                data = workerData,
                message = "Trabajador creado exitosamente"
            }
        );
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<object>> UpdateWorker(int id, [FromBody] UpdateWorkerDto updateWorkerDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new
            {
                success = false,
                data = ModelState,
                message = "Datos de entrada inválidos"
            });
        }

        if (id != updateWorkerDto.Id)
        {
            return BadRequest(new
            {
                success = false,
                data = (object?)null,
                message = "El ID de la URL no coincide con el ID del cuerpo de la petición"
            });
        }

        var updatedWorker = await _workerService.UpdateWorker(updateWorkerDto);
        return Ok(new
        {
            success = true,
            data = updatedWorker,
            message = "Trabajador actualizado exitosamente"
        });
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<object>> DeleteWorker(int id)
    {
        await _workerService.DeleteWorkerAsync(id);
        return Ok(new
        {
            success = true,
            message = "Trabajador eliminado exitosamente"
        });
    }
}
