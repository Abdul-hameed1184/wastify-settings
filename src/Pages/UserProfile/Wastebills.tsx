import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import CurrentBill from "../../Component/Card/CurrentBill";
import axios from "axios";
import baseURL from "../../utils/apiConfig";

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(" ");
}

const Wastebills:React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("current");

  const customer = JSON.parse(sessionStorage.getItem("AUTH_USERDETAILS")||"");
  console.log("customerWaste", customer);

  const FetchBills = () => {
    axios
      .get(baseURL + "billSetup/" + customer.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem(
            "SESSION_AUTH_TOKEN"
          )}`,
        },
      })
      .then((res) => {
        const responseData = res;
        console.log("resD", responseData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    FetchBills();
  });
  return (
    <main>
      <div className="flex justify-start mt-10 ml-6">
        <Link to="/profile">
          <IoChevronBack
            size={28}
            className="bg-green text-white rounded-xl"
          />
        </Link>
      </div>
      <div className="m-4">
        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-white">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-lg font-bold leading-5 font-Poppins",
                  "focus:outline-none focus:ring-0",
                  selected
                    ? "border-green border-b-2 text-green"
                    : "text-lightgrayer"
                )
              }
              onClick={() => setActiveTab("current")}
            >
              Current Bill
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-lg font-bold leading-5 font-Poppins",
                  "focus:outline-none focus:ring-0",
                  selected
                    ? "border-green border-b-2 text-green"
                    : "text-lightgrayer"
                )
              }
              onClick={() => setActiveTab("overdue")}
            >
              Overdue Bill
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <CurrentBill />
              <CurrentBill />
              <CurrentBill />
              <CurrentBill />
              <CurrentBill />
              <CurrentBill />
              <CurrentBill />
              <CurrentBill />
            </Tab.Panel>

            <Tab.Panel>
              <CurrentBill />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <div className="overflow-x-auto">
      <table className="min-w-full bg-white p-2 m-2 border rounded-lg">
        <thead>
          <tr className="bg-green text-white p-2 m-2">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Bill Period</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "December 2023", amount: "68000", status: "Current" },
            { name: "Jan 2024", amount: "45000", status: "Overdue" },
            { name: "Feb 2024", amount: "34000", status: "Editor" },
            { name: "December 2023", amount: "68000", status: "Current" },
            { name: "Jan 2024", amount: "45000", status: "Overdue" },
            { name: "Feb 2024", amount: "34000", status: "Editor" }
          ].map((user, index) => (
            <tr key={index} className="hover:bg-gray-50 p-2 m-2 shadow-lg">
              <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{user.amount}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{user.status}</td>
              <td className="px-6 py-4 text-sm">
                <button className="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
                <button className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </main>
  );
};

export default Wastebills;
