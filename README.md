[![Build Status](https://travis-ci.org/DevinTyler26/08-09-http-routing-rest.svg?branch=lab-08)](https://travis-ci.org/DevinTyler26/08-09-http-routing-rest)
![cf](https://i.imgur.com/7v5ASc8.png)    
# Lab 08: Vanilla REST API w/ Routing and In Memory Persistence

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork
* Create a PR to your master from your working branch.
* Ensure that your repository/branch is connected to travis-ci.com
* Ensure that your repository/branch is deployed on heroku.com
* Submit on canvas:
  * a question and observation
  * how long you spent
  * link to your pull request that indicates it passed Travis
  * Heroku Server URL

## Configuration 
Configure the root of your repository with the following files and directories. Thoughfully name and organize any aditional configuration or module files.
* **README.md** - contains documentation
* **.env** - contains env variables (should be git ignored)
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file 
* **.eslintrc** - contains the course linter configuratoin
* **.eslintignore** - contains the course linter ignore configuration
* **.travis.yml** - contains the course linter ignore configuration
* **package.json** - contains npm package config
  * create a `lint` script for running eslint (eslint **/*.js)
  * create a `test` script for running tests
  * create a `start` script for running your server
* **index.js** - the entry point for your application
* **src/** - contains your core application files and folders
* **src/app.js** - (or main.js) contains your core application bootstrap
* **src/lib/** - contains module definitions
* **\_\_test\_\_/** - contains unit tests

## Learning Objectives  
* students will learn to use promise constructs to manage asynchronous code
* students will learn to create a vanilla RESTful API with in-memory persistence
* students will learn how to refactor commonly used coding constructs into custom helper modules

#### Feature Tasks
* create an HTTP server using the native NodeJS `http` module
* create an HTTP server using the native NodeJS `http` module
* create a custom parser module that:
  * uses promises to parse the JSON body of `POST` and `PUT` requests
  * uses the NodeJS `url` and `querystring` modules to parse the request url
* create a router class that allows you to register custom routes for `GET`, `POST`, `PUT`, and `DELETE` requests
* create a data model class that creates a _simple resource_  with at least 3 properties
  * include an `_id` property that is set to a unique id
  * include two additional properties of your choice (ex: name, age, etc.)
  * **Please do not use 'Notes' as your model like lecture code, select a different model with different properties that are NOT title and content**
* create a data model storage interface that can store data through different storage mechanisms.

## Server Endpoints
### `/api/v1/<your-resource>`
* `POST` request
  * pass data as stringifed JSON in the body of a **POST** request to create a new resource
  * SUCCESS: 200 status code with the response body being the retrieved resource with a matching ID
  * FAILURE: 400 for a bad request, i.e. not sending in a required property or not sending any text
* `GET` request
  * pass `?id=<uuid>` as a query string parameter to **GET** a specific resource (as JSON)
  * SUCCESS: 200 status code with the response body being the retrieved resource with a matching ID
  * FAILURE: 404 for resource not found
* `DELETE` request
  * pass `?id=<uuid>` in the query string to **DELETE** a specific resource
  * SUCCESS: 204 status code with no content in the body
  * FAILURE: 404 for resource not found

## Tests
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure the `/api/simple-resource-name` endpoint responds as described for each condition below:
 * `GET`: test 404, it should respond with 'Not Found' for valid requests made with an id that was not found
 * `GET`: test 200, it should contain a response body for a request made with a valid id
 * `POST`: test 400, it should respond with 'Bad Request' if no request body was provided or the body was invalid
 * `POST`: test 200, it should respond with the body content for a post request with a valid body
 * `DELETE`: test 200, it should respond with a 204 status to indicate successful deletion
 * `DELETE`: test 404, it should respond with a 404 status to indicate that resource was not found
 
 ## Bonus Points (up to 3 points)
 * If a querystring id is not passed to the `GET` route, the default behavior should retrieve an array of ID's for each resource stored in the storage module. 
 * `PUT` request
   * pass `?id=<uuid>` in the query string to **UPDATE** a specific resource
   * SUCCESS: 200 status code with the response body being the updated resource
   * FAILURE: 404 for resource not found
   * Test your `PUT` request for 200 and 404 statuses
 * Create a new `GET` route or modify your original `GET` route so that it can accept other query paramters besides an ID, such as `/api/v1/notes?title=hello&content=world`. The behavior of this route should search through your storage module and return an array of all resources matching that criteria. 
 
 ## Documentation
- carRouter.post('/api/cars/) this will post a new car to the database
- carRouter.get('/api/cars/:id?') this will go to the db and search for a car based on the given id
- carRouter.delete('/api/cars/:id?') this will find a car in the db based on the given id and delete it


