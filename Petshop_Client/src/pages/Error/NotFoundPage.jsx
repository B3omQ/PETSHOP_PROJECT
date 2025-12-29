import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
       <section className="error__area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="error__img">
                            <img src="../assets/img/images/error_img.html" alt=""/>
                        </div>
                        <div className="error__content">
                            <h1 className="title" style={{color: '#BE976E',
                            }}>OOPS! Nothing Was Found</h1>
                            <p>Oops! it could be you or us, there is no page here. It might have been <br/> moved or deleted.Back To Home</p>
                            <a href="/" className="btn" style={{backgroundColor: '#BE976E', color: 'white' , border: '1000px', borderRadius: '50px', padding: '10px 20px'}}
                            >Back To Home Page 
                            <img src="assets/img/icon/right_arrow.svg" alt="" className="injectable"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFoundPage;