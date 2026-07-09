# Task CLI

A simple command-line interface to track your tasks — what you need to do, what you're working on, and what you've completed. Built with pure Node.js, no external dependencies.

## Features

- Add, update, and delete tasks
- Mark tasks as in-progress or done
- List all tasks or filter by status
- Data persisted locally in a `tasks.json` file

## Requirements

- Node.js v14 or higher

## Installation

Clone or download the project, then navigate to the folder:

```bash
cd task-cli
```

Make the script executable (Mac/Linux only):

```bash
chmod +x task-cli.js
```

## Usage

Run commands using:

```bash
node task-cli.js <command> [arguments]
```

### Add a task

```bash
node task-cli.js add "Buy groceries"
# Output: Task added successfully (ID: 1)
```

### Update a task

```bash
node task-cli.js update 1 "Buy groceries and cook dinner"
```

### Delete a task

```bash
node task-cli.js delete 1
```

### Mark a task as in-progress

```bash
node task-cli.js mark-in-progress 1
```

### Mark a task as done

```bash
node task-cli.js mark-done 1
```

### List all tasks

```bash
node task-cli.js list
```

### List tasks by status

```bash
node task-cli.js list todo
node task-cli.js list in-progress
node task-cli.js list done
```

## Task Properties

Each task stored in `tasks.json` has the following properties:

| Property | Type | Description |
|---|---|---|
| `id` | Number | Unique identifier, auto-generated |
| `description` | String | Short description of the task |
| `status` | String | `todo`, `in-progress`, or `done` |
| `createdAt` | String | ISO timestamp when the task was created |
| `updatedAt` | String | ISO timestamp when the task was last updated |

## Data Storage

Tasks are saved in a `tasks.json` file in the directory where you run the command. The file is created automatically if it doesn't exist.

Example `tasks.json`:

```json
[
  {
    "id": 1,
    "description": "Buy groceries",
    "status": "todo",
    "createdAt": "2026-06-27T10:00:00.000Z",
    "updatedAt": "2026-06-27T10:00:00.000Z"
  }
]
```

## Project Structure

```
task-cli/
├── task-cli.js      # Main entry point and all CLI logic
├── tasks.json       # Auto-generated data file
├── package.json     # Project metadata
└── README.md        # This file
```

## Error Handling

- Running a command with an invalid ID prints a friendly error message
- An empty or missing `tasks.json` is handled gracefully
- Unknown commands print a list of available commands
