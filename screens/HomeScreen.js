import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import RatingStars from "../components/RatingStars";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { cart, addToCart } = useCart();
  const { theme, toggleTheme, dark } = useTheme();

  // Загружаем категории
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  // Загружаем список товаров с фильтром
  useEffect(() => {
    const url =
      selectedCategory === "all"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${selectedCategory}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      
      {/* Верхняя панель */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
          backgroundColor: theme.card,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: theme.text }}>🛍 MiniShop</Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Text style={{ color: theme.accent }}>🛒 {cart.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={{ color: theme.accent }}>👤</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleTheme}>
            <Text style={{ color: theme.accent }}>{dark ? "🌙" : "☀️"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Категории */}
      <ScrollView horizontal style={{ padding: 10 }} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => setSelectedCategory("all")}
          style={{
            backgroundColor: selectedCategory === "all" ? theme.accent : theme.card,
            padding: 8,
            paddingHorizontal: 14,
            borderRadius: 20,
            marginRight: 10,
          }}
        >
          <Text style={{ color: selectedCategory === "all" ? "#fff" : theme.text }}>
            Все
          </Text>
        </TouchableOpacity>

{categories.map((cat) => (
  <TouchableOpacity
    key={cat.slug}
    onPress={() => setSelectedCategory(cat.slug)}
    style={{
      backgroundColor: selectedCategory === cat.slug ? theme.accent : theme.card,
      padding: 8,
      paddingHorizontal: 14,
      borderRadius: 20,
      marginRight: 10,
    }}
  >
    <Text style={{ color: selectedCategory === cat.slug ? "#fff" : theme.text }}>
      {cat.name}
    </Text>
  </TouchableOpacity>
))}

      </ScrollView>

      {/* Товары */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: theme.card,
              padding: 10,
              borderRadius: 10,
              marginBottom: 12,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Product", { item })}>
              <Image
                source={{ uri: item.thumbnail }}
                style={{ width: "100%", height: 150, borderRadius: 8 }}
              />

              <Text style={{ fontWeight: "bold", fontSize: 16, color: theme.text }}>
                {item.title}
              </Text>

              <RatingStars rating={item.rating} />

              <Text style={{ fontWeight: "bold", marginTop: 4, color: theme.text }}>
                ${item.price}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => addToCart(item)}
              style={{
                marginTop: 10,
                backgroundColor: theme.accent,
                padding: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>➕ В корзину</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
