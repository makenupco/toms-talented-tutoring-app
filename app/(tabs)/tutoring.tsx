import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface Session {
  id: string;
  title: string;
  type: "one-on-one" | "group";
  subject: string;
  tutor: string;
  time: string;
  duration: string;
  participants: number;
  status: "scheduled" | "active" | "completed";
  price?: number;
}

const MOCK_SESSIONS: Session[] = [
  {
    id: "1",
    title: "Music Theory Basics",
    type: "one-on-one",
    subject: "Music Theory",
    tutor: "Tom Smith",
    time: "Today at 3:00 PM",
    duration: "60 min",
    participants: 2,
    status: "scheduled",
    price: 29.99,
  },
  {
    id: "2",
    title: "Group Songwriting Workshop",
    type: "group",
    subject: "Songwriting",
    tutor: "Sarah Johnson",
    time: "Tomorrow at 6:00 PM",
    duration: "90 min",
    participants: 5,
    status: "scheduled",
    price: 19.99,
  },
  {
    id: "3",
    title: "Vocal Training Session",
    type: "one-on-one",
    subject: "Vocals",
    tutor: "Emma Davis",
    time: "Wed at 2:00 PM",
    duration: "45 min",
    participants: 2,
    status: "scheduled",
    price: 34.99,
  },
];

export default function TutoringScreen() {
  const colors = useColors();
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return colors.success;
      case "scheduled":
        return colors.warning;
      case "completed":
        return colors.muted;
      default:
        return colors.primary;
    }
  };

  const renderSessionCard = ({ item }: { item: Session }) => (
    <TouchableOpacity
      onPress={() => setSelectedSession(item)}
      style={{
        marginBottom: 12,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View style={{ padding: 16, gap: 12 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 13, color: colors.muted }}>
              {item.subject} • {item.type === "one-on-one" ? "1-on-1" : "Group"}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 20,
              backgroundColor: getStatusColor(item.status) + "20",
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: "600", color: getStatusColor(item.status) }}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        {/* Details */}
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialIcons name="person" size={16} color={colors.muted} />
            <Text style={{ fontSize: 13, color: colors.muted }}>Tutor: {item.tutor}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialIcons name="schedule" size={16} color={colors.muted} />
            <Text style={{ fontSize: 13, color: colors.muted }}>{item.time}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <MaterialIcons name="timer" size={16} color={colors.muted} />
            <Text style={{ fontSize: 13, color: colors.muted }}>{item.duration}</Text>
          </View>
          {item.price && (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <MaterialIcons name="attach-money" size={16} color={colors.primary} />
              <Text style={{ fontSize: 13, fontWeight: "600", color: colors.primary }}>
                ${item.price}
              </Text>
            </View>
          )}
        </View>

        {/* Action Button */}
        {item.status === "active" ? (
          <TouchableOpacity
            style={{
              backgroundColor: colors.success,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
              Join Session
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
              View Details
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ gap: 24 }}>
          {/* Header */}
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 28, fontWeight: "700", color: colors.foreground }}>
              Live Tutoring
            </Text>
            <Text style={{ fontSize: 14, color: colors.muted }}>
              Connect with expert tutors for one-on-one and group sessions
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colors.primary,
                paddingVertical: 14,
                borderRadius: 10,
                alignItems: "center",
                gap: 8,
              }}
            >
              <MaterialIcons name="video-call" size={24} color="white" />
              <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>
                Start Session
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                paddingVertical: 14,
                borderRadius: 10,
                alignItems: "center",
                gap: 8,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <MaterialIcons name="add-circle-outline" size={24} color={colors.primary} />
              <Text style={{ color: colors.primary, fontWeight: "600", fontSize: 12 }}>
                Schedule
              </Text>
            </TouchableOpacity>
          </View>

          {/* Upcoming Sessions */}
          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: colors.foreground }}>
                Upcoming Sessions
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 13, color: colors.primary, fontWeight: "500" }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={MOCK_SESSIONS}
              renderItem={renderSessionCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>

          {/* Tutors Section */}
          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: colors.foreground }}>
              Featured Tutors
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }}>
              {[1, 2, 3].map((i) => (
                <View
                  key={i}
                  style={{
                    width: 150,
                    marginHorizontal: 8,
                    backgroundColor: colors.surface,
                    borderRadius: 12,
                    padding: 12,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      backgroundColor: colors.primary + "30",
                      alignSelf: "center",
                      marginBottom: 12,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MaterialIcons name="person" size={40} color={colors.primary} />
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, textAlign: "center" }}>
                    Tutor {i}
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.muted, textAlign: "center", marginTop: 4 }}>
                    Music Theory
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginTop: 12,
                      paddingVertical: 8,
                      backgroundColor: colors.primary,
                      borderRadius: 6,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>
                      Book Now
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Info Section */}
          <View
            style={{
              backgroundColor: colors.primary + "10",
              borderRadius: 12,
              padding: 16,
              gap: 12,
              borderLeftWidth: 4,
              borderLeftColor: colors.primary,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground }}>
              💡 How It Works
            </Text>
            <Text style={{ fontSize: 13, color: colors.muted, lineHeight: 20 }}>
              Schedule a session with a tutor, join the video call, and start learning. Sessions are recorded
              for your reference and can be accessed anytime.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
