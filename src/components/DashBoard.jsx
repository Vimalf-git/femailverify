import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import UseLogout from './CustomHooks/UseLogout';
import { toast } from 'react-toastify';

function DashBoard() {
    const logout=UseLogout();
    const [data, setData] = useState([])
    const token=sessionStorage.getItem('token')
    const getData = async () => {
        try {
            const header = `Authorization: Bearer ${token}`;
            const res = await axios.get('http://localhost:8000/getAll',{
                headers:header
            });
            console.log(res);
            if (res.status == 200) {
                setData(res.data.data)
                console.log(res);
            }
        } catch (error) {
            if(error.response.status===400){
                toast.error(error.response.data.message)
                logout()
            }
        }
    }
    console.log(data);
    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>mail</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, i) => {
                        return <tr key={i}>
                            <td>{e.username}</td>
                            <td>{e.email}</td>
                        </tr>
                    })}
                </tbody>
            </Table>

        </div>
    )
}

export default DashBoard