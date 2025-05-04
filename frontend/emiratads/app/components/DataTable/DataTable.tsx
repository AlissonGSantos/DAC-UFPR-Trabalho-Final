"use client";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import Button, { ButtonProps } from "../Button/Button";
import { CaretLeft, CaretRight } from "phosphor-react";
import { robotoFont } from "@/app/assets/fontsSetup";
import Input from "../Input/Input";
import useDataTable from "./useDataTable";

export interface DataTableProps {
  data: any[];
  columns: ColumnDef<any>[];
  controls?: ButtonProps[] | ((data: any) => ButtonProps[]);
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, controls }) => {
  const { currentData, handleSearch } = useDataTable({ data });
  const table = useReactTable({
    getRowId: (row) => row.id,
    data: currentData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={`p-4 ${robotoFont.className}`}>
      <div className="flex items-center justify-end mb-4">
        <div className="min-w-50">
          <Input
            type={"search"}
            placeholder="Pesquisar:"
            label={""}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full border-indigo-950 bg-slate-950 border-2">
        <thead className="bg-slate-950 text-slate-300">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 text-left">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={` odd:bg-slate-900 even:bg-slate-800 ${robotoFont.className} text-slate-300`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                {controls &&
                  (typeof controls === "function"
                    ? controls(currentData[row.index])
                    : controls
                  ).map((control, index) => (
                    <td
                      key={`controls-${control.text ?? index}`}
                      className="p-2"
                    >
                      <Button
                        {...control}
                        onClick={() => {
                          if (control.onClick) {
                            control.onClick(currentData[row.index]);
                          }
                        }}
                      >
                        {control.children}
                      </Button>
                    </td>
                  ))}
              </tr>
            ))
          ) : (
            <tr className=" bg-slate-700">
              <td
                colSpan={columns.length + (controls ? 1 : 0)}
                className="text-center p-4 text-slate-300"
              >
                Nenhum dado disponível.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-end text-white gap-4 mt-4">
        <Button
          type={"SECONDARY"}
          size="SMALL"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <CaretLeft />
        </Button>
        <span className={`text-sm font-bold`}>
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <Button
          type={"SECONDARY"}
          size="SMALL"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <CaretRight />
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
