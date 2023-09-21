import React,{useState} from 'react'
import { Link, json } from 'react-router-dom'

export default function Signup() {
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("/api/CreateUser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: credentials.name,
              email: credentials.email,
              geolocation: credentials.geolocation,
              password: credentials.password,
              address:credentials.address
            })
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const json = await response.json();
      
          if (!json.success) {
            alert("Enter valid credentials");
          }
        } catch (error) {
          console.error('Error:', error);
          // Handle the error appropriately, e.g., show an error message to the user
        }
      }
    const onChange = (event)=>{
        setcredentials({...credentials,[event.target.name] : event.target.value})
    }
    
    return (
        <>
            <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" value= {credentials.name}  onChange={onChange} placeholder="Enter Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={onChange} placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" onChange={onChange} placeholder="Enter Address"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/Login" className="m-3 btn btn-danger">Already a user</Link>
            </form>
            </div>
        </>
    )
}
