import React, { useState } from "react";
import { login } from "../../services/user";
import '../../assets/loginAssets/css/bootstrap.min.css';
import '../../assets/loginAssets/css/fontawesome-all.min.css';
import '../../assets/loginAssets/css/iofrm-style.css';
import '../../assets/loginAssets/css/iofrm-theme33.css';
import '../../assets/loginAssets/js/jquery.min.js';
import '../../assets/loginAssets/js/bootstrap.bundle.min.js';
import '../../assets/loginAssets/js/main.js';
import '../../style/Auth/login.css'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ImageHolder from "../../components/Login/ImageHolder.jsx";
import { useSearchContext } from "../../context/Search/SearchProvider.jsx";
import SpinnerComponent from "../../components/Loading/Spinner.jsx";

const Login = () => {
    const [error, setError] = useState("");
    const [loading , setLoading] = useState(true); 
    const { openUserMenu } = useSearchContext()
    const navigate = useNavigate();
    const authorize = (role) => {
        role === 'admin' ? navigate('/admin') : navigate('/');
    }

    const handleLogin = async (value) => {
        try {
            const response = await login(value);
            console.log(response)
            authorize(response.role);
            localStorage.setItem('user', JSON.stringify(response));
            openUserMenu();
            // setLoading(false);
        } catch (error) {
            if (error.status === 401) {
                setError(error.response.data);
            } else {
                setError("Something went wrong");
            }
        }
    };

    const LoginSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password Is Required'),
        email: Yup.string()
            .email('Required email format!')
            .required('Email Is Required'),
    });

    // if(loading){
    //     return (
    //         <SpinnerComponent/>
    //     )
    // }

    return (
        <div className="form-body">
            <div className="iofrm-layout">
                <ImageHolder />
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items with-bg">
                            <div className="website-logo-inside logo-normal">
                                <a href="index.html">
                                    <div className="logo">
                                        <img className="logo-size" src="../../assets/loginAssets/images/logo-black.svg" alt="" />
                                    </div>
                                </a>
                            </div>
                            <h3 className="font-md">Get more things done with Loggin platform.</h3>
                            <p>Access to the most powerfull tool in the entire design and web industry.</p>
                            <Formik
                                initialValues={{
                                    email: localStorage.getItem("savedEmail") || ""
                                    , password: ''
                                    // , rememberMe: localStorage.getItem("savedEmail") ? true : false
                                }}
                                onSubmit={handleLogin}
                                validationSchema={LoginSchema}
                            >
                                <Form>
                                    <div className="form-floating mb-3">
                                        <Field
                                            id="emailInput"
                                            className="form-control"
                                            type="text"
                                            name="email"
                                        />
                                        <label htmlFor="emailInput">Email Address</label>
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-danger text-start"
                                            style={{ textAlign: 'left', fontSize: '0.9rem', marginTop: '5px' }}
                                        />
                                    </div>

                                    <div className="form-floating mb-3">
                                        <Field
                                            id="passwordInput"
                                            className="form-control"
                                            type="password"
                                            name="password"
                                        />
                                        <label htmlFor="passwordInput">Password</label>
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-danger text-start"
                                            style={{ textAlign: 'left', fontSize: '0.9rem', marginTop: '5px' }}
                                        />
                                    </div>
                                    <div>
                                        {error ? error : ''}
                                    </div>
                                    <div className="form-button d-flex">
                                        <button
                                            id="submit"
                                            type="submit"
                                            className="btn"
                                            style={{
                                                backgroundColor: '#BE976E',
                                                borderColor: '#BE976E',
                                                color: '#fff',
                                                marginRight: '10px'
                                            }}
                                        >
                                            Login
                                        </button>

                                        <a
                                            href="/register"
                                            className="btn createAccount"
                                            style={{
                                                backgroundColor: 'white',
                                                borderColor: '#BE976E',
                                                color: '#BE976E',
                                                marginRight: '10px'
                                            }}
                                        >
                                            Create account
                                        </a>
                                    </div>
                                    <div className="other-links">
                                        <span>Or login with</span>
                                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                                        <a href="#"><i className="fab fa-google"></i></a>
                                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Login;
