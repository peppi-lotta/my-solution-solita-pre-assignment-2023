# my-solution-solita-pre-assignment-2023

Working based on this assignment:
https://github.com/solita/dev-academy-2023-exercise

This is a Next JS project that uses a local mySQL database. The data was cleaned up with Python code that out puts a csv file. Instruction on how to use the file is provided in this read me. 

## Versions
- Node: 16.15.0
- NextJS: 8.5.5
- mySQL: 8.0.31

## Imports 
This are what I imported to my project
npm i dotenv
npm i sass
npm instal mysql2
npm i net -S
npm i @types/react
npm install  @types/leaflet
npm install react-leaflet

## Database
I used a local mySQL database to store the data. I stored the login info to .env file. (My login information was in the wrong place in my initial commit so my mySQL password can be found. Not to worry I have since changed it.) The port used is the default 3306 port. 

This is what shoud be inderted into .env file
HOST = {hostname}
USER = '{usernamme}
PASSWORD = {password}
DATABASE = 'solita_pre_assignmentdb'
BASE_URL = 'http://localhost:3000/'


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

