import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import './productinfo.css';

export const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product data by ID from an API or state
    // For now, using dummy data
    const productData = {
      id,
      name: `Product ${id}`,
      code: `00${id}`,
      active: id % 2 === 0 ? 'No' : 'Yes',
      owner: `Owner ${id}`,
      description: `Description for product ${id}`,
    };

    setProduct(productData);
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-info-page">
      <Sidebar className="product-info-sidebar" />
      <div className="product-info-content">
        <h1>{product.name}</h1>
        <p><strong>Code:</strong> {product.code}</p>
        <p><strong>Active:</strong> {product.active}</p>
        <p><strong>Owner:</strong> {product.owner}</p>
        <p><strong>Description:</strong> {product.description}</p>
      </div>
    </div>
  );
};
