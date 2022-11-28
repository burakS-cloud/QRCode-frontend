import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "qrCode_ID",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Video_ID",
    accessor: "video_ID",
    sticky: "left",
  },
  {
    Header: "Video_URL",
    accessor: "video_URL",
    sticky: "left",
  },
  {
    Header: "Content Type",
    accessor: "contentType",
    sticky: "left",
  },
  {
    Header: "User Email",
    accessor: "user_email",
    sticky: "left",
  },
  {
    Header: "User Name",
    accessor: "user_name",
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
