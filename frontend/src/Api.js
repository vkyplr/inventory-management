import axios from 'axios';

const BASE_URL = "http://localhost:8000";

const API_CALLS = {
    addEditStock: async (data, id = null) => {
        let targetUrl = `${BASE_URL}/stock/${id != null ? id : ""}`;
        let result = await axios({
            url: targetUrl,
            method: 'post',
            data,
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        });
        return result.status === 200;
    },

    getStockList: async () => {
        let targetUrl = `${BASE_URL}/stock/`;
        let result = await axios({
            url: targetUrl,
            method: 'get',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        });
        return result;
    },

    getStockById: async id => {
        let targetUrl = `${BASE_URL}/stock/${id}`;
        let result = await axios({
            url: targetUrl,
            method: 'get',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        });
        return result;
    },

    deleteStockById: async id => {
        let targetUrl = `${BASE_URL}/delete-stock/${id}`;
        let result = await axios({
            url: targetUrl,
            method: 'get',
        });
        return result;
    },
}

export default API_CALLS;