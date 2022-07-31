 # __Reto final desarrollo web__
## -Proyecto #2. -
<br>

## Datos de Presentación

- Fecha: `31 de julio del 2022`
- Integrantes: `Camilo Morales Sánchez - Camilo Castañeda`

## Objetivos del Proyecto

- Crear un aplicativo fullstack tipo trello, con java y javascript vanilla.
 ## Frontend
- Se tarbaja el frontend con el patrón MVC y la Programacion Orientada a Objetos.
- SPA (Single Page Application), la vista se trabajó bajo lo que se conoce como “HTML Templates” para armar los diferentes “componetes.
- Manejar el control de versiones.
- Aplicar mejores prácticas y metodología de Ingeniería de Software

## Backend
- Se trabaja con Spring Framework.
- Base de datos relacional MYSQL.



## Características de Arquitectura

- Manejo de componentes
- Modularizacion del código

## __Base de datos__ (Diagrama Entidad-Relación)

<br>
<p align="center">
  <img  src="resources\db\my-krello.png" />
  
</p>

__IMPORTANTE:__ 

1. Es necesario contar mínimamente con la última versión estable de Java 1.8 y maven. Asegurarse de contar con ella para poder instalar correctamente las dependencias necesarias para correr el proyecto.


2. Se debe crear la base de datos en cualquier motor de Base de Datos relacional - el script de la Base de Datos se encuentra en __resources\db\my-krello.sql__


3. En la carpeta `src\main\resources` crear un archivo llamado: `application.properties` que tenga las siguientes variables necesarias para la conexión a la base de datos :<br>

- Ejemplo:

```

server.port=8080
# -------------------- Configuraci�n de conexi�n a MySQL --------------------


# Configuraci�n para MySQL 8
spring.datasource.url=jdbc:mysql://localhost:3306/krello?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrival=true

# Usuario de base de datos
spring.datasource.username=root

# Contrase�a para el usuario de la base de datos
spring.datasource.password=12345

# Clase a usar para conectar con la base de datos
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Dialecto a usar de SQL, en este caso MySQL8
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect

# -------------------- Mostrar en consola el SQL que se est� ejecutando --------------------

# Formatear salida del SQL en consola
spring.jpa.properties.hibernate.format_sql=true

# Hacer que se muestre en consola el SQL ejecutado
logging.level.org.hibernate.SQL=DEBUG

# Hacer que se muestre en consola los valores que se inyectan a la sentencia SQL
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE

```
- En la siguiente direccion hay un archivo que se debe importar en el postman para evidenciar todos los endpoints del aplicativo:

__resources\RETO TECNICO-TRELLO.postman_collection.json__

