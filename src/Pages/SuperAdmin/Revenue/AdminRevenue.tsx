import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import AdminCard from '../../../Component/Card/AdminCard';
import { Paragraph2XlGreenMargin } from '../../../Component/Paragraph';
import FirstChart from '../../../Component/Charts/FirstChart';
import FirstPieChart from '../../../Component/Charts/FirstPieChart';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Component/Loader';
import { Naira } from '../../../utils/format';


const AdminRevenue = () => {

    const admin = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS") || "{}");
    console.log(admin);
    const { data: revenue, isLoading  } = useQuery({
        queryKey: ['admin-revenue', admin.userId],
        queryFn: async () => {
            const res = await getAdminRevenue(admin.userId);
            console.log(res.data.data)
            return res.data.data;
        }
    });
    const totalAmount = revenue ? revenue.map(item => item.totalAmount).reduce((acc, curr) => acc + curr, 0) : 0;
    if (isLoading) {
        return <Loader />;
    }
    return (
        <main className='px-4'>
            <div className="flex justify-end">
                <div className="max-w-md">
                    <select id="countries" className='border-green rounded-md ring-green text-green focus:ring-green focus:border-green focus:outline-none'>
                        <option>Monthly</option>
                        <option>Weekly</option>
                        <option>Yearly</option>

                    </select>
                </div>
            </div>
            <div className="my-5">
                <AdminCard heading={"Total Current Revenue"} amount={Naira.format(totalAmount)} icon={undefined} />
            </div>
            <div className="my-5 flex flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-[65%]">
                    <FirstChart revenue={revenue} />
                </div>
                <div className="w-full mt-5 lg:mt-0 lg:w-[30%]">
                    <FirstPieChart />
                </div>
            </div>

            <div className="my-5 bg-lightBackground py-5 rounded-3xl shadow-2xl">
                <Paragraph2XlGreenMargin content={"Revenue History"} />
                <div className="overflow-x-auto font-Poppins mt-3">
                    <Table striped >
                        <TableHead className=" font-Poppins text-sm capitalize text-white bg-green dark:text-white">
                            <TableHeadCell>Month, Year</TableHeadCell>
                            <TableHeadCell>Total Bill Amount</TableHeadCell>
                            <TableHeadCell>Total Discount Amount</TableHeadCell>
                            <TableHeadCell>Total Paid Amount</TableHeadCell>

                        </TableHead>
                                       <TableBody className="divide-y font-Poppins " >
                        {revenue && revenue.map((x, key) =>{
             
                                return <TableRow key={key} className={`${key % 2 === 0 ? 'bg-white' : 'odd:bg-tableBackground'}`}>

                                <TableCell>{x.monthWord+",  "+x.year}</TableCell>

                                <TableCell>{Naira.format(x.totalBillAmount || 0.00)}</TableCell>
                                <TableCell>{Naira.format(x.totalDiscountAmount || 0.00)}</TableCell>
                                <TableCell>{Naira.format(x.totalPaidAmount || 0.00)}</TableCell>


                            </TableRow>})
}
                        
                        
                        </TableBody>

                    </Table>
                </div>
            </div>
        </main>
    )
}

export default AdminRevenue;