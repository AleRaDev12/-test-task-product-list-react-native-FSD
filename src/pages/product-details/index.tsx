import React, {FC} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../app/App';
import {getProductById} from '../../entities/product';
import {useAsync} from '../../shared/lib/hooks';
import {colors, layout, typography} from '../../shared/styles/common';
import {CustomHeader} from '../../widgets/custom-header';
import {Loader} from '../../shared/ui/Loader';
import {ErrorMessage} from '../../shared/ui/ErrorMessage';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

export const ProductDetails: FC = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const {id} = route.params;
  const {
    data: product,
    loading,
    error,
  } = useAsync(() => getProductById(id), [id]);

  const renderProductDetails = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorMessage message={error.message} />;
    }
    if (!product) {
      return null;
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{uri: product.image}} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={typography.title}>{product.title}</Text>
          <Text style={[typography.body, styles.price]}>
            ${product.price.toFixed(2)}
          </Text>
          <Text style={[typography.body, styles.description]}>
            {product.description}
          </Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Product Details" showBackButton />
      {renderProductDetails()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    ...layout.container,
    padding: 16,
    backgroundColor: colors.backgroundPrimary,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
  },
  price: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
  },
  description: {
    lineHeight: 22,
  },
});
