import React, { useEffect, useState } from 'react';
// import Charts3 from './Chart3';
// import Charts4 from './Chart4';
// import Charts6 from './Chart6';
// import Charts7 from './Chart7';
import BaseUrl from '../Constant';

const Dashboard = () => {
    const [hourSales, setHourSales] = useState([]);
    const [month, setMonthly] = useState([]);
    const [total, setTotal] = useState(0);

    const HourlySalesData = async () => {
        const response = await fetch(`${BaseUrl}/api/get/order/daily/salse`);
        const data = await response.json();
        if (data?.items) {
            const salesData = data.items.map((sa) => (
                { x: new Date(2024, 0, 1, sa?.h), y: sa?.sales || 0 }
            ));
            let total = 0;
            data.items.forEach((sa) => {
                total += sa?.sales;
            });
            setTotal(total);
            setHourSales(salesData);
        }
    };

    const MonthlySalesData = async () => {
        const response = await fetch(`${BaseUrl}/api/get/user/order/monthly`);
        const data = await response.json();
        if (data?.items) {
            const formattedData = data.items.map(item => ({
                x: new Date(item.x),
                y: item.y
            }));
            setMonthly(formattedData);
        }
    };

    useEffect(() => {
        HourlySalesData();
        MonthlySalesData();
    }, []);

    return (
        <div className="p-5">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="shadow-lg flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px]">
                    <div className="p-5 border rounded-full bg-[#FFF2E8]">
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-12 w-12' alt='Total Sale' />
                    </div>
                    <div className="flex justify-start items-end gap-1">
                        <h1 className="font-bold text-5xl">{total}.00</h1>
                        <p className="font-semibold text-lg">Total Sale</p>
                    </div>
                </div>

                <div className="shadow-lg flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px]">
                    <div className="p-5 border rounded-full bg-[#FFF2E8]">
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-12 w-12' alt='Customer Request' />
                    </div>
                    <div className="flex justify-start items-end gap-1">
                        <h1 className="font-bold text-5xl">2</h1>
                        <p className="font-semibold text-lg">Customer Request</p>
                    </div>
                </div>

                <div className="shadow-lg flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px]">
                    <div className="p-5 border rounded-full bg-[#FFF2E8]">
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-12 w-12' alt='Customer Complaints' />
                    </div>
                    <div className="flex justify-start items-end gap-1">
                        <h1 className="font-bold text-5xl">50</h1>
                        <p className="font-semibold text-lg">Customer Complaints</p>
                    </div>
                </div>

                <div className="shadow-lg flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px]">
                    <div className="p-5 border rounded-full bg-[#FFF2E8]">
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-12 w-12' alt='Notifications' />
                    </div>
                    <div className="flex justify-start items-end gap-1">
                        <h1 className="font-bold text-5xl">12</h1>
                        <p className="font-semibold text-lg">Notifications</p>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-5 lg:gap-7 pb-5">
                <div className="rounded-lg">
                    {/* <Charts3 hourSales={hourSales} /> */}
                </div>

                <div className="rounded-lg">
                    {/* <Charts7 month={month} /> */}
                </div>

                <div className="rounded-lg">
                    {/* <Charts6 /> */}
                </div>

                <div className="rounded-lg">
                    {/* <Charts4 /> */}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
