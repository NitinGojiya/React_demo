import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import logo from "../assets/logo.png"

const Navbar = ({currentPageName}) => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();


  const handelLogout = (e) => {
    e.preventDefault();
    dispatch(
      logout()
    )
  }
  const handleDelete = (e, email) => {

    e.preventDefault();
    if (window.confirm("Do you want to proceed?")) {
      //  Retrieve the users array from local storage
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Filter out the user with the matching email
      const updatedUsers = users.filter(user => user.email !== email);

      //  Update local storage with the new users array
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Step 4: Dispatch the logout action
      dispatch(logout());
    } else {

    }



  };

 

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm pr-20 md:pr-20  sticky top-0 z-50">
        <div className="flex-1">
          <a className=" text-xl">Logo_Demo</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li><a href='/' className='btn btn-outline btn-success'>Home</a></li>
            {
              user
                ?
                <li><a href='/details' className='btn btn-outline btn-success'>Details</a></li>
                : <></>
            }

            {
              user ?
                <li>
                  <details className="dropdown dropdown-left">
                    <summary>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>

                    </summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <li><a>{user.email}</a></li>
                      <li><a>{user.name}</a></li>
                      <li><button onClick={(e) => handleDelete(e, user.email)}>Delete Account</button></li>

                      <li ><button onClick={handelLogout}>logout</button></li>
                    </ul>
                  </details>
                </li>
                :
                <li className='ml-2'>
                  <a href='/login' className='btn btn-outline btn-success'>Login</a>



                </li>
            }

          </ul>
        </div>
      </div>
<div className="drawer mt-3 mb-3 z-52 sticky top-[80px]">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    
    <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate">
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" />

  {/* hamburger icon */}
  <svg
    className="swap-off fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 512 512">
    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
  </svg>

  {/* close icon */}
  <svg
    className="swap-on fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 512 512">
    <polygon
      points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
  </svg>
</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay text-black"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><a className='text-3xl'> current page </a></li>
      <li><a>{currentPageName}</a></li>
      
    </ul>
  </div>
</div>
    </>
  )
}

export default Navbar