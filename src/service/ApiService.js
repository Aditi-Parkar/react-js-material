//import { Details } from '@material-ui/icons';
import axios from 'axios';

const Client_API_BASE_URL = "http://localhost:3011/api/v1/admin";

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkFkbWluIiwidXNlcm5hbWUiOiJhZG1pbkBwYXJrYXIuZGlnaXRhbCIsInJlbWVtYmVyX3Rva2VuIjpudWxsLCJpc19kZWxldGVkIjowLCJjcmVhdGVkX2F0IjoiMjAyMi0xMS0wOVQwOTo0Mzo1OS4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjItMTEtMDlUMDk6NDQ6MTIuMDAwWiIsImlhdCI6MTY3MDUwMzc5NSwiZXhwIjoxNjcwNTkwMTk1fQ.KwiPvs4S0TDGZJStCKATGtvHXqv4cB5AafjeEq7FTtGTYoinpB_0nZJzRYHMkppPIwAqpdMhB4WbwOejFMxDbeEaSKKEo0fHJH9npedA3sLmMk2H4m4voe7IjGjfhIj4_VFFlhntNa13_-0Z5HZ5JPJDYM6qFcMfNmcui3jKUzr2H6EMgDsM5fYHXkhgCWwxB7L2neEACvtbC6CY1pFAIVgn--J5UuPR6HW8pk4S9pW_hbbsWRdeorwcnv-31FCJaqJfOSSfEOk6gQLXxFu5KZpfNKMCg12fEpBsO_VQZ4dThSd3H7-CiKGMVwiheZRw72GQuoA-I6pOKVeH2zxMag";
    console.log("token", token);
    axios.defaults.headers.common["Authorization"] = token;

class ApiService {

    clientList() {
        return axios.get(Client_API_BASE_URL + '/client/list');
    }

    getClientFromId(client_id) {
        return axios.get(Client_API_BASE_URL + '/client/:client_id/details');
    }

    deleteClient(client_id) {
        return axios.delete(Client_API_BASE_URL + '/client/:client_id');
    }

    createClient(create) {
        return axios.post(Client_API_BASE_URL + "/client/create");
        
    }

    updateClient(client_id) {
        return axios.post(Client_API_BASE_URL + '/client/:client_id/update');
    }

}

export default new ApiService();