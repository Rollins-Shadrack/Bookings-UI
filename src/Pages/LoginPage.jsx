import React, {useState, useContext} from 'react'
import {Button, Form, Spinner} from 'react-bootstrap';
import {Link, Navigate} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext); 
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
        });
    const handleChange = (e)=>{
        e.preventDefault()
        setCredentials((prev) =>({
            ...prev,[e.target.name] : e.target.value
        }))
    }
    const LoginUser = async (e) => {
        e.preventDefault()
        setLoading(true);
        try{
            const response = await axios.post('/users/login',credentials)
            setSuccess(response.data.message);
            setUser(response.data.user)
            setLoading(false);
            setRedirect(true)

        }catch(error){
            setError(error.response.data.message);
            setLoading(false)
        }
    }
    if(redirect){
      return  <Navigate to='/'/>
    }
  return (
    <div >
        <div className="row">
            <div style={{marginTop:"100px"}} className="col-sm-6  mx-auto container">
                <h3 style={{color:"#293855"}} className="text-center">Sign In</h3>
            <Form onSubmit={LoginUser} className="container">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" name="email" value={credentials.email} onChange={handleChange}  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleChange}  />
                </Form.Group>
                <Button style={{background:"#293855", color:"#c2e7c9"}} type="submit" disabled={loading}>
                {loading ? <p style={{display:"flex"}}> <Spinner className="mx-3" animation='grow' /></p> : "Login"}
                </Button>
                <div style={{color:"#4265d6"}} className="text-center py-2">Don't have an Account? <Link to='/register'>Sign Up</Link></div>
            </Form>
            </div>
        </div>
    </div>
  )
}

export default LoginPage