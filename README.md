# GPT Chat Application with Authentication

This is a full-stack application that allows users to chat with OpenAI's GPT models. Users can register, login, and then interact with the model via a simple interface. The application uses a React frontend, a Python FastAPI backend, and relies on OpenAI's GPT API for the chat functionality.

## Features

1. **User Authentication**: Register, login, and manage your user account.
2. **Chat Interface**: Simple and intuitive UI to interact with the GPT model.
3. **Admin Dashboard**: Monitor API usage, check logs, and manage users.
4. **Profile Editing**: Users can change their username, password, email, and API key.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: FastAPI, PostgreSQL
- **Others**: Docker, OpenAI's GPT API

## Installation and Setup

### Prerequisites

- Node.js
- Python 3.x
- Docker (optional)
- An OpenAI API Key

### Steps

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/yourrepository.git
    ```

2. **Frontend Setup**

    Navigate to the frontend folder and install dependencies.

    ```bash
    cd frontend
    npm install
    ```

    Create a `.env` file to store your environment variables, like the API endpoint.

    ```env
    REACT_APP_API_ENDPOINT=http://localhost:8000
    ```

    Run the frontend server.

    ```bash
    npm start
    ```

3. **Backend Setup**

    Navigate to the backend folder and install dependencies.

    ```bash
    cd backend
    pip install -r requirements.txt
    ```

    Run the backend server.

    ```bash
    uvicorn main:app --reload
    ```

4. **Docker Setup** (Optional)

    If you prefer using Docker, a `Dockerfile` and `docker-compose.yml` are provided.

    ```bash
    docker-compose up --build
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new user or login.
3. Once logged in, you'll be redirected to the chat interface.

## Contributing

Feel free to fork the project, open issues, and provide pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

---

You can add or remove sections based on your actual project details and features. This is a general guideline to help you get started.
