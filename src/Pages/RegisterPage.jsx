import React, {useState} from 'react'
import {Button, Form, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: ''
        });
    const handleChange = (e)=>{
        e.preventDefault()
        setCredentials((prev) =>({
            ...prev,[e.target.name] : e.target.value
        }))
    }
    const RegisterUser = async (e) => {
        e.preventDefault()
        setLoading(true);
        try{
            const response = await axios.post('/users/register',credentials)
            setSuccess(response.data.message);
            setLoading(false);

        }catch(error){
            setError(error.response.data.message);
            setLoading(false)
        }
    }
    console.log(success)
    console.log(error)
  return (
    <div>
        <div className="row">
            <div style={{marginTop:"100px"}} className="col-sm-6  mx-auto container">
                <h3 style={{color:"#293855"}} className="text-center">Sign Up</h3>
            <Form onSubmit={RegisterUser} className="container">
                <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control type="text" placeholder="Rollins Shadrack" name="name"  value={credentials.name} onChange={handleChange}  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" name="email" value={credentials.email} onChange={handleChange}  />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" name="password"  value={credentials.password} onChange={handleChange}  />
                </Form.Group>
                <Button disabled={loading} style={{background:"#293855", color:"#c2e7c9"}} type="submit" >
                {loading ? <p style={{display:"flex"}}> <Spinner className="mx-3" animation='grow' /></p> : "Register"}
                </Button>
                <div style={{color:"#4265d6"}} className="text-center py-2">Allready have an Account? <Link to='/login'>Sign In</Link></div>
            </Form>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage