# Inducto

Welcome to the Inducto Web Application! This project consists of a [React](https://react.dev/) application, an [Express.js](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/).

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/package-manager) 

## Server Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/justOmmThings/inducto-web-app.git
   cd server

2. **Install Dependencies** using `npm install`
   
3. **Set Up MongoDB Atlas**<br>
   You can create a free tier MongoDB deployment on MongoDB Atlas to store and manage your data.

    - **Create a MongoDB Atlas Account**<br>
    Go to [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) and create a free account.
    
    - **Create a Cluster**<br>
    After creating your account, follow the instructions to create a new cluster. This will be your MongoDB database in the cloud.
    
    - **Get Your Connection String**<br>
    Once your cluster is created, click on "Connect", select "Connect your application", and copy the connection string.
    
    - **Configure MongoDB Connection**<br>
    Ensure your MongoDB connection string is correctly set up in the server code. Modify the **DB** variable in `server.js` with your connection string:
      ```javascript
      const DB = "mongodb+srv://<username>:<password>@<cluster-url>/hangman?retryWrites=true&w=majority";
      ```
4. Run `npm start` to start the server