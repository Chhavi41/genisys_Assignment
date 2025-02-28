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





   
