import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(undefined);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    if (all_product && all_product.length > 0) {
      const foundProduct = all_product.find((e) => e.id === Number(productId));
      setProduct(foundProduct);
      setLoading(false); // Desactivar el estado de carga
    }
  }, [all_product, productId]);

  if (loading) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se espera a que el producto se cargue
  }

  if (!product) {
    return <div>Product not found</div>; // Mostrar un mensaje si el producto no se encuentra
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts category={product.category} />
    </div>
  );
};

export default Product;
