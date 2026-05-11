import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Ofertas especiais
const specials = [
  {
    id: "1",
    title: "Combo Família",
    description: "2 Pizzas Grandes + Pão de Alho + Refrigerante 2L",
    originalPrice: 169.9,
    specialPrice: 109.9,
    badge: "ECONOMIA 35%",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
  },
  {
    id: "2",
    title: "Happy Hour",
    description: "Pizza Média + Salada + Bebida",
    originalPrice: 79.9,
    specialPrice: 59.9,
    badge: "15h-17h",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
  },
  {
    id: "3",
    title: "Fim de Semana",
    description: "3 Pizzas Médias do seu jeito",
    originalPrice: 149.9,
    specialPrice: 89.9,
    badge: "40% OFF",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
  },
  {
    id: "4",
    title: "Desconto Estudante",
    description: "Mostre sua carteirinha e ganhe 20% de desconto",
    originalPrice: 0,
    specialPrice: 0,
    badge: "20% OFF",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
  },
  {
    id: "5",
    title: "Pacote Festa",
    description: "5 Pizzas Grandes + 2 Acompanhamentos + 4 Bebidas",
    originalPrice: 299.9,
    specialPrice: 189.9,
    badge: "MELHOR CUSTO",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400",
  },
];

export default function SpecialsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FF6B35", dark: "#C44518" }}
      headerImage={<Text style={styles.headerEmoji}>🏷️</Text>}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Ofertas Especiais</ThemedText>
      </ThemedView>

      <ThemedText style={styles.subtitle}>
        Não perca essas ofertas incríveis!
      </ThemedText>

      <View style={styles.specialsList}>
        {specials.map((special) => (
          <View
            key={special.id}
            style={[
              styles.specialCard,
              {
                backgroundColor: colorScheme === "dark" ? "#1D3D47" : "#FFFFFF",
              },
            ]}
          >
            <View style={styles.specialBadgeContainer}>
              <View
                style={[styles.specialBadge, { backgroundColor: colors.tint }]}
              >
                <Text style={styles.specialBadgeText}>{special.badge}</Text>
              </View>
            </View>

            <Image
              source={{ uri: special.image }}
              style={styles.specialImage}
              resizeMode="cover"
            />

            <View style={styles.specialInfo}>
              <Text
                style={[
                  styles.specialTitle,
                  { color: colorScheme === "dark" ? "#ECEDEE" : "#11181C" },
                ]}
              >
                {special.title}
              </Text>
              <Text
                style={[
                  styles.specialDescription,
                  { color: colorScheme === "dark" ? "#9BA1A6" : "#687076" },
                ]}
              >
                {special.description}
              </Text>

              <View style={styles.priceContainer}>
                {special.originalPrice > 0 && (
                  <Text
                    style={[
                      styles.originalPrice,
                      {
                        color: colorScheme === "dark" ? "#9BA1A6" : "#687076",
                      },
                    ]}
                  >
                    R$ {special.originalPrice.toFixed(2).replace(".", ",")}
                  </Text>
                )}
                <Text style={[styles.specialPrice, { color: colors.tint }]}>
                  {special.originalPrice > 0
                    ? `R$ ${special.specialPrice.toFixed(2).replace(".", ",")}`
                    : special.badge}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.orderButton, { backgroundColor: colors.tint }]}
              >
                <Text style={styles.orderButtonText}>Pedir Agora</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerEmoji: {
    fontSize: 100,
    position: "absolute",
    bottom: 0,
    left: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  subtitle: {
    paddingHorizontal: 16,
    marginBottom: 20,
    opacity: 0.7,
  },
  specialsList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  specialCard: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  specialBadgeContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  specialBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specialBadgeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  specialImage: {
    width: "100%",
    height: 120,
  },
  specialInfo: {
    padding: 12,
  },
  specialTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  specialDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  specialPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  orderButton: {
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  orderButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
