# -*- coding: utf-8 -*-
import MySQLdb

# Establecemos la conexión con la base de datos
bd = MySQLdb.connect("localhost","root","n0m3l0s3","core_latatuadora" )

# Preparamos el cursor que nos va a ayudar a realizar las operaciones con la base de datos
cursor = bd.cursor()
status = ["flash", "leads", "studio membership", "freelancer membership"]
cont = 0
for x in bodyparts:
	# Preparamos el query SQL para insertar un registro en la BD
	sql = "INSERT INTO itemtype (itemtype) VALUES ('"+x+"')"
	try:
	   # Ejecutamos el comando
	   cursor.execute(sql)
	   # Efectuamos los cambios en la base de datos
	   bd.commit()
	   cont=cont+1
	except:
	   # Si se genero algún error revertamos la operación
	   bd.rollback()
print(cont)
# Nos desconectamos de la base de datos
bd.close()