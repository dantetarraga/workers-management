CREATE PROCEDURE sp_GetWorkers
@Sexo NVARCHAR(10) = NULL
AS
BEGIN
    SELECT 
        Id,
        Nombres,
        Apellidos,
        TipoDocumento,
        NumeroDocumento,
        Sexo,
        FechaNacimiento,
        Foto,
        Direccion
    FROM Trabajador
    WHERE (@Sexo IS NULL OR Sexo = @Sexo)
    ORDER BY Apellidos, Nombres
END
GO