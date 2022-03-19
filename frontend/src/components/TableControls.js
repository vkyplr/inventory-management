import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { State } from '../Context';
import API from '../Api';

const TableControls = ({ id, deleteEntry }) => {

    const navigate = useNavigate();

    const { showDialog, showSnackbar } = useContext(State);

    async function deleteProduct() {
        await API.deleteStockById(id)
            .then(() => {
                deleteEntry(id);
            })
            .then(() => {
                showSnackbar('Product Deleted Successfully', 'success');
            });
    };

    return (
        <Box>
            <Link to={`/edit-stock/${id}`} key={id}>
                <Button variant='contained' size='small' color='primary'>Edit</Button>&nbsp;
            </Link>
            <Button
                variant='contained'
                size='small'
                color='error'
                onClick={() =>
                    showDialog(
                        `Warning`,
                        `Are you sure you want to Delete this Product? You won't be able to undo that.`,
                        () => deleteProduct
                    )
                }
            >Delete</Button>
        </Box>
    );
}

export default TableControls;