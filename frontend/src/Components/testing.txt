import React, { useEffect, useState, useMemo } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';

// Define a global filter component for searching
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div className='flex items-center justify-end'>
      <div>
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input type="search" required
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
            placeholder="Search all columns..."
          />
        </label>
      </div>
    </div>
  );
};

const Details = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((fetchedData) => setData(fetchedData))
      .catch((error) => console.error('Error loading JSON:', error));
  }, []);

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Completed',
        accessor: 'completed',
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
    ],
    []
  );

  // Initialize the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 }, // Set initial page size
    },
    useGlobalFilter, // Enable global filtering
    useSortBy,       // Enable sorting
    usePagination    // Enable pagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div>
      <h1 className='text-4xl border-b-4 m-5'>Data Fetch From Api</h1>
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '2px solid black' }}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ padding: '10px', textAlign: 'left', cursor: 'pointer' }}
                >
                  {column.render('Header')}
                  {/* Add sort direction indicator */}
                  {column.isSorted ? (column.isSortedDesc
                    ?
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                      </svg>

                    </>
                    :
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                      </svg>

                    </>
                  ) : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ borderBottom: '1px solid gray' }}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '10px' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div style={{ marginTop: '10px' }} className='bg-black text-white'>
        <button className='btn btn-success btn-outline' onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button className='btn btn-success btn-outline' onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select className='bg-black'
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Details;
