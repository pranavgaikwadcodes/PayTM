# Basic  version of PayTM

## Overview
- This is a practice project for learning how transactions work in database.
- Tech Stack : React.js, Node.js, Express.js, MongoDB

**Installation Guide**

### Backend

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    npm start
    ```

### Frontend

1. Navigate to the `frontend` directory (in new terminal):
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm run dev
    ```

**Project screenshots**
[Screenshot 1](Screenshots/dashboard.JPG)
[Screenshot 2](Screenshots/signin.JPG)
[Screenshot 3](Screenshots/signup.JPG)
[Screenshot 4](Screenshots/sendMoney.JPG)



**Contributing**

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-new-feature`.
3. Commit your changes: `git commit -m 'Added x feature'`.
4. Push to the branch: `git push origin feature/my-new-feature`.
5. Submit a pull request.



**Use this example command to run mongodb repl set for transactions**
```
mongod --port 27017 --dbpath C:\data\db --replSet rs0
```