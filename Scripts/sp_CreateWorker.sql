CREATE PROCEDURE sp_CreateWorker
    @Nombres NVARCHAR(100),
    @Apellidos NVARCHAR(100),
    @TipoDocumento NVARCHAR(20),
    @NumeroDocumento NVARCHAR(20),
    @Sexo NVARCHAR(10),
    @FechaNacimiento DATETIME,
    @Foto NVARCHAR(500) = NULL,
    @Direccion NVARCHAR(200) = NULL,
    @Id INT OUTPUT
AS
BEGIN
    INSERT INTO Trabajador (
        Nombres, 
        Apellidos, 
        TipoDocumento, 
        NumeroDocumento, 
        Sexo, 
        FechaNacimiento, 
        Foto, 
        Direccion,
        FechaCreacion
    )
    VALUES (
        @Nombres, 
        @Apellidos, 
        @TipoDocumento, 
        @NumeroDocumento, 
        @Sexo, 
        @FechaNacimiento, 
        @Foto, 
        @Direccion,
        GETDATE()
    )
    SET @Id = SCOPE_IDENTITY()
END
GO