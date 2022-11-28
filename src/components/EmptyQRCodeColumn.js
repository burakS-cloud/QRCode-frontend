import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "qrCode_ID",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "DB_ID",
    accessor: "_id",
    sticky: "left",
  },

  {
    Header: "Creation Date",
    accessor: "createdAt",
    // Cell: ({ value }) => {
    //   return format(new Date(value), "dd/MM/yyyy");
    // },
  },
];
