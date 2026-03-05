import FirstChart from '../../../Component/Charts/FirstChart';
import FirstPieChart from '../../../Component/Charts/FirstPieChart';
import { useQuery } from '@tanstack/react-query';
import { getOperatorRevenue, getPspOperatorDashboard } from '../../../api/psp-operator/psp-operator.service';
import { IOperator } from '../../../models/operator.interface';
import Loader from '../../../Component/Loader';
import { Naira } from '../../../utils/format';
import { TbCurrencyNaira } from 'react-icons/tb';


const RevenueIndex = () => {

    const operator:IOperator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS") || "{}");
    console.log(operator);
    const { data: revenue, isLoading  } = useQuery({
        queryKey: ['operator-revenue', operator.id],
        queryFn: async () => {
            const res = await getOperatorRevenue(operator.id);
            console.log(res.data.data)
            return res.data.data;
        }
    });

      const { data: dash } = useQuery({
        queryKey: ["pspOperatorDashboard", operator.id],
        queryFn: async () => {
          const data = await getPspOperatorDashboard(operator.id);
          console.log(data.data.data)
          return data.data.data;
        }
      });
    // const totalAmount = revenue ? revenue.map(item => item.totalAmount).reduce((acc, curr) => acc + curr, 0) : 0;
    if (isLoading) {
        return <Loader />;
    }
    return (
    <div className="flex flex-col gap-4 p-4">
      <div>
          <h3 className="font-semibold text-xl leading-[40px] tracking-[0] my-0">Revenue Updated Report</h3>
        <p className="text-gray-500 text-lg my-0">{"Here's what's happening with your waste management account."}</p>

      </div>
    
            <div className="my-5 flex flex-col md:flex-row gap-4 rounded-xl p-4  lg:flex-row justify-between">
           
                <div className="border border-1 border-gray-200 p-4 rounded-md">
                       <h2 className='text-2xl font-semibold'>Revenue Summary</h2>
                            <div className=" border border-1 border-gray-200 rounded-md my-2 p-2">
          <div className="flex flex-row justify-between">
            <div>
              <p className="font-semibold flexjustify-between text-gray-500"><span>Total Revenue</span></p>
        <p className="font-semibold text-2xl text-black py-2">{Naira.format(parseFloat(dash.totalRevenue))}</p>

            </div>

            <span className="bg-primary/10 flex items-center justify-center text-primary p-4 rounded-lg text-2xl"><TbCurrencyNaira /></span>
          </div>
                {/* <h3 className="flex justify-between"><NavLink to="/transactions" className="text-primary hover:bg-primary/70 hover:text-white p-1 text-sm rounded-md ">{"View Transactions"}</NavLink><span className="rounded-lg bg-red-200 p-1 text-sm text-red-700">Overdue</span></h3> */}

            </div>
             
                    <FirstPieChart revenue={dash.totalRevenue} overdue={dash.totalOverDuePayment} />
                </div>
                <div className="w-full lg:w-[65%]">
                    <FirstChart revenue={revenue} />
                </div>
    
            </div>
   

    <div className="my-5 border border-1 border-gray-200 p-4 rounded-md py-5 rounded-3xl">
                <h2 className='text-2xl font-semibold'>Revenue History</h2>

                
                        {/* Desktop Table View */}
                        <div className=" overflow-x rounded-xl border border-gray-200 m-4 overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-300/50">
                              <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date, Year</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Bill Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Dicount Amount</th> 
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Paid Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Overdue Amount</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                              {revenue && revenue.map((activity) => (
                                <tr key={activity.id} className="hover:bg-gray-50/50 transition-colors">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-secondary">{activity.monthWord+","+activity.year}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{Naira.format(parseFloat(activity.totalAmount))}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Naira.format(parseFloat(activity.totalBillAmount))}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Naira.format(parseFloat(activity.totalDiscountAmount))}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Naira.format(parseFloat(activity.TotalPaidAmount))}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Naira.format(parseFloat(activity.TotalNotPaidAmount))}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

            </div>
        </div>
    )
}

export default RevenueIndex