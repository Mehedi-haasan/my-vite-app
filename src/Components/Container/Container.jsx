import React, { useEffect, useState } from 'react';
import data from './Data.json';
import { NavLink } from 'react-router-dom';
import { Icon } from "@iconify/react";
import Logo from '../../assets/userProfile.png';
import BaseUrl from '../Constant';

const Container = ({ children, isLoggedOut }) => {

    const [userInfo, setUserInfo] = useState({})

    const GetUserInfo = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/single/users`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        setUserInfo(data?.items);
    }

    useEffect(() => {
        GetUserInfo()
    }, [])

    return (
        <div className='flex bg-gray-100 min-h-screen'>
            {/* Sidebar */}
            <div className='bg-white border-r-[1px] w-[350px] sticky top-14 shadow-xl rounded-lg'>
                <div className='p-6 h-screen overflow-y-auto'>
                    {/* Profile Section */}
                    <div className='flex justify-start gap-3 items-center pb-6 border-b-2'>
                        <div className='relative'>
                            <img 
                                src={Logo} 
                                className='h-[75px] w-[75px] rounded-full border-2 border-blue-500' 
                                alt='Profile' 
                            />
                            <div className='absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1'>
                                <Icon icon="material-symbols:edit" width="15px" />
                            </div>
                        </div>
                        <div className='text-left'>
                            <h1 className='text-2xl font-semibold text-gray-700'>{userInfo?.first_name} {userInfo?.last_name}</h1>
                            <NavLink to={``} className='text-blue-500 underline hover:text-blue-600'>View Profile</NavLink>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className='pt-6'>
                        {data.map((item, index) => (
                            <NavLink 
                                key={index} 
                                to={`/${item.route}`} 
                                className='flex font-semibold w-full text-lg hover:bg-gray-200 rounded-lg justify-start items-center gap-3 p-3 my-2 transition-colors duration-300'
                            >
                                <Icon icon={item.icon} width='22px' className="text-gray-600" />
                                <span className='text-gray-700'>{item.name}</span>
                            </NavLink>
                        ))}

                        {/* Logout Button */}
                        <NavLink 
                            to={`/`} 
                            onClick={() => { localStorage.setItem('token', ''); isLoggedOut() }} 
                            className='font-semibold w-full text-lg hover:bg-gray-200 rounded-lg flex justify-start items-center gap-3 p-3 mt-4 text-red-600 transition-colors duration-300'
                        >
                            <Icon icon={"uiw:logout"} width='22px' />
                            {'Logout'}
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 bg-gray-100 overflow-y-auto pl-6 pt-6'>
                {children}
            </div>
        </div>
    );
};

export default Container;
