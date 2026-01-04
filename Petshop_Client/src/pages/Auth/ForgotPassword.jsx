import React, { useState } from 'react';
import '../../assets/loginAssets/css/bootstrap.min.css';
import '../../assets/loginAssets/css/fontawesome-all.min.css';
import '../../assets/loginAssets/css/iofrm-style.css';
import '../../assets/loginAssets/css/iofrm-theme33.css';
import '../../assets/loginAssets/js/jquery.min.js';
import '../../assets/loginAssets/js/bootstrap.bundle.min.js';
import '../../assets/loginAssets/js/main.js';
import ImageHolder from '../../components/Login/ImageHolder.jsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { forgotPassword } from '../../services/user.js';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (value, { setErrors, setSubmitting }) => {
        try {
            const response = await forgotPassword(value);
            console.log(response);
            setEmail(value.email);
            setIsSent(true);
        } catch (error) {
            setIsSent(false);
            setSubmitting(false)
            const errors = error.response.data.errors
            if (errors) {
                setErrors(errors);
            } else {
                navigate('/error');
            }
            console.log(error.response.data.errors.email);
        }


    };
    const ForgotPasswordSchema = Yup.object().shape({
        email: Yup.string().trim()
            .email('Invalid email format!')
            .required('Email Is Required'),
    });
    return (
        <div className="form-body">
            <div className="iofrm-layout">
                <ImageHolder />

                <div className="form-holder">
                    <div className="form-content">

                        {!isSent ? (
                            <div className="form-items with-bg">
                                <h3>Password Reset</h3>
                                <p>To reset your password, enter the email address you use to sign in to iofrm</p>
                                <Formik
                                    initialValues={{
                                        email: ''
                                    }}
                                    onSubmit={handleSubmit}
                                    validationSchema={ForgotPasswordSchema}
                                >
                                    <Form noValidate>
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
                                        <div className="form-button full-width">
                                            <button id="submit" type="submit" className="ibtn"
                                                style={{
                                                    backgroundColor: '#BE976E',
                                                    borderColor: '#BE976E',
                                                    color: '#fff',
                                                    marginRight: '10px'
                                                }}
                                            >
                                                Send Reset Link
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        ) : (
                            <div className="form-content">

                                <div className="form-items with-bg">
                                    <div className="tick-holder">
                                        <div className="tick-icon"></div>
                                    </div>
                                    <h3>Password link sent</h3>
                                    <p>Please check your inbox <span style={{ fontWeight: 'bold' }}>{email}</span></p>
                                    <div className="info-holder">
                                        <span>Unsure if that email address was correct?</span> <a href="#" onClick={() => setIsSent(false)}>We can help</a>.
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;