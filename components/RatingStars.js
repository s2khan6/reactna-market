import { View, Text } from "react-native";

export default function RatingStars({ rating }) {
  const stars = Math.round(rating);

  return (
    <View style={{ flexDirection: "row", marginTop: 4 }}>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Text
            key={i}
            style={{ fontSize: 16, color: i < stars ? "#f59e0b" : "#d1d5db" }}
          >
            ★
          </Text>
        ))}
    </View>
  );
}
