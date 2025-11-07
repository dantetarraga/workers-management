CREATE PROCEDURE sp_GetWorkerById
    @Id INT
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
    WHERE Id = @Id
END
GO