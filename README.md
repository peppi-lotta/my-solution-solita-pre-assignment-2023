# my-solution-solita-pre-assignment-2023

Working based on this assignment:
https://github.com/solita/dev-academy-2023-exercise

This is a Next JS project that uses a local mySQL database. The data was cleaned up with Python code that out puts a csv file. Instruction on how to use the file is provided in this read me. 

## Load Versions
- Node: 16.15.0
- NextJS: 8.5.5
- mySQL: 8.0.31

## Imports 
This are what I imported to my project
- npm i dotenv sass mysql2 @types/react @types/leaflet react-leaflet
- npm i net -S

## Database
I used a local mySQL database to store the data. I stored the login info to .env file. (My login information was in the wrong place in my initial commit so my mySQL password can be found. Not to worry I have since changed it.) The port used is the default 3306 port. 

NEXT_PUBLIC_HOST = {host}
NEXT_PUBLIC_USER = {username}
NEXT_PUBLIC_PASSWORD = {password}
NEXT_PUBLIC_DATABASE = {database_name}
NEXT_PUBLIC_BASE_URL = 'http://localhost:3000/'


Data folder has a zipped sql dump of my database. Import the data to server of your choosing, update the .env and run the code.

#### Create codes for tables
CREATE TABLE `stations` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`name_fi` VARCHAR(255) NOT NULL DEFAULT '""' COLLATE 'utf8mb4_0900_ai_ci',
	`name_sw` VARCHAR(255) NOT NULL DEFAULT '""' COLLATE 'utf8mb4_0900_ai_ci',
	`name_en` VARCHAR(255) NOT NULL DEFAULT '""' COLLATE 'utf8mb4_0900_ai_ci',
	`address_fi` VARCHAR(255) NOT NULL DEFAULT '""' COLLATE 'utf8mb4_0900_ai_ci',
	`address_sw` VARCHAR(255) NOT NULL DEFAULT '""' COLLATE 'utf8mb4_0900_ai_ci',
	`city_fi` VARCHAR(255) NOT NULL DEFAULT '""' COLLATE 'utf8mb4_0900_ai_ci',
	`city_sw` VARCHAR(255) NOT NULL DEFAULT '""' COLLATE 'utf8mb4_0900_ai_ci',
	`operator` VARCHAR(255) NOT NULL DEFAULT '""' COLLATE 'utf8mb4_0900_ai_ci',
	`capacity` INT(10) NOT NULL DEFAULT '0',
	`x_cord` DECIMAL(20,6) NOT NULL DEFAULT '0.000000',
	`y_cord` DECIMAL(20,6) NOT NULL DEFAULT '0.000000',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=903
;

CREATE TABLE `trips` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`start_time` DATETIME NOT NULL,
	`end_time` DATETIME NOT NULL,
	`start_location_id` INT(10) NOT NULL DEFAULT '0',
	`end_location_id` INT(10) NOT NULL DEFAULT '0',
	`duration` DECIMAL(20,6) UNSIGNED NOT NULL DEFAULT '0.000000',
	`distance` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `start_location_id` (`start_location_id`) USING BTREE,
	INDEX `end_location_id` (`end_location_id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=4442316
;


## Data folder
In the data folder there is a python file. It can be run and it will output a csv that is compatible with the database. 
It is not needed to run the web application, but can be used if new datasets need to be imported. The bikedata_to_csv.ipynb can be run on jupyternotebook for example. In the socond codeblock only the URLs need to be changed and the after runing the whole program it will output a csv file that can be inserted into a database. 

In this file we: 
- drop rows with less than 10meters of distance 
- drop rows with less than 10seconds duration
- change cloumn names to match the names in the database 
- drop columns with name information 

My prefered program is HeidiSQL and the photo below shows the settings needed for the importing of the csv. 
![image](https://user-images.githubusercontent.com/73192628/213224784-9f6a1b8e-5c12-4170-82f0-e4fb8723ec87.png)


## implemented features
### One station's view
- With map that show a marker on the spot where the station is 
- General info table with 
- table with trips that have started from the station (with pagination)
- tables with trips that have ended in this station (with pagination)

### All stations view
- paginated table of all the stations
- search field that searches all the visible columns for the written input 
- ordering by column (by pressing the column name)

I'm pretty proud of the pagination component. That is in my oppinion well done.

