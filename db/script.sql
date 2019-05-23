CREATE DATABASE INVENTORY

CREATE TABLE CAREER 
(
	ID 		INT PRIMARY KEY NOT NULL,
	NAME	VARCHAR(255) NOT NULL
);

CREATE TABLE USERS
(
    RUT         INT PRIMARY KEY NOT NULL,
    NAME        VARCHAR(60) NOT NULL,
    LASTNAME    VARCHAR(60) NOT NULL,
    USERNAME    VARCHAR(255) NOT NULL,
	MAIL		VARCHAR(255) NOT NULL,
	TYPE		INT NOT NULL,    /* 1)estudiante 2)profesor 3)administrador*/
	STATUS		INT NOT NULL,	/*1)ACTIVO 0)INACTIVO*/
    CAREER      INT NOT NULL,	/*numero segun carrera*/
    PHONE       VARCHAR(12),
    ADDREES     VARCHAR(255) NOT NULL,
    PASS        VARCHAR(255) NOT NULL,
	FOREIGN KEY (CAREER) REFERENCES CAREER(ID)
);

CREATE TABLE PRODUCT
(
    ID              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    NAME            VARCHAR(255) NOT NULL,
    DESCRIPTION     VARCHAR(255) NOT NULL,
	STATUS			INT NOT NULL, /*1) ACTIVO 0)INACTIVO*/
    STOCK           INT NOT NULL,
    PRICE           INT NOT NULL,
    STORE          INT NOT NULL		/*1) bodega pf 2)bodega punto*/
);


CREATE TABLE MOVEMENT_HEADER
(
    ID          INT PRIMARY KEY AUTO_INCREMENT,
    DATE_BEGIN  DATE NOT NULL,
	DATE_END	DATE NULL,
	DAYS		INT NOT NULL,
    USER_M      INT NULL, 
	DEBT		INT NOT NULL,	
	DESCRIPTION VARCHAR(255),
	STATUS		INT NOT NULL,	/*0)prestado 1)devuelto*/
    FOREIGN KEY (USER_M) REFERENCES USERS(RUT)
);

CREATE TABLE MOVEMENT_BODY
(
    ID          INT PRIMARY KEY AUTO_INCREMENT,
    PRODUCT_M   INT NULL,
    HEADER      INT NOT NULL,
    FOREIGN KEY(PRODUCT_M) REFERENCES PRODUCT(ID),
    FOREIGN KEY (HEADER) REFERENCES MOVEMENT_HEADER(ID)
)

/*FUNCIONES*/

/*user*/
DELIMITER //
CREATE OR REPLACE FUNCTION FN_CREATE_USER
(
	RUT         INT,
    NAME        VARCHAR(60),
    LASTNAME    VARCHAR(60),
    USERNAME    VARCHAR(255),
	MAIL		VARCHAR(255),
    CAREER      INT,
    PHONE       VARCHAR(12),
    ADDRESS     VARCHAR(255),
    PASS        VARCHAR(255)
)
RETURNS INT
BEGIN
	DECLARE X INT;
	SET X = (SELECT COUNT(RUT) WHERE USERS.RUT = RUT AND USERS.USERNAME = LOWER(USERNAME));
	IF(X = 0) THEN
		INSERT INTO USERS values (RUT,NAME,LASTNAME,USERNAME,MAIL,1,1,CAREER,PHONE,ADDRESS,PASS);
		RETURN 1;
	ELSE
		RETURN 2;
	END IF;
END
//

DELIMITER //
CREATE OR REPLACE FUNCTION FN_UPDATE_USER
(
	RUT         INT,
    NAME        VARCHAR(60),
    LASTNAME    VARCHAR(60),
    USERNAME    VARCHAR(255),
	MAIL		VARCHAR(255),
    CAREER      INT,
    PHONE       VARCHAR(12),
    ADDREES     VARCHAR(255),
    PASS        VARCHAR(255)
)
RETURNS INT
BEGIN
	DECLARE X INT;
	SET X = (SELECT COUNT(RUT) WHERE USERS.RUT = RUT);
	IF X = 1 THEN
		UPDATE USERS SET 
		NAME  = NAME,
		LASTNAME = LASTNAME,
		USERNAME = USERNAME,
		CAREER = CAREER,
		PHONE = PHONE,
		ADDREES = ADDREES,
		MAIL = MAIL,
		PASS = PASS
		WHERE USERS.RUT = RUT;
		RETURN 1;
	ELSE
		RETURN 2;
	END IF;
end
//

DELIMITER //
CREATE OR REPLACE FUNCTION FN_UPDATE_STATUS_USER
(
	RUT		INT,
	STATUS 	INT
)
RETURNS INT 
BEGIN
	DECLARE X INT;
	SET X = (SELECT COUNT(RUT) FROM USERS WHERE USERS.RUT=RUT);
	IF(X=1) THEN
	
		UPDATE USERS SET USERS.STATUS = STATUS WHERE USERS.RUT= RUT;
		RETURN 1;
	ELSE
		RETURN 2;
	END IF;
END
//

DELIMITER //
CREATE OR REPLACE FUNCTION FN_UPDATE_PRIVILEGE_USER
(
	RUT         INT,
    TYPE		INT
)
RETURNS INT
BEGIN
    UPDATE USERS SET 
	USERS.TYPE = TYPE
	WHERE RUT = RUT;
    RETURN 1;
end
//

