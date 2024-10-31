# To-Do List Server

## Description:
This project from my Applied IT Programming course required that we create a implement a HTTP server in Node.js designed for the user to utilize the HTTP methods to create their to do list. It starts off with two entries already made for the user and using the CLI the user can edit the to do list.  

## Features

- **GET**: Retrieve the current to-do list. If the list is empty, it returns a message indicating so.
- **POST**: Add a new item to the to-do list.
- **DELETE**: Remove an item from the to-do list based on its index.
- **PUT**: Update an existing item in the to-do list by its index.

## Code Overview

### Dependencies

- The server uses the built-in `http` module for creating the HTTP server.
- The `path` module is used for handling file paths.

### Server Setup

1. The server listens on a specified port, which must be provided as a command-line argument. The port number must be greater than or equal to 3000.
2. If the port number is not provided or is below the required threshold, the server will terminate with an error message.

### Request Handling

The request handler (`reqHandler`) processes incoming requests based on the HTTP method:

- **GET**: Calls `processGET` to return the current to-do list or an empty list message.
- **POST**: Calls `processPOST` to add a new item to the list.
- **DELETE**: Calls `processDelete` to remove an item by index.
- **PUT**: Calls `processPUT` to update an item by index.

### Item Management

- The to-do items are stored in an array called `items`.
- Each HTTP method interacts with the `items` array to perform the desired operation.

## Running the Server

To start the server, use the following command:

```bash
node todoServer2.js [port number]
