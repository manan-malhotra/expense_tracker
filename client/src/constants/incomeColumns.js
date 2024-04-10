import moment from "moment";

const incomeColumns = [
  { field: "title", headerName: "Title" },
  {
    field: "amount",
    headerName: "Amount",
    cellClassName: "name-column--cell",
  },
  {
    field: "date",
    headerName: "Date",
    type: "Date",
    headerAlign: "left",
    flex: 1,
    align: "left",
    renderCell: ({ row: { date } }) => {
      return dateFormat(date);
    },
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
  },
];

const dateFormat = (date) => {
  return moment(date).format("DD MMM YYYY");
};

export default incomeColumns;
