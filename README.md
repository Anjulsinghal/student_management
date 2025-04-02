# Student Management Dashboard

A React-based student management system with a clean UI, form validation, and persistent storage using Redux and Redux Persist.

## Links
Live Demo: https://student-management-eight-eta.vercel.app/

GitHub Repository: https://github.com/Anjulsinghal/student_management

## Features

- Add, edit, and delete student records
- Form validation for student information
- Persistent data storage (survives page reloads)
- Responsive design with Tailwind CSS
- Confirmation dialogs for important actions
- Toast notifications for user feedback

## Tech Stack

- **React** - UI library
- **Redux Toolkit** - State management
- **Redux Persist** - Local storage persistence
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/
│   ├── ConfirmDialog.jsx   # Confirmation dialog component
│   ├── Header.jsx          # Application header with Add button
│   ├── StudentForm.jsx     # Form for adding/editing students
│   ├── StudentTable.jsx    # Table to display student data
│   └── Toast.jsx           # Toast notification component
├── redux/
│   ├── Slices/
│   │   └── studentSlice.js # Redux slice for student data
│   └── store.js            # Redux store configuration
├── App.css                 # Application styles
├── App.jsx                 # Main application component
├── index.js                # Application entry point
└── index.css               # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/student-management-dashboard.git
   cd student-management-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

### Adding a Student

1. Click the "Add Student" button in the header
2. Fill in the required fields:
   - Name
   - Email
   - Phone (10 digits)
   - Gender
   - Department
3. Click "Add" to save the student

### Editing a Student

1. Click the edit icon (pencil) next to a student's record
2. Modify the student's information
3. Click "Update" to save changes

### Deleting a Student

1. Click the delete icon (trash) next to a student's record
2. Confirm deletion in the confirmation dialog

## Form Validation

The application validates the following:
- Name (required)
- Email (required, valid format)
- Phone (required, 10 digits)
- Gender (required)
- Department (required)

## Component Details

### App.jsx
The main component that orchestrates the entire application. It handles:
- State management for modals and dialogs
- Student CRUD operations via Redux
- Toast notifications

### StudentForm.jsx
Handles form submission and validation for adding/editing students.

### StudentTable.jsx
Displays the list of students and provides edit/delete actions. Shows a placeholder when no students exist.

### ConfirmDialog.jsx
Provides confirmation before performing important actions like deleting or updating records.

### Toast.jsx
Shows temporary notifications for user feedback with appropriate styling based on the message type (success, error, info).

### Header.jsx
Displays the application title and the "Add Student" button.

## Redux Implementation

### store.js
Configures the Redux store with persistence to maintain data across browser refreshes.

### studentSlice.js
Implements the student data slice with reducers for:
- Adding students
- Updating students
- Deleting students

## Acknowledgments

- Tailwind CSS for the utility-first CSS framework
- Redux team for state management tools
- Lucide for the beautiful icons