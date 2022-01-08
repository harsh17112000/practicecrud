import { useContext, useEffect, useState } from "react";
import { NavLink , useHistory} from "react-router-dom";
import { useParams } from "react-router";
import { updatecontext } from "./context/Contextprovider";

const Edit = () => {

    const {update,setUpdate} = useContext(updatecontext); 

    const [user,setUser] = useState({
        name:"",
        email:"",
        age:"",
        work:"",
        mobile:"",
        add:"",
        desc:""
    });

    const history = useHistory();

    const {id} = useParams();
    console.log(id);

    const userind = async()=>{

        try {
            const res = await fetch(`/getdata/${id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const data = await res.json();
            console.log(data);
    
            if(res === 404 && !data){
                console.log("no data present");
            }else{
                console.log("data matched");
                setUser(data)
            }
        } catch (error) {
            console.log(error + "ok ind");
        }
    }

    useEffect(()=>{
        userind();
    },[]);

    const changeinp = (e)=>{
        const {name,value} = e.target;

        setUser((preval)=>{
            return {
                ...preval,
                [name]:value
            }
        })

    }

    const addinp = async(e)=>{
        e.preventDefault();

        const {name,email,age,mobile,work,add,desc} = user;

        try {
            const res1 = await fetch(`/edit/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    name,email,age,mobile,work,add,desc
                })
            });

            const data1 = await res1.json();
            console.log(data1);

            if (res1 === 404 && !data1) {
                console.log("error while data is not present");
               
            } else {
                // alert("data updated");
                setUpdate(data1);
                history.push("/");
                console.log("data is here");
            }

        } catch (error) {
            console.log(error + "error while getting the data");
        }
    }

   

    return (
        <div className="container mt-2">
        <NavLink to="/">Home</NavLink>
        <form className="mt-5" method="POST">
            <div className="row">
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" class="form-control"
                    onChange={changeinp}
                        value={user.name}
                     name="name" id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>
               
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" class="form-label">Email</label>
                    <input type="email" class="form-control"
                     onChange={changeinp}
                        value={user.email}
                     name="email" id="exampleInputPassword1" />

                </div>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" class="form-label">Age</label>
                    <input type="text" class="form-control"
                         onChange={changeinp}
                        value={user.age}
                     name="age" id="exampleInputPassword1" />

                </div>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" class="form-label">Mobile</label>
                    <input type="number" class="form-control"
                         onChange={changeinp}
                        value={user.mobile}
                     name="mobile" id="exampleInputPassword1" />

                </div>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" class="form-label">Work</label>
                    <input type="text" class="form-control"
                        value={user.work}
                        onChange={changeinp}
                     name="work" id="exampleInputPassword1" />
                </div>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" class="form-label">Address</label>
                    <input type="text" class="form-control"
                         onChange={changeinp}
                        value={user.add}
                     name="add" id="exampleInputPassword1" />

                </div>
                <div className="mb-3 col-lg-12 col-md-12 col-12">
                    <label for="exampleInputPassword1" class="form-label">Description</label>
                    <textarea  className="form-control"
                         onChange={changeinp}
                        value={user.desc}
                     name="desc" id="" cols="30" rows="4"></textarea>

                </div>
                <button type="submit" onClick={addinp} class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
    )
}

export default Edit
