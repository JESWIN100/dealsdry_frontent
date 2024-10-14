import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../config/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export default function EmployeeEdit() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [employee, setEmployee] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();
const navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/employe/getById/${id}`, { withCredentials: true });
        setEmployee(response.data.data);
        console.log(response.data.data);

        // Set form values using the fetched employee data
        setValue('name', response.data.data.name);
        setValue('email', response.data.data.email);
        setValue('mobile', response.data.data.mobile);
        setValue('designation', response.data.data.designation);
        setValue('gender', response.data.data.gender);
        setValue('courses', response.data.data.courses || []);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchData();
  }, [setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email); 
    formData.append('mobile', data.mobile);
    formData.append('designation', data.designation);
    formData.append('gender', data.gender);
    formData.append('courses', data.courses);
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    } else {
      // Optionally, you can append the existing image URL if no new image is uploaded
      formData.append('existingImage', employee.image);
    }
  
    try {
      const response = await axiosInstance.put(`/employe/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      toast.success("Employee updated successfully");
      navigate('/employe-list')
  
      // If the image was updated, set the new image preview
      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
      } else {
        // Keep the existing image if no new image is uploaded
        setImagePreview(employee.image);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating employee");
    }
  };
  

  // Handle file input change to preview the image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white text-gray-700 mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
     
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className={`border rounded w-full p-2 bg-white text-black ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required' })}
            className={`border rounded w-full p-2 bg-white text-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        {/* Mobile Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            {...register('mobile', { required: 'Mobile number is required' })}
            className={`border rounded w-full p-2 bg-white text-black ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile.message}</p>}
        </div>

        {/* Designation Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="designation">Designation</label>
          <select
            id="designation"
            {...register('designation', { required: 'Designation is required' })}
            className={`border rounded w-full p-2 bg-white text-black ${errors.designation ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Designation</option>
            <option value="developer">Hr</option>
            <option value="designer">Sales</option>
            <option value="manager">Manager</option>
          </select>
          {errors.designation && <p className="text-red-500 text-xs">{errors.designation.message}</p>}
        </div>

        {/* Gender Radio Buttons */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gender</label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="gender-male"
              value="male"
              {...register('gender', { required: 'Gender is required' })}
              className="mr-2 appearance-none w-4 h-4 border-2 border-gray-500 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <label htmlFor="gender-male" className="mr-4">Male</label>

            <input
              type="radio"
              id="gender-female"
              value="female"
              {...register('gender', { required: 'Gender is required' })}
              className="mr-2 appearance-none w-4 h-4 border-2 border-gray-500 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <label htmlFor="gender-female">Female</label>
          </div>
          {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
        </div>

        {/* Course Checkboxes */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Courses</label>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                value="MCA"
                {...register('courses')}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2">MCA</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="BCA"
                {...register('courses')}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2">BCA</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="BSC"
                {...register('courses')}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2">BSC</span>
            </label>
          </div>
        </div>
        {employee && employee.image && (
        <div className="mb-4">
          <img 
            src={employee.image} 
            alt={employee.name} 
            className="w-auto h-20 mb-4 rounded" 
          />
        </div>
      )}
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            {...register('image')}
            className={`border rounded w-full p-2 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}