import { Card, CardContent } from '@mui/material'
import React, { useState, useEffect } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { NavLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useParams, useHistory } from 'react-router-dom';
import okok from "./img/profile.png";

const View = () => {

    const [user, setUser] = useState([]);

    const { id } = useParams();
    console.log(id);

    const history = useHistory();

    const userind = async () => {

        try {
            const res = await fetch(`/getdata/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            console.log(data);

            if (res === 404 && !data) {
                console.log("no data present");
            } else {
                console.log("data matched");
                setUser(data)
            }
        } catch (error) {
            console.log(error + "ok ind");
        }
    }

    useEffect(() => {
        userind();
    }, [])


    const dltuser = async (id) => {
        try {
            const res1 = await fetch(`/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data1 = await res1.json();
            console.log(data1);

            if (res1 === 404 && !data1) {
                console.log("no delete");
            } else {
                console.log("data is delete");
                history.push("/");
            }

        } catch (error) {
            console.log(error + "error while deleting the data");
        }
    }



    return (
        <div className="container mt-2 ">

            <h2>Welcome {user.name}</h2>

            <Card className="mt-4" sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <img src={okok} className="profile mb-3" alt="profile" />
                            <div className="details mt-2">
                                <h4 className="mb-3"><strong>Name</strong> : {user.name}</h4>
                                <h5 className="mb-3"><strong>Age</strong> : {user.age}</h5>
                                <h6 className="mb-3"> <MailOutlineIcon /> <strong>Email</strong> : {user.email}</h6>
                                <h6 className="mb-3"> <WorkIcon /> <strong className="top">Occuption</strong> : {user.work}</h6>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="del_add">
                                <NavLink to={`/edit/${user._id}`}>
                                    <button className="btn btn-primary mx-2"> <EditIcon /></button>
                                </NavLink>
                                <NavLink to="">
                                    <button className="btn btn-danger" onClick={() => dltuser(user._id)}> <DeleteOutlineIcon /></button>
                                </NavLink>
                            </div>

                            <div className="details mt-5">
                                <h6 className="mb-3"> <PhoneAndroidIcon /> <strong>Mobile</strong> : +91 {user.mobile}</h6>
                                <h6><LocationOnIcon /> <strong>Location</strong>: {user.add}</h6>
                                <p><strong>Description</strong> : {user.desc}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default View
