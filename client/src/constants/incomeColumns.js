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
    type: "number",
    headerAlign: "left",
    flex: 1,
    align: "left",
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

export default incomeColumns;
