import { useCart } from '../../context/Cart/CartProvider';
import CartOffCanvas from '../CartOffCanvas';
import SearchModal from './SearchModal';
import { useSearchContext } from '../../context/Search/SearchProvider';
import { useCartStore } from '../../stores/cartStore';
import { Link } from 'react-router-dom';
import '../style/Header.css'
const User = () => {
    const { showCart, openCart } = useCart();
    const { showSearch, openSearch } = useSearchContext()
    const { cart } = useCartStore();
    const total = cart.reduce((total, item) => total + item.quantity, 0);
    return (
        <>
            <div className="tgmenu__search" onClick={openSearch}>
                <i className="bi bi-search fs-5"></i>
            </div>
            {showSearch ? <SearchModal /> : ''}
            <div className="tgmenu__action tgmenu__action-three d-none d-md-block">
                <ul className="list-wrap">
                    <li className="header-login">
                        <Link to="/contact">
                            <i className="flaticon-user"></i>
                        </Link>
                    </li>
                    <li className="header-cart header-cart-two">
                        <a onClick={openCart}>
                            <i className="flaticon-shopping-bag"></i>
                            <span>{total}</span>
                        </a>
                    </li>
                    {showCart ? <CartOffCanvas /> : ''}
                </ul>
            </div>
        </>
    );
};

export default User;