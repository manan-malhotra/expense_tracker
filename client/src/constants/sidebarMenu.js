import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export const sidebarMenu = [
  {
    title: "Dashboard",
    icon: HomeOutlinedIcon,
    path: "/",
  },
  {
    title: "Info",
    tag: "divider",
  },
  {
    title: "Transaction History",
    icon: ReceiptIcon,
    path: "/transactionHistory",
  },
  {
    title: "Income",
    icon: ContactsOutlinedIcon,
    path: "/income",
  },
  {
    title: "Expenses",
    icon: ReceiptOutlinedIcon,
    path: "/expenses",
  },
];
