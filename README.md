# Group and Person Management Application

## About

### Backend

The backend consists of multiple APIs that handle MySQL changes and updates to tables for groups and persons. If the tables do not exist, it will create the tables for groups and persons. It contains two routes for groups and persons APIs.

### Frontend

A single-page application with groups and persons listed within the groups.

## Functionalities

### Header

-   **Menu Button:** Options to add a new person or a new group.

### Group Management

-   **View Groups:** Groups are displayed in a hierarchical structure.
-   **Expand/Collapse Groups:** Users can expand or collapse groups to view or hide their contents.
-   **Edit Group:** Users can edit group details such as name using a modal.
-   **Add Group:** Users can add new groups using a modal.

### Person Management

-   **View Persons:** Persons within each group are listed with their names, job titles, and timestamps of when they were added and last updated.
-   **Edit Person:** Users can edit person details using a modal.
-   **Add Person:** Users can add new persons to groups using a modal.

## Technologies Used

-   **React:** Frontend JavaScript library for building user interfaces.
-   **react-beautiful-dnd:** React library for drag-and-drop functionality.
-   **TypeScript:** Typed superset of JavaScript for improved code quality.
-   **Tailwind CSS:** Utility-first CSS framework for styling components.
-   **Node.js:** JavaScript runtime for server-side programming.
-   **Express:** Web framework for Node.js to build APIs.

## How to Use

1. **Clone Repository:** Clone this repository to your local machine.
2. **Install Dependencies for Backend and Frontend:**
    ```sh
    cd ./server
    npm install
    cd ../client
    npm install
    ```
3. **Start Development Server:**
    ```sh
    cd ./server
    npm start
    ```
4. **Start Frontend Server:**
    ```sh
    cd ../client
    npm run dev
    ```
5. **Open Application:** Open your browser and navigate to `http://localhost:5173` (port selected by default by Vite) to view the application.
