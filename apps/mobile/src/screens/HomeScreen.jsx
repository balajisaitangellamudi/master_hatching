import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// ─── Demo Data ───────────────────────────────────────────────────────────────
const DEMO_STATS = [
  { value: "2", label: "Online", color: "#22D3EE" },
  { value: "35", label: "Total Eggs", color: "#F97316" },
  { value: "100%", label: "Uptime", color: "#A855F7" },
];

const DEMO_INCUBATORS = [
  {
    id: "1",
    name: "Incubator #001",
    code: "INC-2024-001",
    status: "ONLINE",
    temp: "37.5°",
    humidity: "55%",
    eggs: "15",
    hatchingIn: "21 days",
    iconBg: "#10B981",
  },
  {
    id: "2",
    name: "Incubator #002",
    code: "INC-2024-002",
    status: "ONLINE",
    temp: "38°",
    humidity: "58%",
    eggs: "20",
    hatchingIn: "18 days",
    iconBg: "#10B981",
  },
  {
    id: "3",
    name: "Barn Incubator",
    code: "INC-2024-003",
    status: "OFFLINE",
    temp: "25°",
    humidity: "45%",
    eggs: "0",
    hatchingIn: null,
    iconBg: "#F97316",
  },
];

const TAB_ITEMS = [
  { key: "home", icon: "home", label: "Home" },
  { key: "logs", icon: "bar-chart", label: "Logs" },
  { key: "control", icon: "settings", label: "Control" },
  { key: "profile", icon: "person", label: "Profile" },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ value, label, color }) => (
  <View style={styles.statCard}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// ─── Metric Box ───────────────────────────────────────────────────────────────
const MetricBox = ({ iconName, iconColor, value, label, dim }) => (
  <View style={[styles.metricBox, dim && styles.metricBoxDim]}>
    <Ionicons
      name={iconName}
      size={17}
      color={dim ? "#5A4A7A" : iconColor}
      style={styles.metricIcon}
    />
    <Text style={[styles.metricValue, dim && styles.dimText]}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

// ─── Incubator Card ──────────────────────────────────────────────────────────
const IncubatorCard = ({ item }) => {
  const isOffline = item.status === "OFFLINE";

  return (
    <TouchableOpacity
      style={styles.incubatorCard}
      activeOpacity={0.85}
      activeScale={0.98}
    >
      {/* Header Row */}
      <View style={styles.cardHeader}>
        <View
          style={[styles.incubatorIconBox, { backgroundColor: item.iconBg }]}
        >
          <Ionicons name="home" size={22} color="#FFFFFF" />
        </View>
        <View style={styles.cardTitleWrap}>
          <Text style={[styles.cardName, isOffline && styles.dimText]}>
            {item.name}
          </Text>
          <Text style={styles.cardCode}>{item.code}</Text>
        </View>
        <View
          style={[
            styles.statusPill,
            isOffline ? styles.pillOffline : styles.pillOnline,
          ]}
        >
          <Text
            style={[
              styles.pillText,
              isOffline ? styles.pillTextOffline : styles.pillTextOnline,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      {/* Metrics */}
      <View style={styles.metricsRow}>
        <MetricBox
          iconName="thermometer"
          iconColor="#F97316"
          value={item.temp}
          label="Temp"
          dim={isOffline}
        />
        <MetricBox
          iconName="water"
          iconColor="#60A5FA"
          value={item.humidity}
          label="Humidity"
          dim={isOffline}
        />
        <MetricBox
          iconName="ellipse-outline"
          iconColor="#C084FC"
          value={item.eggs}
          label="Eggs"
          dim={isOffline}
        />
      </View>

      {/* Hatching Footer */}
      {item.hatchingIn && (
        <View style={styles.hatchingRow}>
          <Text style={styles.hatchingLabel}>Hatching in</Text>
          <Text style={styles.hatchingValue}>{item.hatchingIn}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// ─── Bottom Tab Bar ──────────────────────────────────────────────────────────
const BottomTabBar = ({ activeTab, onTabPress }) => (
  <View style={styles.tabBar}>
    {TAB_ITEMS.map((tab) => {
      const isActive = tab.key === activeTab;
      return (
        <TouchableOpacity
          key={tab.key}
          style={styles.tabItem}
          onPress={() => onTabPress(tab.key)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isActive ? tab.icon : `${tab.icon}-outline`}
            size={22}
            color={isActive ? "#A855F7" : "#7C6FA0"}
          />
          <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

// ─── Home Screen ─────────────────────────────────────────────────────────────
const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <LinearGradient
      colors={["#2D0B6B", "#4C1D95", "#5B21B6", "#4C1D95", "#3B0D82"]}
      locations={[0, 0.25, 0.5, 0.75, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.root}
    >
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header ── */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>My Incubators</Text>
              <Text style={styles.headerSub}>3 devices connected</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerBtn} activeOpacity={0.75}>
                <Ionicons name="sunny-outline" size={20} color="#C4B5FD" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerBtn} activeOpacity={0.75}>
                <Ionicons name="person-outline" size={20} color="#C4B5FD" />
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Stats Row ── */}
          <View style={styles.statsRow}>
            {DEMO_STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </View>

          {/* ── Incubator Cards ── */}
          {DEMO_INCUBATORS.map((item) => (
            <IncubatorCard key={item.id} item={item} />
          ))}

          {/* ── Add New Incubator ── */}
          <TouchableOpacity style={styles.addCard} activeOpacity={0.75}>
            <Text style={styles.addPlus}>+</Text>
            <Text style={styles.addTitle}>Add New Incubator</Text>
            <Text style={styles.addSubtitle}>
              Connect via QR code or Device ID
            </Text>
          </TouchableOpacity>

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>

      {/* ── Tab Bar ── */}
      <SafeAreaView style={styles.tabBarSafe} edges={["bottom"]}>
        <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

// ─── Styles ──────────────────────────────────────────────────────────────────
const CARD_BG = "rgba(60, 20, 110, 0.55)";
const METRIC_BG = "rgba(80, 30, 130, 0.5)";

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.1,
  },
  headerSub: {
    color: "#9D8DC4",
    fontSize: 13,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(80, 40, 140, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(180, 140, 255, 0.15)",
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(180, 140, 255, 0.12)",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    color: "#9D8DC4",
    fontSize: 12,
  },

  // Incubator Card
  incubatorCard: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(180, 140, 255, 0.12)",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  incubatorIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardTitleWrap: { flex: 1 },
  cardName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  cardCode: {
    color: "#9D8DC4",
    fontSize: 12,
    marginTop: 2,
  },
  dimText: { color: "#5A4A7A" },

  // Status Pills
  statusPill: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1.5,
  },
  pillOnline: {
    borderColor: "#2DD4BF",
    backgroundColor: "rgba(45, 212, 191, 0.08)",
  },
  pillOffline: {
    borderColor: "#F87171",
    backgroundColor: "rgba(248, 113, 113, 0.18)",
  },
  pillText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  pillTextOnline: { color: "#2DD4BF" },
  pillTextOffline: { color: "#F87171" },

  // Metrics
  metricsRow: {
    flexDirection: "row",
    gap: 8,
  },
  metricBox: {
    flex: 1,
    backgroundColor: METRIC_BG,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(180, 140, 255, 0.1)",
  },
  metricBoxDim: {
    backgroundColor: "rgba(50, 20, 80, 0.4)",
  },
  metricIcon: { marginBottom: 6 },
  metricValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 3,
  },
  metricLabel: {
    color: "#9D8DC4",
    fontSize: 11,
  },

  // Hatching
  hatchingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(180, 140, 255, 0.1)",
  },
  hatchingLabel: { color: "#9D8DC4", fontSize: 13 },
  hatchingValue: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },

  // Add Card
  addCard: {
    borderWidth: 1.5,
    borderColor: "rgba(168, 85, 247, 0.35)",
    borderStyle: "dashed",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: "rgba(60, 10, 100, 0.2)",
  },
  addPlus: {
    color: "#A855F7",
    fontSize: 32,
    fontWeight: "300",
    marginBottom: 8,
    lineHeight: 36,
  },
  addTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  addSubtitle: { color: "#9D8DC4", fontSize: 12 },

  // Tab Bar
  tabBarSafe: { backgroundColor: "#1E0A4A" },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#1E0A4A",
    borderTopWidth: 1,
    borderTopColor: "rgba(168, 85, 247, 0.15)",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingVertical: 2,
  },
  tabLabel: { color: "#7C6FA0", fontSize: 11 },
  tabLabelActive: { color: "#A855F7", fontWeight: "600" },
});
