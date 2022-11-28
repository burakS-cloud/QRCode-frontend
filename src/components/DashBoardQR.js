import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import { COLUMNS } from "./EmptyQRCodeColumns";
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

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    const requestQR = async () => {
      const res = await axios.get(`http://localhost:3001/api/getQRCodes`, {
        headers: { "Content-Type": "application/json" },
      });
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

  let qrCodeIDs = QRCodes.map((item) => item.qrCode_ID);
  // console.log(qrCodeIDs);

  let dummyArr = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12];

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
    rows,
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

  let isButtonClicked = () => {
    if (
      window.confirm(
        "Are you sure you want to save this thing into the database?"
      )
    ) {
      // Save it!
      console.log("Thing was saved to the database.");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;
  let selectedFlatRowsIds = selectedFlatRows?.map((item) => +item?.id + 1);
  // console.log("selectedFlatRowIds:", selectedFlatRowsIds);
  // console.log(
  //   "result of button of id 1 is clicked:",
  //   selectedFlatRowsIds.includes(1)
  // );

  console.log("selectedFlatRows:", selectedFlatRows);
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
