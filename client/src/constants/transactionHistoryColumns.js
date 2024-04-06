import moment from "moment";
import { Box, Typography } from "@mui/material";
const transactionHistoryColumns = (colors) => {
    return [
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
            field: "type",
            headerName: "Type",
            flex: 1,
            renderCell: ({ row: { type } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            type === "income"
                                ? colors.greenAccent[600]
                                : type === "expense"
                                ? colors.redAccent[700]
                                : colors.redAccent[700]
                        }
                        borderRadius="4px"
                    >
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {type.toUpperCase()}
                        </Typography>
                    </Box>
                );
            },
        },
    ];
};
const dateFormat = (date) => {
    return moment(date).format("DD MMM YYYY");
};
export default transactionHistoryColumns;
