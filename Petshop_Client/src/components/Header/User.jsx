import { useCart } from '../../context/Cart/CartProvider';
import CartOffCanvas from '../CartOffCanvas';
import SearchModal from './SearchModal';
import { useSearchContext } from '../../context/Search/SearchProvider';
import { useCartStore } from '../../stores/cartStore';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Header.css'
import { Dropdown, NavDropdown } from 'react-bootstrap';
import { logout } from '../../services/user';
const User = () => {
    const { showCart, openCart } = useCart();
    const { showSearch, openSearch, showUserMenu, closeUserMenu } = useSearchContext()
    const { cart } = useCartStore();
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const res = await logout() ; 
            console.log(res)
        } catch (error) {
            navigate('/error')
        }finally{
            localStorage.removeItem('user')
            navigate('/');
            closeUserMenu();
        }
    }
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
                        {showUserMenu ? (
                            <Dropdown align="start" style={{ cursor: 'pointer' }}>
                                <Dropdown.Toggle as="a" id="dropdown-user" className="p-0 border-0 bg-transparent">
                                    <i className="flaticon-user"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="shadow border-0">
                                    <Dropdown.Item as={Link} to="/profile" style={{ fontSize: '14px' }}>
                                        <i className="bi bi-person me-2"></i> Profile
                                    </Dropdown.Item>

                                    <Dropdown.Item as={Link} to="/orders" style={{ fontSize: '14px' }}>
                                        <i className="bi bi-bag me-2"></i> Orders
                                    </Dropdown.Item>

                                    <Dropdown.Divider />

                                    <Dropdown.Item
                                        onClick={() => handleLogout()}
                                        className="text-danger"
                                        style={{ fontSize: '14px' }}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Link to="/login">
                                <i className="flaticon-user"></i>
                            </Link>
                        )}

                    </li>
                    <li className="header-cart header-cart-two">
                        <a onClick={openCart} style={{cursor: 'pointer'}}>
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