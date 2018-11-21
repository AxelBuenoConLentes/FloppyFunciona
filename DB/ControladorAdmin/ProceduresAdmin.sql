USE Floppy

DELIMITER $$
DROP PROCEDURE IF EXISTS InsertIdVig$$
DROP PROCEDURE IF EXISTS ConsultarVigyFrac$$
DROP PROCEDURE IF EXISTS TransaFrac$$
DROP PROCEDURE IF EXISTS TransaUser$$
DROP PROCEDURE IF EXISTS ConsultarVig$$
DROP FUNCTION IF EXISTS ModifiVig$$

CREATE PROCEDURE ConsultarVig(IN Correo VARCHAR(100))
    BEGIN
		SELECT *FROM VIGILANTE WHERE cor_vig = Correo;
    END$$
CREATE PROCEDURE InsertIdVig()
    BEGIN
		UPDATE FRACCIONAMIENTO INNER JOIN VIGILANTE ON (VIGILANTE.dir_vig = FRACCIONAMIENTO.dir_fra) SET FRACCIONAMIENTO.id_vig = VIGILANTE.id_vig WHERE dir_fra = VIGILANTE.dir_vig;
    END$$
CREATE PROCEDURE ConsultarVigyFrac()
    BEGIN
		SELECT VIGILANTE.nom_vig, FRACCIONAMIENTO.dir_fra FROM (FRACCIONAMIENTO INNER JOIN VIGILANTE ON (VIGILANTE.dir_vig = FRACCIONAMIENTO.dir_fra));
    END$$
CREATE PROCEDURE TransaFrac(IN Direccion VARCHAR(100), Capacidad INT, Clave TEXT, Nombre VARCHAR(100), Password VARCHAR(100), Correo VARCHAR(100),Telefono INT) 
	BEGIN
		START TRANSACTION;
			INSERT INTO FRACCIONAMIENTO(dir_fra,cap_fra,cla_fra) VALUES(Direccion, Capacidad, Clave);
			INSERT INTO VIGILANTE(nom_vig,pas_vig,cor_vig,dir_vig,tel_vig) VALUES (Nombre,Password,Correo,Direccion,Telefono);
			UPDATE FRACCIONAMIENTO INNER JOIN VIGILANTE ON (VIGILANTE.dir_vig = FRACCIONAMIENTO.dir_fra) SET FRACCIONAMIENTO.id_vig = VIGILANTE.id_vig WHERE dir_fra = VIGILANTE.dir_vig;	
		COMMIT;
	END$$
CREATE PROCEDURE TransaUser(IN Nombre VARCHAR(100), Correo VARCHAR(100),Password TEXT, Letras VARCHAR(100), Fraccionamiento INT, Marca VARCHAR(100)) 
	BEGIN
		START TRANSACTION;
			INSERT INTO HABITANTE(nom_usu, cor_usu ,pas_usu, let_hab, id_fra) VALUES(Nombre, Correo, Password, Letras, Fraccionamiento);
			INSERT INTO CAR(let_car,mar_car) VALUES (Letras, Marca);
			UPDATE HABITANTE INNER JOIN CAR ON (HABITANTE.let_hab = CAR.let_car) SET HABITANTE.id_car = CAR.id_car WHERE HABITANTE.let_hab = CAR.let_car;	
		COMMIT;
	END$$