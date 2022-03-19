import { useEffect, useState } from 'react';
import API from '../Api';
import { Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import moment from 'moment';
import TableControls from './TableControls';
import { styled } from '@mui/system';

const MyDataGrid = styled(DataGrid)({
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
        outline: 'none !important'
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader': {
        outline: 'none !important'
    }
});

const StockList = () => {


    const [data, setData] = useState([]);

    const deleteStockEntryFromState = id => {
        let newData = data.filter(e => e.id !== id);
        setData(newData);
    }

    useEffect(async () => {
        let stockList = await API.getStockList();
        setData(stockList.data)
    }, []);

    const columns = [
        { field: 'id', headerName: '#', flex: 0, headerAlign: 'center', align: 'center' },
        { field: 'product_name', headerName: 'Product', flex: 2, headerAlign: 'center', align: 'center' },
        { field: 'quantity', headerName: 'Quantity', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'cost_price', headerName: 'Cost Price', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'sale_price', headerName: 'Sale Price', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'profit', headerName: 'Profit', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'expiry_date', headerName: 'Expiry Date', flex: 1, headerAlign: 'center', align: 'center' },
        {
            field: 'action',
            headerName: 'Action',
            flex: 2,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => <TableControls
                id={params.value.props.id}
                deleteEntry={params.value.props.deleteEntry}
            />
        },
    ];
    const rows = data.map(({ id, cost_price, sale_price, product_name, quantity, expiry_date }) => {
        let sp = `${sale_price < 10 ? '0' : ''}${sale_price}`;
        let cp = `${cost_price < 10 ? '0' : ''}${cost_price}`;
        let qty = `${quantity < 10 ? '0' : ''}${quantity}`;
        let profit = `₹ ${(sale_price - cost_price) < 10 ? '0' : ''}${(sale_price - cost_price)}`;
        return {
            id,
            cost_price: `₹ ${cp}`,
            sale_price: `₹ ${sp}`,
            quantity: qty,
            product_name,
            profit,
            expiry_date: moment(expiry_date).format('DD, MMM yyyy'),
            action: <TableControls id={id} deleteEntry={deleteStockEntryFromState} />
        };
    });

    return (
        <Paper
            sx={{
                padding: 5,
                width: '90%',
                marginX: 'auto',
                marginTop: 1,
                height: '550px'
            }}
            elevation={0}
        >
            <Typography textAlign='center' variant="h4" sx={{ marginBottom: 1 }}>Stock List</Typography>
            <MyDataGrid
                sx={{
                    width: '100%',
                    flex: 2
                }}
                // disableColumnMenu={true}
                columns={columns}
                rows={rows}
                hideFooterSelectedRowCount={true}
            />
        </Paper>
    );
}

export default StockList;