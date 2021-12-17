# In order to test the app on your computer:
# Clone the repo on your computer


# CONNECT THE APP TO A MONGODB DATABASE
# Search for the .env.example file in /backend
# Rename the file to .env
# Connect to your existing MongoDB account OR create a MongoDB account and a new cluster (for free)
# On MongoDB, in the left panel, go to the Deployment section, then click on Database
# Click on Connect > Connect your application (next to the name of your cluster)
# Select Node.js as a driver & the Version "2.2.12 or later" (later version do not work for this project)
# Copy the connecting string
# In the .env file, paste the connection string as a string parameter after MONGODB_URI=
# Ex: MONGODB_URI=mongodb://<username>:<password>@cluster0-shard-00-00.qer09.mongodb.net:27017/<databaseName>?ssl=true&replicaSet=atlas-ergf89-shard-0&authSource=admin&retryWrites=true&w=majority

# Replace <username>, <password> and <databaseName> with your own credentials - they can be grabbed from DataBase Access or gotten after having created a new database users

# Save the .env file to use your own credentials to connect to your MongoDB Database



# START THE BACKEND API SERVER
# Open one terminal 
# Place yourself in the backend directory
# Type node server to start the server

# START FRONT END SERVER
# Open one terminal 
# Place yourself in the frontend directory
# Type npm start run to start the server
# visit localhost:4200 to begin testing the app

