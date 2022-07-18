# Deploying application

In this readme is all the information needed in order to deploy the application locally and on cloud (Heroku)

## Deploying locally
The application has a front-end and a back-end, for it to successfully run on a browser is important to have both sides running locally.

The back-end was created with Flask and to run it, is important to activate a virtual environment. This can be done by opening a terminal in the folder where the api.py file is located and run the command "source venv/bin/activate". Once this is done, in the left side of the line in the terminal will say "(venv)" (that stands for virtual environment). 
In order to run the back-end  it will be necessary to write the command "python3 api.py". 

Since de front-end was created with React, in order to run the front-end is neccesary to go to the location of the package.json file and open a terminal and run the command: npm install. Once the proyect is install, it can be run by using the command npm start in the same folder where the first command was ran.

## Deploying with Heroku

In order to deploy the application on cloud (Heroku) it was neccesary to make some changes in different files of the application.

In the back-end terminal, the command "pip install gunicorn" was ran. Then the dependecies where freeze in a file by  running the command: "pip freeze > requirements.txt"

Also, in the back-end, was neccesary to make the next changes in the api.py file:

### Changes in api.py

#### In the 1st line it was neccesary to  import send_from_directory from flask 

#### In the 3rd line it was neccesary to  import cross_origin from flask_cors
#### In the 11th line it was neccesary to  pass the static_folder to the app: "app = Flask(__name__, static_folder='front-end/build')"
#### In the .gitignore file of the front-end, "/build" was commmented ("#/build") because Heroku wouldn't be able to use the path if it was ignored. And in the folder where the package.json file is located the command "npm run buid" was ran.
#### for every @app.route in the line below was added the line: "@cross_origin()" so that there wouldn't be cors errors when passing the endpoints

#### Then, there was another method created called serve, which would be useful to get the front-end:
##### @app.route('/')
##### @cross_origin()
##### def serve():
#####    return send_from_directory(app.static_folder, 'index.html')

Once the api.py file was modified, in the same folder of this file, it was neccessary to create a file called Procfile to start deploying with Heroku.

### Content of file "Procfile":

#### web: gunicorn api:app

### Heroku

Then, is important to remove the .git file of the front-end (located in the front-end folder) to start deploying

The next step was to open a terminal at the api.py location, and ran the next commands to deploy in heroku:

#### heroku login
#### git init 
#### heroku create
#### git status
#### git add . 
#### git commit -m '1st commit'
#### git push heroku master

Once it deployed, it gave the url : "https://desolate-dusk-55026.herokuapp.com/"
So, in the package.json file, the proxy url was then set to "https://desolate-dusk-55026.herokuapp.com/" (instead of :"localhost:5000"). It was important to change this information when an endpoint was called since now that it has been deployed, 
the calls weren't made to a localhost

### Front-end

The changes made were:

In package.json :

#### line 5  "proxy": "https://desolate-dusk-55026.herokuapp.com/"

In graphic (from pages):

#### line 20    fetch('https://desolate-dusk-55026.herokuapp.com/api/create',{


In login (from pages):

#### line 18  fetch('https://desolate-dusk-55026.herokuapp.com/authenticate').then(response => {

After, making this changes in the folder where the package.json file is located the command "npm run buid" was ran in a terminal.
Then, this changes where uploaded to heroku, so in the root folder (where api.py is located) in a terminal were the following commands ran:

#### git status
#### git add . 
#### git commit -m 'front-end changes'
#### git push heroku master

And finally, the application link is: https://desolate-dusk-55026.herokuapp.com