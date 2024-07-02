import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProductCard} from '../../widgets/product-card';
import {RootStackParamList} from '../../app/App';
import {getProducts} from '../../entities/product';
import {useAsync} from '../../shared/lib/hooks';
import {Loader} from '../../shared/ui/Loader';
import {ErrorMessage} from '../../shared/ui/ErrorMessage';
import {colors, layout} from '../../shared/styles/common';
import {CustomHeader} from '../../widgets/custom-header';

type ProductListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

export const ProductList: React.FC = () => {
  const navigation = useNavigation<ProductListNavigationProp>();
  const {data: products, loading, error} = useAsync(getProducts);

  const handleProductPress = (id: number) => {
    navigation.navigate('ProductDetails', {id});
  };

  const renderProductList = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorMessage message={error.message} />;
    }
    if (!products) {
      return <ErrorMessage message="No products found" />;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ProductCard
              product={item}
              onPress={() => handleProductPress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContainer}
          initialNumToRender={3}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Products" />
      {renderProductList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  container: {
    ...layout.container,
    backgroundColor: colors.backgroundPrimary,
  },
  listContainer: {
    padding: 16,
  },
});
