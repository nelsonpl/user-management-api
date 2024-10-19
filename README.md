# TodoList API - NestJS

A robust REST API to manage a task list, providing features for creating, updating, completing, archiving, and deleting tasks. This project demonstrates full-stack development capabilities using NestJS and MongoDB.

## Technologies Used:

- **Node.js**: JavaScript runtime for building the API.
- **NestJS**: Framework for building efficient and scalable server-side applications.
- **MongoDB**: NoSQL database for storing tasks.
- **Swagger / OpenAPI**: For API documentation and testing.
- **Docker**: For containerizing the application.
- **Unit/Integration Testing**: To ensure the correctness of functionality.
- **Logging Library**: To track application logs.
- **GitHub Actions**: For CI/CD pipeline automation.
- **AWS EC2**: For deployment of the API.

## API Routes:

### 1. Get All Tasks

- **Endpoint**: `GET /api/todo`
- **Query Params** (optional):
  - `search`: Filter tasks by title and description.
  - `start`: Filter tasks by start date.
  - `end`: Filter tasks by end date.
  - `priority`: Filter tasks by priority.
  - `orderBy`: Attribute to order by (e.g., `title`, `dueDate`).
  - `orderDirection`: Sort direction (`asc` or `desc`).
  - `page`: Pagination page number.
  - `limit`: Number of tasks per page.
- **Response**:
    
    ```json
    {
      "data": [{ 
        "id": 1,
        "title": "Task title",
        "description": "Task description",
        "priority": "Task priority",
        "dueDate": "Task due date",
        "status": "opened"
      }],
      "meta": {
        "totalItems": 0,
        "currentPage": 0
      }
    }
    ```

### 2. Get Task by ID

- **Endpoint**: `GET /api/todo/{id}`
- **Response**: Returns the task JSON by ID.

### 3. Create a Task

- **Endpoint**: `POST /api/todo`
- **Payload**:
    
    ```json
    {
      "title": "Task title",
      "description": "Task description",
      "priority": "Task priority",
      "dueDate": "Task due date"
    }
    ```
- **Response**: Returns the created task JSON.

### 4. Update a Task

- **Endpoint**: `PUT /api/todo/{id}`
- **Payload**:
    
    ```json
    {
      "title": "Updated title",
      "description": "Updated description",
      "priority": "Updated priority",
      "dueDate": "Updated due date"
    }
    ```
- **Response**: Returns the updated task JSON.

### 5. Complete a Task

- **Endpoint**: `PUT /api/todo/{id}/completed`
- **Response**: Returns the updated task JSON with completion status.

### 6. Archive a Task

- **Endpoint**: `PUT /api/todo/{id}/archive`
- **Response**: Returns the updated task JSON with archive status.

### 7. Delete a Task

- **Endpoint**: `DELETE /api/todo/{id}`
- **Response**: Returns HTTP status indicating successful deletion.

## TODO List:

- [X] Set up NestJS and create a home route returning API name and version.
- [ ] Configure MongoDB connection.
- [ ] Create a health check route to monitor server and database connectivity.
- [ ] Implement list (GET) route for tasks.
- [ ] Implement get-by-id (GET) route for tasks.
- [ ] Implement create (POST) route for tasks.
- [ ] Implement update (PUT) route for tasks.
- [ ] Implement delete (DELETE) route for tasks.
- [ ] Set up Swagger/OpenAPI for documentation.
- [ ] Write unit tests for critical functionalities.
- [ ] Write integration tests for API flows.
- [ ] Configure Docker for containerized deployment.
- [ ] Set up GitHub Actions for CI/CD.
- [ ] Deploy the application to AWS EC2.

## Installation and Setup:

1. Clone the repository:
    
    ```bash
    git clone https://github.com/your-repo/todolist-nestjs.git
    ```
    
2. Install dependencies:
    
    ```bash
    cd todolist-nestjs
    npm install
    ```
    
3. Run the application locally:
    
    ```bash
    npm run start
    ```
    
4. For Docker setup:
    
    ```bash
    docker-compose up --build
    ```

## Testing:

- Run unit tests:
    
    ```bash
    npm run test
    ```
    
- Run integration tests:
    
    ```bash
    npm run test:e2e
    ```

---
