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

const Login = () => {
    const petShopImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjw1vsnM4rAArUm5Quk7aTjkOM5Wc0gNg0YQ&s";
    const navigate = useNavigate();
    const authorize = (role) => {
        role === 'admin' ? navigate('/admin') : navigate('/');
    }

    const handleLogin = async (value) => {
        console.log(value)
        const response = await login(value);
        const role = response.role;
        authorize(role);
    };

    const LoginSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password Is Required'),
        email: Yup.string()
            .email('Required email format!')
            .required('Email Is Required'),
    });
    return (
        <div className="form-body">
            <div className="iofrm-layout">
                <div className="img-holder">
                    <div className="bg"></div>
                    <div className="info-holder">
                        <img
                            src={petShopImage}
                            alt="Pet Shop Welcome"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: '12px',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                            }}
                        />
                    </div>
                </div>
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
                                            required
                                        />
                                        <label htmlFor="passwordInput">Password</label>
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-danger text-start"
                                            style={{ textAlign: 'left', fontSize: '0.9rem', marginTop: '5px' }}
                                        />
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
