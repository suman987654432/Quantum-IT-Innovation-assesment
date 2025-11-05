import React, { useState } from 'react';
import { FaCog, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import image from "../assets/suman.jpg";
const Table = () => {
  // Sample user data
  const [users] = useState([
    {
      id: 1,
      name: 'Michael Holz',
      dateCreated: '04/10/2013',
      role: 'Admin',
      status: 'Active',
      image: image
    },
    {
      id: 2,
      name: 'Paula Wilson',
      dateCreated: '05/08/2014',
      role: 'Publisher',
      status: 'Active',
      image: image
    },
    {
      id: 3,
      name: 'Antonio Moreno',
      dateCreated: '11/05/2015',
      role: 'Publisher',
      status: 'Suspended',
      image: image
    },
    {
      id: 4,
      name: 'Mary Saveley',
      dateCreated: '06/09/2016',
      role: 'Reviewer',
      status: 'Active',
      image: image
    },
    {
      id: 5,
      name: 'Martin Sommer',
      dateCreated: '12/08/2017',
      role: 'Moderator',
      status: 'Inactive',
      image: image
    },
    {
      id: 6,
      name: 'John Doe',
      dateCreated: '15/03/2018',
      role: 'Publisher',
      status: 'Active',
      image: image
    },
    {
      id: 7,
      name: 'Jane Smith',
      dateCreated: '22/07/2019',
      role: 'Reviewer',
      status: 'Active',
      image: image
    },
    {
      id: 8,
      name: 'Robert Johnson',
      dateCreated: '10/11/2020',
      role: 'Admin',
      status: 'Inactive',
      image: image
    },
    {
      id: 9,
      name: 'Sarah Connor',
      dateCreated: '18/05/2021',
      role: 'Reviewer',
      status: 'Active',
      image: image
    },
    {
      id: 10,
      name: 'David Miller',
      dateCreated: '25/09/2021',
      role: 'Admin',
      status: 'Active',
      image: image
    }
  ]);

 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);


  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100';
      case 'Suspended':
        return 'text-red-600 bg-red-100';
      case 'Inactive':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  
  const getStatusIcon = (status) => {
    return (
      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
        status === 'Active' ? 'bg-green-500' : 
        status === 'Suspended' ? 'bg-red-500' : 'bg-orange-500'
      }`}></span>
    );
  };

  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 mt-7 sm:mt-8 md:mt-12 lg:mt-16">
      <div className="max-w-7xl mx-auto">
       
        <div className="mb-4 sm:mb-6 md:mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">User Management</h1>
          <p className="text-gray-600 text-base">Manage your team members and their account permissions here.</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full">
           
              <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wide">
                    S.NO
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wide">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wide">
                    Date Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wide">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wide">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-100">
                {currentUsers.map((user, index) => (
                  <tr key={`${user.id}-${currentPage}`} className="hover:bg-blue-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full border-2 border-blue-200 shadow-sm" 
                            src={user.image} 
                            alt={user.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                      {user.dateCreated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                      <span className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(user.status)}`}>
                        {getStatusIcon(user.status)}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 transition-all duration-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105">
                          <FaCog className="h-4 w-4" />
                        </button>
                        <button className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white transition-all duration-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105">
                          <FaTimes className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Previous
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Showing{' '}
                    <span className="font-bold text-gray-800">{indexOfFirstItem + 1}</span>
                    {' '}to{' '}
                    <span className="font-bold text-gray-800">
                      {Math.min(indexOfLastItem, users.length)}
                    </span>
                    {' '}of{' '}
                    <span className="font-bold text-gray-800">{users.length}</span>
                    {' '}results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-1.5 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaChevronLeft className="h-3 w-3" />
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`relative inline-flex items-center px-3 py-1.5 border text-sm font-semibold ${
                            currentPage === page
                              ? 'z-10 bg-blue-600 border-blue-600 text-white'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-1.5 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaChevronRight className="h-3 w-3" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;