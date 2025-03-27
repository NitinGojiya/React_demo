import React, { useEffect, useState } from 'react';

const Details = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState(5);
  const pageSize = list;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData);
        setFilteredData(fetchedData);
      })
      .catch((error) => console.error('Error loading JSON:', error));
  }, []);

  useEffect(() => {
    let updatedData = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(updatedData);
  }, [searchQuery, data]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredData(sortedData);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className='overflow-x-auto'>
      <h1 className='text-4xl border-b-4 m-5'>Data Fetch From API</h1>
      <div className="flex items-center justify-end p-5">
        <div className='flex items-center justify-center gap-2'>
        <div>
        <input
          type='search'
          placeholder='Search By Title...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='border p-2 '
        />
        </div>
       
      <div>
      <select defaultValue="Pick a color" className="select" onChange={(e) => setList(e.target.value)}>
          <option disabled={true}>Pagination</option>
          <option>5</option>
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
      </div>
      </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }} className="table table-xs">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>ID</th>
            <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>Title</th>
            <th onClick={() => handleSort('completed')} style={{ cursor: 'pointer' }}>Completed</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.completed ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="join">
        <button className="join-item btn" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <button className="join-item btn">Page {currentPage}</button>

        <button
          className="join-item btn"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / pageSize)))}
          disabled={currentPage === Math.ceil(filteredData.length / pageSize)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Details;
