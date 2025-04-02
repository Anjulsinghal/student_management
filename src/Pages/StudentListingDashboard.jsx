import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllStudents, addStudent, updateStudent, deleteStudent, deleteAllStudents } from '../redux/Slices/studentSlice';
import Header from '../components/Header';
import StudentTable from '../components/StudentTable';
import StudentForm from '../components/StudentForm';
import ConfirmDialog from '../components/ConfirmDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2 } from 'lucide-react';

const StudentListingDashboard = () => {
    const dispatch = useDispatch();
    const allStudents = useSelector(selectAllStudents);
    
    // State management
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: '', id: null });
    
    // Search and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5);
    
    // Filtered students based on search
    const [filteredStudents, setFilteredStudents] = useState(allStudents);
    
    // Update filtered students when search term or all students change
    useEffect(() => {
      if (searchTerm) {
        setFilteredStudents(
          allStudents.filter(student => 
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setCurrentPage(1); // Reset to first page when searching
      } else {
        setFilteredStudents(allStudents);
      }
    }, [searchTerm, allStudents]);
    
    // Get current students for pagination
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    
    // Open form for adding a new student
    const handleAddClick = () => {
      setCurrentStudent(null);
      setIsFormOpen(true);
    };
    
    // Open form for editing an existing student
    const handleEditClick = (student) => {
      setCurrentStudent(student);
      setIsFormOpen(true);
    };
    
    // Handle search input change
    const handleSearch = (term) => {
      setSearchTerm(term);
    };
    
    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    
    // Handle student form submission
    const handleFormSubmit = (formData) => {
      if (currentStudent) {
        // Check if any data was actually changed when editing
        if (
          formData.name === currentStudent.name &&
          formData.email === currentStudent.email &&
          formData.phone === currentStudent.phone &&
          formData.gender === currentStudent.gender &&
          formData.department === currentStudent.department
        ) {
          toast.info('No changes were made');
        } else {
          // Confirm before updating
          setConfirmDialog({
            isOpen: true,
            type: 'update',
            id: currentStudent.id,
            data: formData
          });
        }
      } else {
        // Confirm before adding new student
        setConfirmDialog({
          isOpen: true,
          type: 'add',
          data: formData
        });
      }
    };
    
    // Handle delete button click
    const handleDeleteClick = (id) => {
      setConfirmDialog({
        isOpen: true,
        type: 'delete',
        id
      });
    };
    
    // Handle delete all button click
    const handleDeleteAllClick = () => {
      // Only show confirmation if there are students to delete
      if (allStudents.length > 0) {
        setConfirmDialog({
          isOpen: true,
          type: 'deleteAll',
          message: `Are you sure you want to delete all ${allStudents.length} students? This action cannot be undone.`
        });
      } else {
        toast.info('No students to delete');
      }
    };
    
    // Process confirmed actions (add/update/delete)
    const handleConfirmAction = () => {
      const { type, id, data } = confirmDialog;
      
      if (type === 'add') {
        dispatch(addStudent(data));
        toast.success('Student added successfully');
      } 
      else if (type === 'update') {
        dispatch(updateStudent({ id, ...data }));
        toast.success('Student updated successfully');
      } 
      else if (type === 'delete') {
        dispatch(deleteStudent(id));
        toast.success('Student deleted successfully');
      }
      else if (type === 'deleteAll') {
        dispatch(deleteAllStudents());
        toast.success('All students deleted successfully');
        setCurrentPage(1); // Reset to first page after deletion
      }
      
      // Close form and dialog
      setIsFormOpen(false);
      setConfirmDialog({ isOpen: false, type: '', id: null });
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header 
          onAddClick={handleAddClick} 
          onSearch={handleSearch} 
          searchTerm={searchTerm}
        />
        
        <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                <h2 className="text-lg font-medium text-gray-800">Student Directory</h2>
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'}
                </span>
              </div>
              
              {allStudents.length > 0 && (
                <button
                  onClick={handleDeleteAllClick}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg flex items-center transition-colors text-sm font-medium"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete All
                </button>
              )}
            </div>
            <StudentTable 
              students={currentStudents}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onAddClick={handleAddClick}
              totalStudents={filteredStudents.length}
              studentsPerPage={studentsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
        
        {/* Modal components */}
        {isFormOpen && (
          <StudentForm 
            student={currentStudent} 
            onSubmit={handleFormSubmit} 
            onClose={() => setIsFormOpen(false)} 
          />
        )}
        
        {confirmDialog.isOpen && (
          <ConfirmDialog 
            type={confirmDialog.type}
            message={
              confirmDialog.message || (
                confirmDialog.type === 'delete' 
                  ? 'Are you sure you want to delete this student?' 
                  : confirmDialog.type === 'update'
                  ? 'Save changes to this student record?'
                  : confirmDialog.type === 'deleteAll'
                  ? `Delete all ${allStudents.length} students permanently?`
                  : 'Add this new student to the directory?'
              )
            }
            onConfirm={handleConfirmAction}
            onCancel={() => setConfirmDialog({ isOpen: false, type: '', id: null })}
          />
        )}
        
        {/* React Toastify Container */}
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
}

export default StudentListingDashboard