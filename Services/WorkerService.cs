using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WorkersManagementApi.Data;
using WorkersManagementApi.DTOs;

namespace WorkersManagementApi.Services;

public class WorkerService(ApplicationDbContext context)
{
    private readonly ApplicationDbContext _context = context;

    public async Task<List<WorkerDto>> GetAllWorkers(string? sexoFilter = null)
    {
        var sexoParam = new SqlParameter("@Sexo", (object?)sexoFilter ?? DBNull.Value);

        var workers = await _context.Database.SqlQueryRaw<WorkerDto>("EXEC sp_GetWorkers @Sexo", sexoParam).ToListAsync();

        return workers;
    }

    public async Task<WorkerDto?> GetWorkerById(int id)
    {
        var idParam = new SqlParameter("@Id", id);

        var workers = await _context.Database
            .SqlQueryRaw<WorkerDto>("EXEC sp_GetWorkerById @Id", idParam)
            .ToListAsync();

        return workers.FirstOrDefault();
    }

    public async Task<WorkerDto> CreateWorker(CreateWorkerDto worker)
    {
        var existingWorker = await _context.Trabajadores
            .FirstOrDefaultAsync(w => w.NumeroDocumento == worker.NumeroDocumento);

        if (existingWorker != null)
        {
            throw new InvalidOperationException($"Ya existe un trabajador con el documento {worker.NumeroDocumento}");
        }

        var edad = DateTime.Now.Year - worker.FechaNacimiento.Year;
        if (edad < 18)
        {
            throw new InvalidOperationException("El trabajador debe ser mayor de 18 años");
        }

        var parameters = new[]
        {
            new SqlParameter("@Nombres", worker.Nombres),
            new SqlParameter("@Apellidos", worker.Apellidos),
            new SqlParameter("@TipoDocumento", worker.TipoDocumento),
            new SqlParameter("@NumeroDocumento", worker.NumeroDocumento),
            new SqlParameter("@Sexo", worker.Sexo),
            new SqlParameter("@FechaNacimiento", worker.FechaNacimiento),
            new SqlParameter("@Foto", (object?)worker.Foto ?? DBNull.Value),
            new SqlParameter("@Direccion", (object?)worker.Direccion ?? DBNull.Value),
            new SqlParameter("@Id", System.Data.SqlDbType.Int) { Direction = System.Data.ParameterDirection.Output }
        };

        await _context.Database.ExecuteSqlRawAsync(
            "EXEC sp_CreateWorker @Nombres, @Apellidos, @TipoDocumento, @NumeroDocumento, @Sexo, @FechaNacimiento, @Foto, @Direccion, @Id OUTPUT",
            parameters);

        var createdId = (int)parameters[8].Value;

        var createdWorker = await GetWorkerById(createdId);
        return createdWorker ?? throw new InvalidOperationException("Error retrieving the created worker");
    }

    public async Task<WorkerDto> UpdateWorker(int id)
    {
        var worker = await _context.Trabajadores.FindAsync(id);

        if (worker == null)
        {
            throw new InvalidOperationException($"No se encontró el trabajador con ID {id}");
        }

        var duplicateDoc = await _context.Trabajadores
          .FirstOrDefaultAsync(w => w.NumeroDocumento == worker.NumeroDocumento && w.Id != id);

        if (duplicateDoc != null)
        {
            throw new InvalidOperationException($"Ya existe otro trabajador con el documento {worker.NumeroDocumento}");
        }

        var edad = DateTime.Now.Year - worker.FechaNacimiento.Year;
        if (edad < 18)
        {
            throw new InvalidOperationException("El trabajador debe ser mayor de 18 años");
        }

        var parameters = new[]
        {
            new SqlParameter("@Id", worker.Id),
            new SqlParameter("@Nombres", worker.Nombres),
            new SqlParameter("@Apellidos", worker.Apellidos),
            new SqlParameter("@TipoDocumento", worker.TipoDocumento),
            new SqlParameter("@NumeroDocumento", worker.NumeroDocumento),
            new SqlParameter("@Sexo", worker.Sexo),
            new SqlParameter("@FechaNacimiento", worker.FechaNacimiento),
            new SqlParameter("@Foto", (object?)worker.Foto ?? DBNull.Value),
            new SqlParameter("@Direccion", (object?)worker.Direccion ?? DBNull.Value)
        };

        var result = await _context.Database.ExecuteSqlRawAsync(
            "EXEC sp_UpdateWorker @Id, @Nombres, @Apellidos, @TipoDocumento, @NumeroDocumento, @Sexo, @FechaNacimiento, @Foto, @Direccion",
            parameters
         );

        if (result <= 0)
        {
            throw new InvalidOperationException("No se pudo actualizar el trabajador");
        }

        var updatedWorker = await GetWorkerById(worker.Id);
        return updatedWorker ?? throw new InvalidOperationException("Error retrieving the updated worker");
    }

    public async Task DeleteWorkerAsync(int id)
    {
        var worker = await _context.Trabajadores.FindAsync(id);
        if (worker == null)
        {
            throw new InvalidOperationException($"No se encontró el trabajador con ID {id}");
        }

        var idParam = new SqlParameter("@Id", id);

        var result = await _context.Database.ExecuteSqlRawAsync(
            "EXEC sp_DeleteWorker @Id",
            idParam);

        if (result <= 0)
        {
            throw new InvalidOperationException("No se pudo eliminar el trabajador");
        }
    }
}
