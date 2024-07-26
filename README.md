# Contact Service

Welcome to the **Contact Service**! This is a Node.js application designed for managing contact information using MongoDB. The service provides an API endpoint to identify or create contacts based on provided email and phone number, handling both primary and secondary contact relationships with transactional integrity.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Testing](#testing)
7. [Contributing](#contributing)
8. [License](#license)

## Features

- **Contact Management**: Easily create and manage contact information including email and phone numbers.
- **Primary and Secondary Contacts**: Automatically handle relationships between primary contacts and their secondary contacts.
- **Transactional Operations**: Ensure data integrity by using MongoDB transactions during operations.
- **Flexible Schema**: Designed with a schema that supports scalability and can be extended in the future.

## Installation

To set up the Contact Service on your local machine, follow these steps:

1. **Clone the Repository**:

   First, clone the repository from GitHub to your local machine:

   ```bash
   git clone https://github.com/yourusername/contact-service.git
   cd contact-service
