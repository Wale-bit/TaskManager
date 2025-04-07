# Task Manager API - Postman Review

## Setup
1. Import `TaskManagerAPI.postman_collection.json` into Postman.
2. Ensure the backend is running locally on `http://localhost:3000` (update `baseUrl` variable if deployed).
3. MongoDB must be running locally (`mongod`).

## Testing Workflow
1. Run "Register User" to create a user.
2. Run "Login User" to get a JWT token (automatically sets `token` variable).
3. Use "Create Task" to add a task (sets `taskId` variable).
4. Test "Get Tasks" to list tasks.
5. Use "Update Task" and "Delete Task" with the `taskId`.

## Notes
- Token expires after 1 hour; re-run "Login User" if needed.
- All task endpoints require the `token` variable set in the collection.