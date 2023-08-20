# Running the Application

## Running the Backend Code

1. **Prerequisites**:
   - Install Java 11 and Apache Maven on your system.

2. **Clone the Repository**:
   - Clone the repository.

3. **Run Backend**:
   - Navigate to the `backend` folder in the repository.
   - Run the following command to compile and run the backend server:
     ```
     mvn compile exec:java -Dexec.mainClass="Server"
     ```
   - To run tests, execute:
     ```
     mvn test
     ```

## Running the Frontend Code

1. **Prerequisites**:
   - Ensure you have Node.js and NPM (Node Package Manager) installed on your system.

2. **Navigate to Frontend Directory**:
   - Navigate to the `frontend` repository folder.

3. **Install Dependencies**:
   - Run the following command to install all required packages:
     ```
     npm install
     ```

4. **Start the Frontend**:
   - Run the following command to start the application:
     ```
     npm run dev
     ```

5. **Access the Application**:
   - Open your web browser and navigate to `http://localhost:5173/` to run the frontend application.

6. **Test Different Views**:
   - To test the admin view, enter 'admin' in the login form.
   - To test the user view, enter any other username.

---
