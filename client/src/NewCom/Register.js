import { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { datacontext } from "./context/Contextprovider";

const Register = () => {

    const { state, setState } = useContext(datacontext);

    const history = useHistory();

    const [data, setData] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""

    });

    const setinpdata = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setData((prevl) => {
            return {
                ...prevl,
                [name]: value
            }
        })
    }

    const addval = async (e) => {
        e.preventDefault();

        const { name, email, age, mobile, work, add, desc } = data;


        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, age, email, mobile, work, add, desc
                })
            });

            const finaldata = await res.json();
            console.log(finaldata);

            if (res.status === 401 && !finaldata) {
                alert("fill the data");
            } else {
                // alert("done");
                setState(finaldata);
                history.push("/");

            }
        } catch (error) {
            console.log(error + "error hai bhai front");
        }
    }

    return (
        <>
            <div className="container mt-2">
                <NavLink to="/">Home</NavLink>
                <form className="mt-5" method="POST">
                    <div className="row">   
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input type="text" class="form-control"
                                onChange={setinpdata}
                                value={data.name}
                                name="name" id="exampleInputEmail1" aria-describedby="emailHelp" />

                        </div>

                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Email</label>
                            <input type="email" class="form-control"
                                onChange={setinpdata}
                                value={data.email}
                                name="email" id="exampleInputPassword1" />

                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Age</label>
                            <input type="text" class="form-control"
                                onChange={setinpdata}
                                value={data.age}
                                name="age" id="exampleInputPassword1" />

                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Mobile</label>
                            <input type="number" class="form-control"
                                onChange={setinpdata}
                                value={data.mobile}
                                name="mobile" id="exampleInputPassword1" />

                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Work</label>
                            <input type="text" class="form-control"
                                onChange={setinpdata}
                                value={data.work}
                                name="work" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Address</label>
                            <input type="text" class="form-control"
                                onChange={setinpdata}
                                value={data.add}
                                name="add" id="exampleInputPassword1" />

                        </div>
                        <div className="mb-3 col-lg-12 col-md-12 col-12">
                            <label for="exampleInputPassword1" class="form-label">Description</label>
                            <textarea className="form-control"
                                onChange={setinpdata}
                                value={data.desc}
                                name="desc" id="" cols="30" rows="4"></textarea>
                        </div>
                        <button type="submit" onClick={addval} class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register

// setGetdata((pre)=>{
//     return [...pre,data]
// });

// https://userprofilecrud.herokuapp.com