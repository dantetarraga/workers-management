CREATE PROCEDURE sp_DeleteWorker
    @Id INT
AS
BEGIN
    DELETE FROM Trabajador 
    WHERE Id = @Id
END
GO