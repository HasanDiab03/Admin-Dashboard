import { Box, useTheme } from "@mui/material";
import { useGetUserPerformanceQuery } from "../../state/api";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
// import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";

const Performance = () => {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      sortable: false,
    },
  ];
  return (
    <Box margin={"1.5rem 2.5rem"}>
      <Header
        title={"Performance"}
        subTitle={"Track your affiliate sales performance here"}
      />
      <Box
        mt={"20px"}
        height={"70vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
            width: "10px",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <DataGrid
          rows={(data && data.sales) || []}
          columns={columns}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          //   components={{
          //     ColumnMenu: CustomColumnMenu,
          //   }}
        />
      </Box>
    </Box>
  );
};

export default Performance;
