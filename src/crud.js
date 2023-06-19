import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GETProducts() {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

        axios.get('https://musicproocyberedge.onrender.com/api/productos', {
            headers: {
                'auth-token': token, // Reemplaza 'token' con el valor real del token de autenticación
            },
        })
            .then((res) => {
                console.log(res);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <h1>Featured Products</h1>
            <div className='item-container'>
                {products.map((product) => (
                    <div className='card' key={product.id}>
                        <h3>{product.nombre}</h3>
                        <p>{product.precio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
