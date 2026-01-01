import ImageHolder from '../../components/Login/ImageHolder';
import '../../assets/loginAssets/css/bootstrap.min.css';
import '../../assets/loginAssets/css/fontawesome-all.min.css';
import '../../assets/loginAssets/css/iofrm-style.css';
import '../../assets/loginAssets/css/iofrm-theme33.css';
import '../../assets/loginAssets/js/jquery.min.js';
import '../../assets/loginAssets/js/bootstrap.bundle.min.js';
import '../../assets/loginAssets/js/main.js';
import '../../style/Auth/login.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { signUp } from '../../services/user.js';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useState } from 'react';
import SpinnerComponent from '../../components/Loading/Spinner.jsx';
import ImageHolderSignUp from '../../components/Login/ImageHolderSignUp.jsx';
const Register = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const handleSignUp = async (value, { setErrors, setSubmitting }) => {
        setLoading(true)
        try {
            const response = await signUp(value);
            console.log(response);
            setLoading(false)
            navigate('/login');
        } catch (error) {
            console.log("Backend trả về:", error.response?.data);
            setLoading(false)
            setSubmitting(false);
            const serverErrors = error?.response?.data?.errors;

            if (serverErrors) {
                setErrors(serverErrors);
            } else {
                navigate('/error');
            }
        }
    };

    const SignUpSchema = Yup.object().shape({
        fullname: Yup.string().trim()
            .required('FullName Is Required'),
        password: Yup.string().trim()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number'),
        email: Yup.string().trim()
            .email('Invalid email format!')
            .required('Email Is Required'),
        confirmpassword: Yup.string().trim()
            .required('Confirm Password Is Required')
            .oneOf([Yup.ref('password')], 'Passwords do not match'),
        phone: Yup.string().trim()
            .required('Phone is required')
            .matches(/^[0-9]{10,11}$/, 'Invalid phone number'),
        address: Yup.string().trim()
            .required('Address is required'),

    });

    // if (loading) {
    //     return (
    //         <SpinnerComponent />
    //     )
    // }

    return (
        <div className="form-body">
            {loading && (
                <div style={{
                    position: 'fixed', 
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    zIndex: 9999, 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', 
                    width: '100vw'
                }}>
                    <SpinnerComponent />
                </div>
            )}
            <div className="iofrm-layout">
                <ImageHolderSignUp />
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items with-bg">
                            <div className="website-logo-inside logo-normal">
                                <a href="index.html">
                                    <div className="logo">
                                        <img className="logo-size" src="images/logo-black.svg" alt="" />
                                    </div>
                                </a>
                            </div>
                            <h3 className="font-md">Get more things done with Loggin platform.</h3>
                            <p>
                                Access to the most powerfull tool in the entire design and web
                                industry.
                            </p>
                            <Formik
                                initialValues={{
                                    fullname: "",
                                    email: "",
                                    password: "",
                                    confirmpassword: "",
                                    phone: "",
                                    address: ""
                                }}
                                onSubmit={handleSignUp}
                                validationSchema={SignUpSchema}
                            >
                                <Form>
                                    <div className="form-floating mb-3">
                                        <Field
                                            id="fullnameInput"
                                            className="form-control"
                                            type="text"
                                            name="fullname"
                                        />
                                        <label htmlFor="fullnameInput">Full Name</label>
                                        <ErrorMessage
                                            name="fullname"
                                            component="div"
                                            className="text-danger text-start"
                                            style={{ textAlign: 'left', fontSize: '0.9rem', marginTop: '5px' }}
                                        />
                                    </div>
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

                                    <div className="form-floating mb-3">
                                        <Field
                                            id="confirmpasswordInput"
                                            className="form-control"
                                            type="password"
                                            name="confirmpassword"
                                        />
                                        <label htmlFor="confirmpasswordInput">Confirm Password</label>
                                        <ErrorMessage
                                            name="confirmpassword"
                                            component="div"
                                            className="text-danger text-start"
                                            style={{ textAlign: 'left', fontSize: '0.9rem', marginTop: '5px' }}
                                        />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <Field
                                            id="phoneInput"
                                            className="form-control"
                                            type="text"
                                            name="phone"
                                        />
                                        <label htmlFor="phoneInput">Phone Number</label>
                                        <ErrorMessage
                                            name="phone"
                                            component="div"
                                            className="text-danger text-start"
                                            style={{ fontSize: '0.9rem', marginTop: '5px' }}
                                        />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <Field
                                            id="addressInput"
                                            className="form-control"
                                            type="text"
                                            name="address"
                                        />
                                        <label htmlFor="addressInput">Address</label>
                                        <ErrorMessage
                                            name="address"
                                            component="div"
                                            className="text-danger text-start"
                                            style={{ fontSize: '0.9rem', marginTop: '5px' }}
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
                                            Register
                                        </button>
                                        <a
                                            href="/login"
                                            className="btn createAccount"
                                            style={{
                                                backgroundColor: 'white',
                                                borderColor: '#BE976E',
                                                color: '#BE976E',
                                                marginRight: '10px'
                                            }}
                                        >
                                            Login
                                        </a>
                                    </div>
                                    <div className="other-links">
                                        <span>Or login with</span>
                                        <a href="#">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-google"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
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

export default Register;