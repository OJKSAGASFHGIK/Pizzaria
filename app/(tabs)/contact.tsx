import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Dados das unidades
const locations = [
  {
    id: "1",
    name: "Centro",
    address: "Rua das Pizzarias, 123",
    city: "São Paulo, SP 01001-000",
    phone: "(11) 99999-0001",
    hours: "10:00h - 23:00h",
  },
  {
    id: "2",
    name: "Zona Sul",
    address: "Avenida dos Sabores, 456",
    city: "São Paulo, SP 02002-000",
    phone: "(11) 99999-0002",
    hours: "11:00h - 22:00h",
  },
  {
    id: "3",
    name: "Zona Norte",
    address: "Rua da Massa, 789",
    city: "São Paulo, SP 03003-000",
    phone: "(11) 99999-0003",
    hours: "10:00h - 23:00h",
  },
];

export default function ContactScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleDirections = (address: string, city: string) => {
    const fullAddress = `${address}, ${city}`;
    Linking.openURL(
      `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`,
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#9C27B0", dark: "#6A1B9A" }}
      headerImage={<Text style={styles.headerEmoji}>📍</Text>}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Encontre-nos</ThemedText>
      </ThemedView>

      <ThemedText style={styles.subtitle}>
        Visite uma de nossas unidades ou ligue para nós!
      </ThemedText>

      <View style={styles.locationsList}>
        {locations.map((location) => (
          <View
            key={location.id}
            style={[
              styles.locationCard,
              {
                backgroundColor: colorScheme === "dark" ? "#1D3D47" : "#FFFFFF",
              },
            ]}
          >
            <View style={styles.locationHeader}>
              <View
                style={[styles.locationIcon, { backgroundColor: colors.tint }]}
              >
                <Text style={styles.locationIconText}>🍕</Text>
              </View>
              <Text
                style={[
                  styles.locationName,
                  { color: colorScheme === "dark" ? "#ECEDEE" : "#11181C" },
                ]}
              >
                {location.name}
              </Text>
            </View>

            <View style={styles.locationDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>📍</Text>
                <View style={styles.detailText}>
                  <Text
                    style={[
                      styles.detailLabel,
                      {
                        color: colorScheme === "dark" ? "#9BA1A6" : "#687076",
                      },
                    ]}
                  >
                    Endereço
                  </Text>
                  <Text
                    style={[
                      styles.detailValue,
                      {
                        color: colorScheme === "dark" ? "#ECEDEE" : "#11181C",
                      },
                    ]}
                  >
                    {location.address}
                  </Text>
                  <Text
                    style={[
                      styles.detailSubValue,
                      {
                        color: colorScheme === "dark" ? "#9BA1A6" : "#687076",
                      },
                    ]}
                  >
                    {location.city}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>📞</Text>
                <View style={styles.detailText}>
                  <Text
                    style={[
                      styles.detailLabel,
                      {
                        color: colorScheme === "dark" ? "#9BA1A6" : "#687076",
                      },
                    ]}
                  >
                    Telefone
                  </Text>
                  <TouchableOpacity onPress={() => handleCall(location.phone)}>
                    <Text style={[styles.detailValue, { color: colors.tint }]}>
                      {location.phone}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>🕐</Text>
                <View style={styles.detailText}>
                  <Text
                    style={[
                      styles.detailLabel,
                      {
                        color: colorScheme === "dark" ? "#9BA1A6" : "#687076",
                      },
                    ]}
                  >
                    Horário
                  </Text>
                  <Text
                    style={[
                      styles.detailValue,
                      {
                        color: colorScheme === "dark" ? "#ECEDEE" : "#11181C",
                      },
                    ]}
                  >
                    {location.hours}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.directionsButton,
                { backgroundColor: colors.tint },
              ]}
              onPress={() => handleDirections(location.address, location.city)}
            >
              <Text style={styles.directionsButtonText}>Como Chegar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View
        style={[
          styles.contactCard,
          {
            backgroundColor: colorScheme === "dark" ? "#1D3D47" : "#FFFFFF",
          },
        ]}
      >
        <Text
          style={[
            styles.contactTitle,
            { color: colorScheme === "dark" ? "#ECEDEE" : "#11181C" },
          ]}
        >
          Fale Conosco
        </Text>
        <Text
          style={[
            styles.contactText,
            { color: colorScheme === "dark" ? "#9BA1A6" : "#687076" },
          ]}
        >
          Tem dúvidas ou sugestões? Adoraríamos ouvir você!
        </Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: colors.tint }]}
            onPress={() => Linking.openURL("mailto:ola@pizzaria.com")}
          >
            <Text style={styles.socialButtonText}>📧 E-mail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: colors.tint }]}
            onPress={() => Linking.openURL("sms:+5511999990000")}
          >
            <Text style={styles.socialButtonText}>💬 SMS</Text>
          </TouchableOpacity>
        </View>
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
  locationsList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  locationCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  locationIconText: {
    fontSize: 20,
  },
  locationName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  locationDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  detailIcon: {
    fontSize: 16,
    marginTop: 2,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailSubValue: {
    fontSize: 14,
  },
  directionsButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 16,
  },
  directionsButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  contactCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contactText: {
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  socialButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