DELIMITER //
CREATE OR REPLACE FUNCTION FN_LOGIN
(
	UNSERNAME	VARCHAR(255),
	PASS		VARCHAR(255)
)
RETURNS 
BEGIN
	DECLARE X INT;
	SET X = (SELECT COUNT(RUT) FROM USERS WHERE USERS.USERNAME = LOWER(USERNAME) AND USERS.PASS = PASS);
	IF (X = 1) THEN
		RETURN (SELECT RUT FROM USERS WHERE USERS.USERNAME = LOWER(USERNAME) AND USERS.PASS = PASS);
	ELSE 
		RETURN 2;
	END IF;
END
//

 /*PRODUCT*/

DELIMITER //
CREATE OR REPLACE FUNCTION FN_CREATE_PRODUCT
(
	NAME            VARCHAR(255),
    DESCRIPTION     VARCHAR(255),
    STOCK           INT,
    PRICE           INT,
    STORE           INT
)
RETURNS INT
BEGIN
    INSERT INTO PRODUCT(NAME,DESCRIPTION,STOCK,PRICE,STORE) VALUES(NAME,DESCRIPTION,1,STOCK,PRICE,STORE);
    RETURN 1;
end
//

DELIMITER //
CREATE OR REPLACE FUNCTION FN_UPDATE_PRODUCT
(
	ID				INT,
	NAME            VARCHAR(255),
    DESCRIPTION     VARCHAR(255),
    STOCK           INT,
    PRICE           INT,
    STORE           INT
)
RETURNS INT
BEGIN
    DECLARE X INT;
	SET X = (SELECT COUNT(ID) FROM PRODUCT WHERE PRODUCT.ID = ID);
	IF X = 1 THEN
		UPDATE PRODUCT SET
		NAME = NAME,
		DESCRIPTION = DESCRIPTION,
		STOCK = STOCK,
		PRICE = PRICE,
		STORE = STORE
		WHERE PRODUCT.ID = ID;
		RETURN 1;
	ELSE 
		RETURN 2;
	END IF;
end
//

DELIMITER //
CREATE OR REPLACE FUNCTION FN_UPDATE_STATUS_PRODUCT
(
	ID		INT,
	STATUS	INT
)
RETURNS INT 
BEGIN
	DECLARE X INT;
	SET X = (SELECT COUNT(ID) FROM PRODUCT WHERE PRODUCTS.ID=ID);
	IF(X=1) THEN
	
		UPDATE PRODUCT SET PRODUCT.STATUS = STATUS WHERE ID = ID;
		RETURN 1;
	ELSE
		RETURN 2;
	END IF;
END
//

DELIMITER //
CREATE OR REPLACE FUNCTION FN_UPDATE_STOCK_PRODUCT
(
	ID        INT,
	STOCK	  INT
)
RETURNS INT
BEGIN
    UPDATE PRODUCT SET 
	STOCK = STOCK
	WHERE PRODUCT.ID = ID;
    RETURN 1;
END
//

/*MOVEMENT HEADER*/
DELIMITER //
CREATE OR REPLACE FUNCTION FN_CREATE_MOVEMENT_HEADER
(
	DATE_BEGIN	 	DATE,
	DATE_END		DATE,
	DESCRIPTION		VARCHAR(255),
	DAYS			INT,
    USER_M      	INT
)
RETURNS INT
BEGIN
    INSERT INTO MOVEMENT_HEADER(DATE_BEGIN,DATE_END,DAYS,USER_M,DESCRIPTION,STATUS,DEBT) VALUES(DATE_BEGIN,DATE_END,DAYS,USER_M,DESCRIPTION,0,0);
    RETURN 1;
END
//

DELIMITER //
CREATE OR REPLACE FUNCTION FN_CHANGE_STATUS_MOVEMENT_HEADER
(
	ID		INT,
	STATUS	INT
)
RETURNS INT
BEGIN
	UPDATE MOVEMENT_HEADER SET MOVEMENT_HEADER.STATUS = STATUS WHERE MOVEMENT_HEADER.ID = ID;
	RETURN 1;
END
//

/*MOVEMENT BODY*/

DELIMITER //
CREATE OR REPLACE FUNCTION FN_CREATE_MOVEMENT_BODY
(
	PRODUCT_M   INT,
    HEADER      INT
)
RETURNS INT
BEGIN
    INSERT INTO MOVEMENT_BODY(PRODUCT_M,HEADER) VALUES(PRODUCT_M,HEADER);
    RETURN 1;
END
//



DELIMITER //
CREATE OR REPLACE PROCEDURE SP_DEBTS()
BEGIN	
	UPDATE MOVEMENT_HEADER SET DEBT = DATEDIFF( ADDDATE(DATE_BEGIN, INTERVAL DAYS DAY),SYSDATE())*300  WHERE  ADDDATE(DATE_BEGIN, INTERVAL DAYS DAY) < SYSDATE();
END
//

/*INSERTS*/


/*carreras*/
INSERT INTO CAREER VALUES(1,'ingenieria informatica');
INSERT INTO CAREER VALUES(2,'ingenieria en administracio de recursos humanos');

/*usuario*/
INSERT INTO USERS VALUES(187329973,'jorge corvalan','corvalan mendez','higlord','higlord@gmail.com',3,1,1,'+56985067877','andes 3755 casa 25','123');

/*test*/
SELECT FN_CREATE_USER(18732998,'JORGE CORVALAN','corvalan mendez','higlord','higlord@gmail.com',1,'+569785067877','andes 3755 casa 25','1875');


/*productos*/
INSERT INTO PRODUCT VALUES ('pelota','es una pelota',1,10,30000,1);
INSERT INTO PRODUCT (name,DESCRIPTION,STATUS,STOCK,price,STORE) VALUES ('pelota2','es una pelota',1,10,30000,1);














