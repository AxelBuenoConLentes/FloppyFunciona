USE Floppy;

DELIMITER $$
DROP PROCEDURE IF EXISTS ConsultarVig;


CREATE PROCEDURE ConsultarVig(IN Correo VARCHAR(100))
    BEGIN
		SELECT *FROM VIGILANTE WHERE cor_vig = Correo;
    END$$