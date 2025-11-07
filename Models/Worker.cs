using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkersManagementApi.Models;

[Table("Trabajador")]
public class Worker
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nombres { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Apellidos { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string TipoDocumento { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string NumeroDocumento { get; set; } = string.Empty;

    [Required]
    [MaxLength(10)]
    public string Sexo { get; set; } = string.Empty; 

    [Required]
    public DateTime FechaNacimiento { get; set; }

    [MaxLength(500)]
    public string? Foto { get; set; }

    [MaxLength(200)]
    public string? Direccion { get; set; }

    public DateTime FechaCreacion { get; set; } = DateTime.Now;

    public DateTime? FechaModificacion { get; set; }
}