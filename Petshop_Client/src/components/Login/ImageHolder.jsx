import React from 'react';
import '../../assets/loginAssets/css/bootstrap.min.css';
import '../../assets/loginAssets/css/fontawesome-all.min.css';
import '../../assets/loginAssets/css/iofrm-style.css';
import '../../assets/loginAssets/css/iofrm-theme33.css';
import '../../assets/loginAssets/js/jquery.min.js';
import '../../assets/loginAssets/js/bootstrap.bundle.min.js';
import '../../assets/loginAssets/js/main.js';
const ImageHolder = () => {
    const petShopImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjw1vsnM4rAArUm5Quk7aTjkOM5Wc0gNg0YQ&s";

    return (
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
    );
};

export default ImageHolder;