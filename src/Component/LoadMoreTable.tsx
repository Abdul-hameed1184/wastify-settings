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

type LoadMoreTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  total: number;
  loaded: number;
  loadMore: () => void;
  striped?: boolean;
  emptyMessage?: string;
};

export function LoadMoreTable<T>({
  columns,
  data,
  total,
  loaded,
  loadMore,
  striped = true,
  emptyMessage = "No Recent transactions.",
}: LoadMoreTableProps<T>) {
  const hasMore = loaded < total;

  return (
    <div className="space-y-6">
      {/* Table */}
      <Table striped={striped}>
        <TableHead className="font-Poppins text-xl capitalize text-white bg-slate-900 dark:text-white">
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

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center py-6">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-green text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
