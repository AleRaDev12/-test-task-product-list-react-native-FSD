import React, {FC, useEffect, useState, useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import {Product} from './entities/product/model/types.ts';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from './app/App.tsx';

type ProductDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetails'
>;

const getProductById = async (
  id: number,
  signal: AbortSignal,
): Promise<Product> => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${id}`,
      {signal},
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error('Error fetching the product:', error);
    }
    throw error;
  }
};

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export const ProductDetails: FC<ProductDetailsScreenProps> = React.memo(
  props => {
    const productId = props.route.params.id;
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = useCallback(
      async (signal: AbortSignal) => {
        setIsLoading(true);
        try {
          const prod = await getProductById(productId, signal);
          setProduct(prod);
        } catch (err) {
          if (!axios.isCancel(err)) {
            setError('Failed to load product. Please try again.');
          }
        } finally {
          setIsLoading(false);
        }
      },
      [productId],
    );

    useEffect(() => {
      const controller = new AbortController();
      fetchProduct(controller.signal);
      return () => controller.abort();
    }, [fetchProduct]);

    if (isLoading) {
      return <Text style={styles.message}>Loading...</Text>;
    }
    if (error) {
      return <Text style={styles.message}>{error}</Text>;
    }
    if (!product) {
      return <Text style={styles.message}>No product found</Text>;
    }

    return (
      <View style={styles.container}>
        <Image source={{uri: product.image}} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 8,
  },
  description: {
    marginTop: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
