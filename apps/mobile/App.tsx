import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plantopia Farms</Text>
      <Text style={styles.subtitle}>
        Fresh berries from our farm to your table.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f7f2",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1c4d2f",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5f4d",
    textAlign: "center",
  },
});
