import moment from "moment";
import { Button } from "@mui/material";

const incomeColumns = ({ deleteIncome, deleteExpense, flag }) => [
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
  {
    field: "id",
    headerName: "Action",
    flex: 1,
    renderCell: (id) => {
      return (
        <Button
          variant="contained"
          onClick={() => {
            if (flag == "income") {
              deleteIncome(id.id);
            } else deleteExpense(id.id);
          }}
        >
          Delete
        </Button>
      );
    },
  },
];

const dateFormat = (date) => {
  return moment(date).format("DD MMM YYYY");
};

export default incomeColumns;
