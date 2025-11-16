import React, { useState, useEffect } from "react";
import {
  getCustomerReportPaginatedByCustomer,
  updateMessageReadStatus,
} from "../../api/customer/customer.service";
import { IPaginatedCustomerReports } from "../../models/paginated.customerReports.interface";
import { IReport } from "../../models/report.interface";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";
import { ButtonsWhite } from "../../Component/Buttons";
import { Paragraph2Green, Paragraph2Xl } from "../../Component/Paragraph";
import InfoModal from "../../Component/Modal/InfoModal";
import Loader from "../../Component/Loader";
import TicketForm from "../../Component/TicketForm";
import { Button } from "../../Component/Button";

type Props = {
  handleFormView: () => void;
};

const CustomerReports: React.FC<Props> = ({ handleFormView }) => {
  const customer = JSON.parse(
    sessionStorage.getItem("AUTH_USERDETAILS") || "{}"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [reportsData, setReportsData] = useState<IPaginatedCustomerReports>(
    {} as IPaginatedCustomerReports
  );
    const [ viewFormTicket, setViewFormTicket ] = useState<boolean>(false)
  const [viewForm, setViewForm] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [report, setReport] = useState<IReport>({} as IReport);
  const [viewMessage, setViewMessage] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getCustomerReportPaginatedByCustomer(
        customer.customerId,
        page
      );
      setReportsData(data.data.data);
      setLoading(false);
    })();
  }, [customer.customerId, page]);

  const handleViewMessage = async (x: IReport) => {
    setReport(x);
    setViewMessage(true);
    await updateMessageReadStatus(x.id);
  };

  if (loading) {
    return <Loader />;
  }



  return (
    <div className="mx-4 mt-3 font-Poppins">
      {/* Info Modal */}
      {viewMessage && (
        <InfoModal
          openModal={viewMessage}
          setOpenModal={() => setViewMessage(false)}
          header={report.subject}
          content={
            <div className="space-y-2 text-gray-700 text-lg leading-relaxed">
              <div>
                <p className="font-semibold">Message:</p>
                <p>{report.message}</p>
              </div>
              <div>
                <p className="font-semibold">Sent At:</p>
                <p>{new Date(report.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Sent By:</p>
                <p>
                  {report.customerFullname} - {report.customerEmail}
                </p>
              </div>
              <div>
                <p className="font-semibold">Apartment:</p>
                <p>
                  {report.apartmentTypeName} - {report.propertyAddress}
                </p>
              </div>
            </div>
          }
          buttonName="Reply"
          handleConfirm={() => {
            setViewMessage(false);
            setViewForm(true);
          }}
        />
      )}
      <Button onClick={()=>setViewFormTicket(!viewFormTicket)}>Create Ticket</Button>
{
  <TicketForm isOpen={viewFormTicket} handleOpen={()=>setViewFormTicket(!viewFormTicket)}/>
}
      {/* Reports Table */}
      {reportsData.data ? (
        <>
          <div className="flex justify-between items-center my-4">
            <Paragraph2Green content="Customer Reports" />
            <div>
            <ButtonsWhite name="Create Report" onClick={handleFormView} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table striped={true}>
              <TableHead className="bg-green text-white text-lg font-Poppins capitalize">
                <TableHeadCell className="w-32">Date</TableHeadCell>
                <TableHeadCell className="w-48">Name</TableHeadCell>
                <TableHeadCell>Subject</TableHeadCell>
              </TableHead>

              <TableBody className="text-black text-lg font-Poppins">
                {reportsData.data.map((item: IReport, index: number) => {
                  const readTextClass =
                    item.readStatus !== 0
                      ? "text-gray-500"
                      : "text-black font-semibold";

                  return (
                    <TableRow
                      key={index}
                      onClick={() => handleViewMessage(item)}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <TableCell className={readTextClass}>
                        {item.dateSent}
                      </TableCell>
                      <TableCell className={readTextClass}>
                        {item.customerFullname}
                      </TableCell>
                      <TableCell className={readTextClass}>
                        {item.subject}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center my-10">
            <div className="flex items-center gap-4">
              <button
                className="text-green font-bold"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <div className="flex gap-2">
                {Array.from({
                  length: Math.ceil(reportsData.total / reportsData.per_page),
                }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded ${
                      page === index + 1
                        ? "bg-green text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                className="text-green font-bold"
                onClick={() => setPage(page + 1)}
                disabled={
                  page >= Math.ceil(reportsData.total / reportsData.per_page)
                }
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-2xl text-gray-500">
          <Paragraph2Xl content="No Tickets from Customers" />
        </div>
      )}
    </div>
  );
};

export default CustomerReports;
