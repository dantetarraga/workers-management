namespace WorkersManagementApi.DTOs;

public class WorkerDto
{
    public int Id { get; set; }
public string Nombres { get; set; } = string.Empty;
    public string Apellidos { get; set; } = string.Empty;
 public string TipoDocumento { get; set; } = string.Empty;
    public string NumeroDocumento { get; set; } = string.Empty;
    public string Sexo { get; set; } = string.Empty;
    public DateTime FechaNacimiento { get; set; }
    public string? Foto { get; set; }
    public string? Direccion { get; set; }
    public string NombreCompleto => $"{Nombres} {Apellidos}";
    public int Edad => DateTime.Now.Year - FechaNacimiento.Year - 
     (DateTime.Now.DayOfYear < FechaNacimiento.DayOfYear ? 1 : 0);
}

public class CreateWorkerDto
{
    public string Nombres { get; set; } = string.Empty;
    public string Apellidos { get; set; } = string.Empty;
    public string TipoDocumento { get; set; } = string.Empty;
    public string NumeroDocumento { get; set; } = string.Empty;
 public string Sexo { get; set; } = string.Empty;
    public DateTime FechaNacimiento { get; set; }
    public string? Foto { get; set; }
  public string? Direccion { get; set; }
}

public class UpdateWorkerDto
{
    public int Id { get; set; }
    public string Nombres { get; set; } = string.Empty;
  public string Apellidos { get; set; } = string.Empty;
    public string TipoDocumento { get; set; } = string.Empty;
    public string NumeroDocumento { get; set; } = string.Empty;
    public string Sexo { get; set; } = string.Empty;
    public DateTime FechaNacimiento { get; set; }
    public string? Foto { get; set; }
    public string? Direccion { get; set; }
}