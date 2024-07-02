import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Pressable,
  View,
} from 'react-native';
import {Product} from '../../entities/product';
import {colors, typography, layout} from '../../shared/styles/common';
import {PressableAnimated} from '../../shared/ui/PressableAnimated.tsx';

type ProductCardProps = {
  product: Pick<Product, 'id' | 'image' | 'title' | 'price'>;
  onPress: (id: number) => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({product, onPress}) => {
  return (
    <PressableAnimated
      style={[layout.card, styles.container]}
      onPress={() => onPress(product.id)}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={[typography.subtitle, styles.title]} numberOfLines={2}>
        {product.title}
      </Text>
      <Text style={[typography.body, styles.price]}>
        ${product.price.toFixed(2)}
      </Text>
    </PressableAnimated>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.backgroundPrimary,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  price: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
