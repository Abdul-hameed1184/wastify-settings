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

const Wastebills = () => {
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
            className="bg-green text-white rounded-2xl"
          />
        </Link>
      </div>
      <div className="m-4">
        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-white">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-2xl font-bold leading-5 font-Poppins",
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
                  "w-full py-2.5 text-2xl font-bold leading-5 font-Poppins",
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
    </main>
  );
};

export default Wastebills;
