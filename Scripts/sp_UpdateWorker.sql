CREATE PROCEDURE sp_UpdateWorker
    @Id INT,
    @Nombres NVARCHAR(100),
    @Apellidos NVARCHAR(100),
    @TipoDocumento NVARCHAR(20),
    @NumeroDocumento NVARCHAR(20),
    @Sexo NVARCHAR(10),
    @FechaNacimiento DATETIME,
    @Foto NVARCHAR(500) = NULL,
    @Direccion NVARCHAR(200) = NULL
AS
BEGIN
    UPDATE Trabajador 
    SET 
        Nombres = @Nombres,
        Apellidos = @Apellidos,
        TipoDocumento = @TipoDocumento,
        NumeroDocumento = @NumeroDocumento,
        Sexo = @Sexo,
        FechaNacimiento = @FechaNacimiento,
        Foto = @Foto,
        Direccion = @Direccion,
        FechaModificacion = GETDATE()
    WHERE Id = @Id
END
GO