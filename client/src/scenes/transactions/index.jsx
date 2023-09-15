import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionQuery } from "../../state/api";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();
  //values to send to the backend
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      sortable: false,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
      sortable: false,
    },
    {
      field: "products",
      headerName: "# of products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      sortable: false,
    },
  ];

  return (
    <Box margin={"1.5rem 2.5rem"}>
      <Header title={"Transactions"} subTitle={"Entire List of transactions"} />
      <Box
        height={"75vh"}
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
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          columns={columns}
          paginationMode="server"
          sortingMode="server"
          initialState={{
            pagination: { paginationModel: paginationModel },
          }}
          onPaginationModelChange={setPaginationModel}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
