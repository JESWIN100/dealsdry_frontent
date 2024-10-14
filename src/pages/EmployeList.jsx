import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserCheck, UserX } from 'lucide-react';
export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); // Change this for pagination
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'ascending' });

  const fetchDetails = async () => {
    try {
      const response = await axiosInstance.get('/employe/all');
      setEmployees(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Search filter
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await axiosInstance.delete(`/employe/delete/${id}`);
      if (response.data.success) {
        toast.success('Employee deleted successfully');
        fetchDetails();
      } else {
        toast('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error(error.response?.data?.message || 'Error deleting employee');
    }
  };

  const handleActivateDeactivate = async (id) => {
    try {
      const response = await axiosInstance.post(`/employe/confirm/${id}`);
      if (response.data) {
        toast.success('Employee status updated successfully');
        fetchDetails();
      }
    } catch (error) {
      console.error('Error toggling employee status:', error);
      toast.error('Failed to toggle employee status');
    }
  };

  // const confirmStatus = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.put(`/api/employees/confirm-status/${id}`);
  //     setEmployee(response.data.data);
  //     setSuccessMessage(response.data.message);
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'An error occurred');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className='bg-white min-h-screen text-gray-800'>
      <div className="navbar text-black bg-yellow-400">
        <span className='ml-5 font-bold'>Employee List</span>
      </div>
      <div className="navbar text-black flex justify-end pr-20 bg-gray-300 gap-7">
        <span className='ml-5 font-bold'>Total Count: {employees.length}</span>
        <Link to={'/employe-form'}>
          <button>Create Employee</button>
        </Link>
      </div>
      <div className="navbar bg-white text-black flex items-center justify-end p-4 gap-4">
        <span className="font-medium">Search</span>
        <input
          type="text"
          className="border rounded-lg px-3 bg-white py-1 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Search Keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className='text-black'>
              <th>#</th>
              {['uniqueId','image', 'name', 'email', 'mobile No', 'Designation', 'gender','created At'].map(key => (
                <th key={key} onClick={() => handleSort(key)}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employe, index) => (
              <tr key={employe._id}>
                <td>{index + 1 + (currentPage - 1) * employeesPerPage}</td>
                <td>{employe._id}</td>
                <td>
                  <img className="mask mask-squircle h-12 w-12" src={employe.image} alt={`${employe.name}'s Avatar`} />
                </td>
                <td>{employe.name}</td>
                <td>{employe.email}</td>
                <td>{employe.mobile}</td>
                <td>{employe.designation}</td>
                <td>{employe.gender}</td>
                <td>{new Date(employe.createdAt).toLocaleDateString()}</td>
                <td className={` px-4 py-2 ${employe.status === 'Inactive' ? 'text-red-500' : 'text-green-500'}`}>
                {employe.status}
            </td>
                <td>
                  <Link to={`/employe-edit/${employe._id}`}>
                    <button className="btn btn-sm btn-primary mr-2">Edit</button>
                  </Link>
                  <button className="btn btn-sm btn-danger mr-2" onClick={() => deleteEmployee(employe._id)}>Delete</button>
                  <button className="btn btn-sm btn-secondary " onClick={() => handleActivateDeactivate(employe._id)}>
                  {employe.status === 'Active' ? (
                  <>
                    <UserX className="mr-1" />

                    Inactive
                  </>
                ) : (
                  <>
                    <UserCheck className="mr-1" />

                    Activate
                  </>
                )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center p-4">
        <div className="join grid grid-cols-2 text-black">
          <button
            className="join-item btn btn-outline text-black"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous page
          </button>
          <button
            className="join-item btn btn-outline text-black"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
