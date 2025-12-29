import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSearchContext } from '../../context/Search/SearchProvider';
import * as Yup from "yup";
import { Field, Formik } from 'formik';
import { getAllProductsByName } from '../../services/products';
import SpinnerMenu from '../Loading/SpinnerMenu';
import { useNavigate } from 'react-router-dom';
const SearchModal = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const { showSearch, closeSearch } = useSearchContext();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!keyword.trim() || keyword.length === 0) {
            setProducts([]);
            setLoading(false)
            return;
        }

        setLoading(true);

        const timer = setTimeout(async () => {
            try {
                const data = await getAllProductsByName(keyword);
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [keyword]);

    useEffect(() => {
        if (!showSearch) {
            setKeyword("");
            setProducts([]);
        }
    }, [showSearch]);

    const handleSearch = (p) => {
        navigate(`product/${p.productId}`);
        closeSearch();
    }
    return (
        <Modal show={showSearch} onHide={closeSearch} scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Searching Your Product You Want</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div
                    className="d-flex align-items-center border border-secondary rounded-pill px-3 py-2 mb-3"
                    style={{ backgroundColor: "white" }}
                >
                    <input
                        type="text"
                        placeholder="Are You Looking For?"
                        className="border-0 flex-grow-1 bg-transparent"
                        autoFocus
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        style={{ outline: "none" }}
                    />
                    <i
                        className="bi bi-search fs-5 text-secondary"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            if (!keyword.trim()) return;
                            navigate(`product/search?name=${keyword}`)
                            closeSearch();
                        }}
                    />
                </div>

                {loading && <SpinnerMenu />}

                {products.map((p) => (
                    <div
                        key={p.productId}
                        className="py-2 border-bottom"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSearch(p)}
                    >
                        {p.productName}
                    </div>
                ))}

                {!loading && keyword && products.length === 0 && (
                    <div className="text-muted">No result found for "{`${keyword}`}"</div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default SearchModal;