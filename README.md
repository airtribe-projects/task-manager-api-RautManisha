# Task Management

RESTful API for management using Node.js, Express.js, and in-memory data storage.

# Features

Add Task
Update Task
Delete Task
Validations
Filters

# Setup

1. Clone the repository
   git clone https://github.com/{username}/task-manager-api.git
2. Install dependencies
   npm install
3. Run App
   npm run dev

# env

Configure PORT variable if required. Set to 4001 currently

# APIs

1. Get all tasks - GET /tasks
   Query Parameters:
   completed=true|false: Filter by completion status
   sort=asc|desc: Sort by creation date

   curl --location 'localhost:4002/tasks'
   curl --location 'localhost:4002/tasks?completed=true'
   curl --location 'localhost:4002/tasks?completed=false'
   curl --location 'localhost:4002/tasks?completed=false&sort=desc'

2. Get task by ID - GET /tasks/:taskId

   curl --location 'localhost:4002/tasks/2'

3. Get tasks by priority - GET /tasks/priority/:level
   :level can be low, medium, or high.

   curl --location 'localhost:4002/tasks/priority/low'

4. Create a task - POST /tasks

   curl --location 'localhost:4002/tasks' \
   --header 'Content-Type: application/json' \
   --data '{
   "title":"some title",
   "description":"some description",
   }'

   curl --location 'localhost:4002/tasks' \
   --header 'Content-Type: application/json' \
   --data '{
   "title":"some title",
   "description":"some description",
   "completed":false,
   }'

   curl --location 'localhost:4002/tasks' \
   --header 'Content-Type: application/json' \
   --data '{
   "title":"some title",
   "description":"some description",
   "completed":false,
   "priority":"high"
   }'

5. Update a task - PUT /tasks/:taskId

   curl --location --request PUT 'localhost:4002/tasks' \
    --header 'Content-Type: application/json' \
    --data '{
   "title":"18",
   "description":"12",
   }'

   curl --location --request PUT 'localhost:4002/tasks' \
    --header 'Content-Type: application/json' \
    --data '{
   "title":"18",
   "description":"12",
   "completed":false,
   }'

   curl --location --request PUT 'localhost:4002/tasks' \
    --header 'Content-Type: application/json' \
    --data '{
   "title":"18",
   "description":"12",
   "completed":false,
   "priority":"high"
   }'

6. Delete a task - DELETE /tasks/:taskId
   curl --location --request DELETE 'localhost:4002/tasks/2'
