import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const AboutScreen = () => {
  const data = [
    {
      id: '1',
      title: 'e-CZANEM',
      description:
        'Bir mobil eczane uygulaması olarak 2023 yılında kullanıcılara sunulmuş olan e-CZANEM, temelinde kullanıcıların ilaçlarına kolayca erişmesini sağlayarak eczane hasta arasındaki iletişimi hızlandırmayı hedeflemektedir.',
      color: '#FFC107',
    },
    {
      id: '2',
      title: 'Amaç',
      description:
        'Amacımız, kullanıcıların ilaç, vitamin, takviye gıda vb. ihtiyaçlarına hızlı ve güvenli bir şekilde ulaşmalarını sağlamak ve sağlık sektörüne değer katmaktır.',
      color: '#FF5722',
    },
    {
      id: '3',
      title: 'Kullanıcı Dostu Arayüz',
      description:
        'Uygulama, kullanıcı dostu arayüzü ve kapsamlı ürün veritabanıyla kullanıcıların ihtiyaçlarını karşılamak için tasarlanmıştır.',
      color: '#4CAF50',
    },
    {
      id: '4',
      title: 'Denetimli İlaç Kullanımı Sağlama',
      description:
        'Uygulamanın esaslarından bir diğeri ise kullanıcıların siparişlerinin kaydını tutarak denetimsiz ilaç kullanımını önlemektir.',
      color: '#2ba5cc',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:0,
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  itemDescription: {
    fontSize: 16,
    color: '#fff',
  },
});

export default AboutScreen;
