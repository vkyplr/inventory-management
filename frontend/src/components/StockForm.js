import {
    Paper,
    TextField,
    Box,
    InputAdornment,
    Typography,
    Button
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useContext, useEffect, useState } from "react";
import API from '../Api';
import { State } from "../Context";
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';

const StockForm = () => {

    let params = useParams();

    useEffect(async () => {
        if (params.id !== undefined) {
            const { data } = await API.getStockById(params.id);
            setProductName(data.product_name);
            setCostPrice(data.cost_price);
            setSalePrice(data.sale_price);
            setExpiryDate(data.expiry_date);
            setQuantity(data.quantity);
        }
    }, [])

    const navigate = useNavigate();

    const { showSnackbar } = useContext(State);

    const [productName, setProductName] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [expiryDate, setExpiryDate] = useState(null);
    const [quantity, setQuantity] = useState('');

    // errors
    const [productNameError, setProductNameError] = useState(false);
    const [costPriceError, setCostPriceError] = useState(false);
    const [salePriceError, setSalePriceError] = useState(false);
    const [expiryDateError, setExpiryDateError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);

    // Helper Texts
    const [salePriceHelperText, setSalePriceHelperText] = useState('');


    const resetForm = () => {
        setExpiryDate(null);
        setProductName('');
        setCostPrice('');
        setSalePrice('');
        setQuantity('');
    }

    const checkForm = () => {

        let pNameError, cPriceError, sPriceError, eDateError, qError = false;

        setProductNameError(productName.length < 1);
        pNameError = productName.length < 1;

        setCostPriceError(costPrice.length < 1);
        cPriceError = costPrice < 1;

        setSalePriceError(salePrice.length < 1 || Number(salePrice) < Number(costPrice));
        sPriceError = salePrice.length < 1 || Number(salePrice) < Number(costPrice);

        if (salePrice.length < 1) {
            setSalePriceHelperText('This field is required');
        } else if (Number(salePrice) < Number(costPrice)) {
            setSalePriceHelperText('Sale Price cannot be less than Cost Price');
        } else {
            setSalePriceHelperText('');
        }

        setExpiryDateError(expiryDate === null);
        eDateError = expiryDate === null;

        setQuantityError(quantity.length < 1);
        qError = quantity.length < 1;

        if (!pNameError && !cPriceError && !sPriceError && !eDateError && !qError) {
            let result = API.addEditStock({
                cost_price: costPrice,
                sale_price: salePrice,
                quantity,
                product_name: productName,
                expiry_date: expiryDate
            }, params.id !== undefined ? params.id : null);
            if (result) {
                showSnackbar(`Product ${params.id !== undefined ? 'updated' : 'added'} Successfully`, 'success');
                navigate('/stock')
            }
            else showSnackbar('Error! Try again After Some time', 'error')
        }
    }

    return (
        <>
            <Paper
                sx={{
                    padding: 5,
                    width: '50%',
                    marginX: 'auto',
                    marginTop: 10
                }}
                elevation={5}
            >
                <Typography textAlign='center' variant="h4">Stock Details</Typography>
                <Box display='flex' justifyContent='space-around' marginBottom={5} marginTop={3} >
                    <TextField
                        error={productNameError}
                        helperText={productNameError ? 'This field is required' : ''}
                        variant='outlined'
                        label='Product Name'
                        size="small"
                        fullWidth
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                    />
                </Box>
                <Box display='flex' justifyContent='space-between' marginBottom={5} >
                    <TextField
                        error={costPriceError}
                        helperText={costPriceError ? 'This field is required' : ''}
                        variant='outlined'
                        label='Cost Price'
                        size="small"
                        sx={{
                            width: '49%'
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>₹</InputAdornment>
                        }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={costPrice}
                        onChange={e => setCostPrice(e.target.value)}
                        onKeyPress={e => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                    <TextField
                        error={salePriceError}
                        helperText={salePriceHelperText}
                        variant='outlined'
                        label='Sale Price'
                        size="small"
                        sx={{
                            width: '49%'
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>₹</InputAdornment>
                        }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={salePrice}
                        onChange={e => setSalePrice(e.target.value)}
                        onKeyPress={e => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </Box>
                <Box display='flex' justifyContent='space-between' marginBottom={5} >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            mask='__/__/____'
                            inputFormat='dd/MM/yyyy'
                            label='Expiry Date'
                            variant='outlined'
                            onChange={(value) => setExpiryDate(moment(value))}
                            value={expiryDate}
                            renderInput={(params) => {
                                return <TextField sx={{
                                    width: '49%'
                                }}
                                    size='small'
                                    {...params}
                                    error={expiryDateError}
                                    helperText={expiryDateError ? 'Enter Valid Date' : ''}
                                    onKeyDown={e => e.preventDefault()}
                                />
                            }}
                            minDate={new Date()}
                        />
                    </LocalizationProvider>
                    <TextField
                        error={quantityError}
                        helperText={quantityError ? 'This field is required' : ''}
                        variant='outlined'
                        label='Quantity'
                        size="small"
                        sx={{
                            width: '49%'
                        }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        onKeyPress={e => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Button onClick={resetForm} variant='contained' color='error'>Reset</Button>
                    <Button onClick={checkForm} variant='contained' color='primary'>Submit</Button>
                </Box>
            </Paper>
        </>
    );
}

export default StockForm;