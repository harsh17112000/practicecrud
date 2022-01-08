import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../App.css"
import { NavLink, useHistory } from 'react-router-dom';
import { datacontext, dltcontext } from "./context/Contextprovider";
import Alert from '@mui/material/Alert';
import { updatecontext } from './context/Contextprovider';




const Home = () => {


    const [finaldata, setFinaldata] = useState("");// aiya jo error aave to [] kri devu

    const history = useHistory();

    const { state, setState } = useContext(datacontext);
    const { dlt, setDlt } = useContext(dltcontext);

    const { update, setUpdate } = useContext(updatecontext);
    console.log(update);

    console.log(dlt);

    const getres = async () => {
        try {
            const res = await fetch("https://userprofilecrud.herokuapp.com/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            // console.log(data);

            if (res === 404 && !data) {
                console.log("error while data is not present");
            } else {
                setFinaldata(data);
                console.log("data is here");
            }

        } catch (error) {
            console.log(error + "error while getting the data");
        }

    }

    console.log("waiting" + finaldata);

    useEffect(() => {
        console.log("ok");
        getres();
    }, []);

    const dltuser = async (id) => {
        try {
            const res = await fetch(`/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            // console.log(data);

            if (res === 404 && !data) {
                console.log("no delete");
            } else {
                console.log("data is delete");
                history.push("/");
                // alert("user delete done");
                setDlt(data);
                getres();
            }

        } catch (error) {
            console.log(error + "error while deleting the data");
        }
    }



    return (
        <>
            {
                state ? <Alert style={{ fontSize: 18 }} className="alert" severity="info" onClose={() => setState(false)}>Hey <strong>{state.name}</strong> Your Data successuflly Added</Alert> : ""
            }
            {
                dlt ? <Alert style={{ fontSize: 18 }} severity="error" onClose={() => setDlt(false)}>Hey <strong>{dlt.name}</strong>  Your Data successuflly Deleted</Alert> : ""
            }
            {
                update ? <Alert style={{ fontSize: 18 }} severity="success" onClose={() => setUpdate(false)}>Hey <strong>{update.name}</strong>  Your Data successuflly Update</Alert> : ""
            }




            <section className="mt-5">
                <div className="container">
                    <div className="ok mb-2">
                        <NavLink to="/register">
                            <button className="btn btn-primary"> <AddIcon />Add Data</button>
                        </NavLink>
                    </div>


                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">Id</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col" className="crud"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                finaldata.map((element, ind) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{ind + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.work}</td>
                                                <td>{element.mobile}</td>
                                                <td className="d-flex justify-content-evenly">
                                                    <NavLink to={`getdata/${element._id}`}><button className="btn btn-success"><VisibilityIcon /> </button></NavLink>
                                                    <NavLink to={`edit/${element._id}`}> <button className="btn btn-primary"><EditIcon /></button> </NavLink>
                                                    <NavLink to=""><button onClick={() => dltuser(element._id)} className="btn btn-danger" ><DeleteOutlineIcon /></button></NavLink>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default Home
