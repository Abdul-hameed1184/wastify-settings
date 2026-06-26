import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTickets, postComment } from "../../api/tickets/tickets.service";
import StatusBadge from "../../utils/StatusBadge";
import { useState } from "react";
import { Button } from "../../Component/Button";
import { toast } from "react-toastify";
import Loader from "../../Component/Loader";

export const AdminTickets = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [commentText, setCommentText] = useState("");
  const queryClient = useQueryClient();
  const admin = JSON.parse(sessionStorage.getItem("AUTH_ADMIN_DETAILS") || "{}") || {};


  const params = {
    page: page,
    perPage: 10,
  };

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["tickets", page],
    queryFn: async () => {
      const data = await getAllTickets(params);
      return data;
    },
  });

  const ticketList = tickets?.data?.data?.data || [];
  const pagination = tickets?.data?.data || {};

  const handleSelectTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setCommentText("");
  };

  const handleSubmitComment = async () => {
    if (!selectedTicket || !commentText.trim()) return;

    try {
      await postComment({
        userId: admin?.userId,
        ticketId: selectedTicket.id,
        comment: commentText.trim(),
      });
      toast.success("Comment submitted successfully.");
      setCommentText("");
      queryClient.invalidateQueries({queryKey: ["tickets"]});
    } catch (error) {
      console.error(error);
      toast.error("Unable to post comment. Please try again.");
    }
  };

  if(isLoading){
    return <Loader />
  }

  return (
    <div className="flex min-h-screen bg-white text-black">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Tickets</h1>
          <p className="text-sm text-slate-500">Select a ticket to read it and add comments.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1.4fr]">
          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">S/N</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {ticketList.map((item: any, index: number) => (
                    <tr
                      key={item.id || index}
                      onClick={() => handleSelectTicket(item)}
                      className={`cursor-pointer transition-colors ${selectedTicket?.id === item.id ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(page - 1) * (pagination.per_page || 10) + index + 1}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                        {item.customerFullname || item.firstname || "Unknown"} {item.lastname || ""}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-600">{item.customerPhone || item.customerEmail || "-"}</td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-600">{item.subject || item.title || "No subject"}</td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm p-2">
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 px-6 py-4 border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Page {page} of {Math.max(1, Math.ceil((pagination.total || 0) / (pagination.per_page || 10)))}
                <span className="ml-2 text-gray-400">({pagination.total || 0} total)</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page >= Math.max(1, Math.ceil((pagination.total || 0) / (pagination.per_page || 10)))}
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-green text-white hover:bg-green/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 min-h-[360px]">
            {selectedTicket ? (
              <div className="flex h-full flex-col">
                <div className="mb-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-gray-400">Ticket ID</p>
                      <h2 className="text-xl font-semibold text-slate-900">{selectedTicket.id}</h2>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {selectedTicket.status || selectedTicket.ticket_status || "Open"}
                    </span>
                  </div>
                  <p className="mt-4 font-bold ">{selectedTicket.subject || selectedTicket.title || "No subject provided."}</p>
                </div>

                <div className="grid gap-3 text-sm text-gray-600 mb-6">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase font-bold mb-2">Customer</p>
                    <p>{selectedTicket.customerFullname || ""}  - {selectedTicket.customerPhone}</p>
                    <p className="text-xs text-slate-500">{selectedTicket.customerEmail  || "No contact"}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase font-bold text-slate-400 mb-2">Content</p>
                    <p>{ selectedTicket.content  || "No details available."}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900">Comments</h3>
                    <span className="text-xs text-gray-500">{(selectedTicket.comments?.length || 0)} entries</span>
                  </div>
                  <div className="max-h-[240px] overflow-y-auto space-y-3 pr-2">
                    {selectedTicket.comments?.length > 0 ? (
                      selectedTicket.comments.map((comment: any, index: number) => (
                        <div key={comment.id || index} className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
                          <div className="flex items-center justify-between gap-2 mb-2 text-xs text-gray-500">
                            <span>{comment.author || comment.user || comment.userFullname || "Support"}</span>
                            <span>{comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ""}</span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.comment || comment.message || comment.body || "-"}</p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-dashed border-gray-300 bg-slate-50 p-6 text-center text-sm text-gray-500">
                        No comments yet. Add the first comment below.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={4}
                    className="w-full rounded-2xl border border-gray-200 p-4 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
                    placeholder="Write a comment..."
                  />
                  <div className="mt-3 flex justify-end">
                    <Button
                      onClick={handleSubmitComment}
                      disabled={!commentText.trim()}
                      className="px-6 py-2.5 bg-primary text-white rounded-xl shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-slate-50 p-8 text-center text-gray-600">
                <p className="text-lg font-semibold text-slate-800">Select a ticket to read it</p>
                <p className="mt-2 text-sm">Click any row in the table to open the detail pane and add comments.</p>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
