import { Box, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "../../state/api";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
// import CustomColumnMenu from "../../components/DataGridCustomColumnMenu";

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];
  return (
    <Box margin={"1.5rem 2.5rem"}>
      <Header
        title={"Admins"}
        subTitle={"Managing admins and list of admins"}
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
          rows={data || []}
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

export default Admin;
