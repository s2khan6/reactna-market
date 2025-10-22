import { View, Text, Image, Button, Alert } from "react-native";
import { useCart } from "../context/CartContext";

export default function ProductScreen({ route, navigation }) {
  const { item } = route.params;	
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(item);
    Alert.alert("✅ Успех", "Товар добавлен в корзину!");
  };

  return (
    <View style={{ padding: 16 }}>
      <Image
        source={{ uri: item.thumbnail }}
        style={{ width: "100%", height: 250, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 10 }}>
        {item.title}
      </Text>
      <Text>{item.description}</Text>
      <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>
        Price: ${item.price}
      </Text>
      <Button title="Добавить в корзину" onPress={handleAdd} />
      <View style={{ marginTop: 10 }}>
        <Button title="Открыть корзину" onPress={() => navigation.navigate("Cart")} />
      </View>
    </View>
  );
}
