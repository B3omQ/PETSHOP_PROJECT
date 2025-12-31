import ImageHolder from '../../components/Login/ImageHolder';
import '../../assets/loginAssets/css/bootstrap.min.css';
import '../../assets/loginAssets/css/fontawesome-all.min.css';
import '../../assets/loginAssets/css/iofrm-style.css';
import '../../assets/loginAssets/css/iofrm-theme33.css';
import '../../assets/loginAssets/js/jquery.min.js';
import '../../assets/loginAssets/js/bootstrap.bundle.min.js';
import '../../assets/loginAssets/js/main.js';
import '../../style/Auth/login.css'
const Register = () => {
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
                                        <img className="logo-size" src="images/logo-black.svg" alt="" />
                                    </div>
                                </a>
                            </div>
                            <h3 className="font-md">Get more things done with Loggin platform.</h3>
                            <p>
                                Access to the most powerfull tool in the entire design and web
                                industry.
                            </p>
                            <form>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    required
                                />
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    placeholder="E-mail Address"
                                    required
                                />
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                />
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
                            </form>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;