import React from "react";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";

type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
};

type PaginatedTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  total: number;
  perPage: number;
  page: number;
  setPage: (page: number) => void;
  striped?: boolean;
  emptyMessage?: string;
};

export function PaginatedTable<T>({
  columns,
  data,
  total,
  perPage,
  page,
  setPage,
  striped = true,
  emptyMessage = "No records found.",
}: PaginatedTableProps<T>) {
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="space-y-6 overflow-x-auto">
      {/* Table */}
      <Table striped={striped}>
        <TableHead className="font-Poppins text-xl capitalize text-white bg-slate-900 dark:text-white">
          <TableHeadCell>S/N</TableHeadCell>
          {columns.map((col, idx) => (
            <TableHeadCell key={idx} className={col.className}>
              {col.header}
            </TableHeadCell>
          ))}
        </TableHead>

        <TableBody className="divide-y font-Poppins text-xl">
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={
                  rowIndex % 2 === 0
                    ? "odd:bg-tableBackground"
                    : "bg-white dark:border-gray-700 dark:bg-gray-800"
                }
              >
                <TableCell>{rowIndex+1}</TableCell>
                {columns.map((col, colIndex) => {
                  const value =
                    typeof col.accessor === "function"
                      ? col.accessor(item)
                      : (item[col.accessor] as React.ReactNode);

                  return (
                    <TableCell key={colIndex} className={col.className}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-6 py-4 text-center text-gray-500"
              >
                <h2 className="text-lg font-semibold">{emptyMessage}</h2>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center h-20 w-full">
          <div className="flex items-center gap-6">
            {/* Previous */}
            <button
              className="text-green font-bold disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>

            {/* Page numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center rounded ${
                    page === index + 1
                      ? "bg-green text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              className="text-green font-bold disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}