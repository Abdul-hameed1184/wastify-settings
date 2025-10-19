import { Button } from "../../../Component/Button"
import { useState } from "react";
import { TicketPaginatedTable } from "../../../Component/TicketPaginatedTable";
import {  Checkbox } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { getAllTickets, getTicketsByOperator } from "../../../api/tickets/tickets.service";
import { IoArrowBack, IoArrowForwardOutline } from "react-icons/io5";
import StatusBadge from "../../../utils/StatusBadge";

const ticketsData = [
  {
    id: "TIG-001",
    subject: "Critical Authentication Vulnerability",
    assignee: "Oliva Ryan",
    category: "Security",
    priority: "Critical",
    status: "Open",
  },
  {
    id: "TIG-002",
    subject: "Search Functionality Broken",
    assignee: "Oliva Ryan",
    category: "Frontend",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "TIG-003",
    subject: "Dashboard Loading Performance",
    assignee: "Oliva Ryan",
    category: "Backend",
    priority: "Medium",
    status: "Resolved",
  },
  {
    id: "TIG-004",
    subject: "API Rate Limiting Issue",
    assignee: "Oliva Ryan",
    category: "Backend",
    priority: "High",
    status: "Open",
  },
];



const statusColors = {
  Open: "bg-red-500/20 text-red-400",
  "In Progress": "bg-blue-500/20 text-blue-400",
  Resolved: "bg-green-500/20 text-green-400",
  Closed: "bg-black text-white" 
};
const priorityColors = {
  Critical: "text-red-400",
  High: "text-orange-400",
  Medium: "text-yellow-400",
  Low: "text-green-400",
};
export const Tickets = () => {
    const operator = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS")||"");
    const { data:tickets, isLoading } = useQuery({
        queryKey: ['tickets'],
          queryFn: async () => {
         const data =  await getTicketsByOperator(operator.id);
         console.log(data)
         return data.data.data;
          }
    })
    const [selected, setSelected] = useState([]);
    const [ page, setPage] = useState<number>(1)

  const toggleSelect = (id) => {
      console.log(id)
  };

  const allSelected = selected.length === ticketsData.length;
    return (
         <div className="flex h-screen bg-white text-black">

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Tickets</h1>
            <p className="text-slate font-semibold text-2xl">
              Tickets
            </p>
          </div>
          {/* <div className="flex gap-2">
            <Button variant="primary" className="border-gray-700 text-gray-300">
              Export Ticket
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
                 New Ticket
            </Button>
          </div> */}
        </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="primary"
                  className="text-gray-400 hover:text-white"
                >
                  All
                </Button>
                <Button size="sm" variant="primary" className="text-gray-400">
                  Resolved
                </Button>
                <Button size="sm" variant="primary" className="text-gray-400">
                  Open
                </Button>
                <Button size="sm" variant="primary" className="text-gray-400">
                  In Progress
                </Button>
              </div>
              {/* <Button
                variant="primary"
                className="text-gray-400 hover:text-white"
              >
                filter
              </Button> */}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-lg ">
                <thead className="border-b border-gray-800 text-gray-400 hover:text-white hover:bg-green">
                  <tr>

                    <th className="py-2 px-2 text-left">S/N</th>
                                <th className="py-2 px-2 text-left">Subject</th>
                    <th className="py-2 px-2 text-left">Customer Name</th>
                    <th className="py-2 px-2 text-left">Customer Phone</th>
                    <th className="py-2 px-2 text-left">Priority</th>
                    <th className="py-2 px-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets && tickets.data.map((ticket, index) => (
                    <tr
                      key={ticket.id}
                      className="rounded-md bg-white hover:bg-green hover:text-white shadow-md mt-4"
                    >
                      {/* <td className="py-2 px-2"> */}
                        {/* <Checkbox
                          checked={selected.includes(ticket.id)} */}
                        {/* onCheckedChange={() => toggleSelect(ticket.id)}
                        /> */}
                      {/* </td> */}
                      <td className="py-2 px-2 text-gray-300">{index+1}</td>
                                 <td className="py-2 px-2 text-gray-300">
                        {ticket.subject}
                      </td>
                               <td className="py-2 px-2 text-gray-300">
                        {ticket.customerFullname}
                      </td>
           
             
                                    <td className="py-2 px-2 text-gray-300">
                        {ticket.customerPhone}
                      </td>
                      <td
                        className={`py-2 px-2 font-semibold ${
                          priorityColors[ticket.priority]
                        }`}
                      >
                        {ticket.priority}
                      </td>
                      <td className="py-2 px-2">
                        <StatusBadge status={ticket.status} />
                     
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bulk delete and pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                {selected.length > 0 && (
                  <>
                    <span className="text-sm text-gray-400">
                      {selected.length} selected
                    </span>
                    <Button
                      size="sm"
                      variant="primary"
                      className="bg-red-600 hover:bg-red-700"
                    >
                            Delete
                    </Button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Button  variant="primary">
                                  <IoArrowBack className="text-white" />
   
                </Button>
                <span className="text-sm">Page 1 of 5</span>
                <Button  variant="primary">
                               <IoArrowForwardOutline  className="text-white"/>
                </Button>
              </div>
            </div>

      </main>
    </div>
    )
}