# my-solution-solita-pre-assignment-2023
my-solution-solita-pre-assignment-2023

# my-solution-solita-pre-assignment-2023

Working based on this assignment:
https://github.com/solita/dev-academy-2023-exercise

## imports 
npm i sass

## data
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
