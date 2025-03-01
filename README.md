Dog Picture Management API: 
This API allows users to upload, delete, update, fetch, and list dog pictures. Authentication is handled using API keys.

Authentication: 
All endpoints require an API key for authentication. Clients must include the x-api-key header in their requests.

Base URL: http://localhost:8000/dogs


1. Upload Dog Pic API:

- curl --location 'http://localhost:8000/dogs/upload?compress=true' \
--header 'x-api-key: 1234567890abcdef' \
--form 'image=@"/Users/pramanik/Downloads/dog2.jpeg"'

- Endpoint: POST /upload
- Headers:  x-api-key: API key for authentication
- Query Parameters: compress: Set to true to enable image compression
- Request Body: Multipart/form-data : image (file): The image file to be uploaded. (required)



2. Delete a Dog Picture
- curl --location --request DELETE 'http://localhost:8000/dogs/67c0649bcaf452b88f5a8aa0' \
--header 'x-api-key: 1234567890abcdef' \
--data ''
- Endpoint: DELETE /:id
- Headers:  x-api-key: API key for authentication
- Path Parameters: id -	The unique ID of the dog picture (required)



3. Update a Dog Picture
- curl --location --request PUT 'http://localhost:8000/dogs/67c070c22b7c69b1247716da' \
--header 'x-api-key: 1234567890abcdef' \
--form 'image=@"/Users/pramanik/Downloads/dog2.jpeg"'
- Endpoint: PUT /:id
- Headers:  x-api-key: API key for authentication
- Path Parameters: id -	The unique ID of the dog picture (required)
- Request Body: Multipart/form-data : image (file): The image file to be uploaded. (required)



4. Fetch a Dog Picture
- curl --location 'http://localhost:8000/dogs/67c0649bcaf452b88f5a8aa0' \
--header 'x-api-key: 1234567890abcdef'
- Endpoint: GET /:id
- Headers:  x-api-key: API key for authentication
- Path Parameters: id -	The unique ID of the dog picture (required)
- Response: returns image file as response



5. List All Dog Pictures
- curl --location 'http://localhost:8000/dogs/' \
--header 'x-api-key: 1234567890abcdef'
- Endpoint: GET /
- Headers:  x-api-key: API key for authentication





### 🐶 Dog API - Docker Setup Guide  

### 🛠 Prerequisites  
Before proceeding, ensure that you have:  

- [Docker](https://www.docker.com/get-started) installed  
- MongoDB running **locally (`localhost:27017`)** or a **remote MongoDB instance**  

---

### 📥 1️⃣ Clone the Repository  
 ```sh
 git clone https://github.com/Chhavi41/genisys_Assignment.git
 cd genisys_Assignment
 ```


### 2️⃣ Create a .env File
Create a .env file in the root directory and define the required environment variables:
```sh PORT=8000
USE_DOCKER=true
MONGO_URI=mongodb://localhost:27017/dogpics
MONGO_URI_DOCKER=mongodb://host.docker.internal:27017/dogpics
API_KEYS=1234567890abcdef,abcdef1234567890
```

Note: Note: The USE_DOCKER variable ensures that the correct MongoDB URI is used inside the Docker container.
Set USE_DOCKER=true only when MongoDB is running locally on your host machine (outside Docker).
If MongoDB is running inside a separate Docker container, you should set MONGO_URI_DOCKER to the appropriate Docker network address instead.

### 3️⃣ Build the Docker Image
docker build -t dog-api .

### 4️⃣ Run the Docker Container with .env
```sh
docker run -p 8000:8000 --env-file .env --name dog-api-container dog-api
```






### 🐶 Dog API - Local Setup Guide
This guide will help you set up and run the Dog API project without Docker.


### 🛠 Prerequisites
Before proceeding, ensure that you have:
✅ Node.js (Latest LTS recommended)
✅ MongoDB installed and running locally (on localhost:27017)
✅ Git installed

### 📥 1️⃣ Clone the Repository  
 ```sh
 git clone https://github.com/Chhavi41/genisys_Assignment.git
 cd genisys_Assignment
 ```

### Install Dependencies
Navigate to the project directory and install all required dependencies:
```sh 
npm install
```

### 2️⃣ Create a .env File
Create a .env file in the root directory and define the required environment variables:
```sh 
PORT=8000
USE_DOCKER=false
MONGO_URI=mongodb://localhost:27017/dogpics
MONGO_URI_DOCKER=mongodb://host.docker.internal:27017/dogpics
API_KEYS=1234567890abcdef,abcdef1234567890
```
🔹 Note: Set USE_DOCKER=false since we are not using Docker.


### 🚀 4️⃣ Start the Server
Run the following command to start the API server:
```sh
npm start
```
By default, the server will be running at:
🔗 http://localhost:8000/







   
