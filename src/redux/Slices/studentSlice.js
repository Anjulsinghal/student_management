import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    // Add a new student
    addStudent: (state, action) => {
      // Generate a unique ID
      const id = nanoid();
      state.students.unshift({ id, ...action.payload });
    },
    
    // Edit an existing student
    updateStudent: (state, action) => {
      const { id } = action.payload;
      const existingStudentIndex = state.students.findIndex(student => student.id === id);
      
      if (existingStudentIndex !== -1) {
        state.students[existingStudentIndex] = action.payload;
      }
    },
    
    // Delete a student
    deleteStudent: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
    
    // Delete all students
    deleteAllStudents: (state) => {
      state.students = [];
    }
  }
});

// Export actions
export const { addStudent, updateStudent, deleteStudent, deleteAllStudents } = studentSlice.actions;

// Export selectors
export const selectAllStudents = (state) => state.students.students;
export const selectStudentById = (state, studentId) => 
  state.students.students.find(student => student.id === studentId);

// Export reducer
export default studentSlice.reducer;