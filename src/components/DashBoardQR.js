import React, { useEffect, useState, useMemo, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import { COLUMNS } from "./EmptyQRCodeColumn";
import { GlobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";
import { Checkbox } from "./Checkbox";

import "./table.css";

const DashBoardQR = () => {
  const [QRCodes, setQRCodes] = useState([]);
  const [qrCodeIDS, setQrCodeIDS] = useState([]);

  let navigate = useNavigate();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const customHandlePrint = () => {
    componentRef.current.style.display = "block";
    handlePrint();
    componentRef.current.style.display = "none";
  };

  useEffect(() => {
    const requestQR = async () => {
      const res = await axios.get(
        `https://qrcode-app.adaptable.app/api/getQRCodes`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data) {
        console.log(res.data);
        setQRCodes(res.data.codes);
        setQrCodeIDS(res.data.codesIDS);
      } else {
        console.log("couldnt fetch qrcodes");
      }
    };
    requestQR();
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => QRCodes, [QRCodes]);
  const IDS = useMemo(() => qrCodeIDS, [qrCodeIDS]);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    selectedFlatRows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      IDS,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <Checkbox {...getToggleAllPageRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {/* <Checkbox {...row.getToggleRowSelectedProps()} /> */}
              <button
                onClick={() => navigate("/dashboard/qrcodes/deleteQR")}
                style={{
                  background: "red",
                  color: "white",
                  padding: ".25rem .5rem",
                  borderRadius: "10%",
                  border: "none",
                }}
              >
                Delete
              </button>

              {/* <button
                  onClick={customHandlePrint}
                  style={{
                    background: "turquoise",
                    color: "white",
                    padding: ".25rem .5rem",
                    borderRadius: "10%",
                    border: "none",
                  }}
                >
                  Print
                </button> */}
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      style={{ textAlign: "center" }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[4, 8, 10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <button onClick={customHandlePrint} className="print__button">
        {" "}
        Print{" "}
      </button>

      <div style={{ display: "none" }} ref={componentRef}>
        {selectedFlatRows?.length > 0
          ? selectedFlatRows?.map((row) => {
              let srcToPass = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=http://localhost:3000/record/${row.original._id}`;
              return (
                <>
                  <div
                    style={{
                      display: "inline-block",
                      marginTop: "1em",
                      marginLeft: ".75em",
                      position: "relative",
                    }}
                  >
                    <img
                      style={{
                        margin: ".25em",
                        border: "5px solid black",
                        padding: ".5rem .5rem 4rem .5rem",
                      }}
                      alt="qrcode"
                      src={srcToPass}
                      key={row.original.qrCode_ID}
                    ></img>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        position: "absolute",
                        top: "80%",
                        left: "6%",
                      }}
                    >
                      QR Code Number:
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        position: "absolute",
                        top: "77%",
                        left: "75%",
                      }}
                    >
                      {row.original.qrCode_ID}
                    </span>
                  </div>
                </>
              );
            })
          : ""}
      </div>

      {/* <pre>
          <code>
            {JSON.stringify(
              {
                selectedFlatRows: selectedFlatRows.map((row) => row.original),
              },
              null,
              2
            )}
          </code>
        </pre> */}
    </>
  );
};

export default DashBoardQR;
