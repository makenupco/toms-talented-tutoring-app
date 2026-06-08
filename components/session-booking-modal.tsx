import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";

interface SessionBookingModalProps {
  visible: boolean;
  onClose: () => void;
  onBook: (session: BookingData) => void;
  tutorName?: string;
  tutorId?: string;
}

interface BookingData {
  tutorId: string;
  sessionType: "one-on-one" | "group";
  subject: string;
  date: string;
  time: string;
  duration: number;
  notes?: string;
}

/**
 * Session Booking Modal Component
 * Allows users to schedule tutoring sessions
 */
export const SessionBookingModal: React.FC<SessionBookingModalProps> = ({
  visible,
  onClose,
  onBook,
  tutorName = "Select Tutor",
  tutorId = "",
}) => {
  const colors = useColors();
  const [sessionType, setSessionType] = useState<"one-on-one" | "group">("one-on-one");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState("");

  const handleBook = () => {
    if (!subject || !date || !time) {
      alert("Please fill in all required fields");
      return;
    }

    onBook({
      tutorId,
      sessionType,
      subject,
      date,
      time,
      duration,
      notes,
    });
  };

  if (!visible) return null;

  return (
    <View style={[styles.overlay, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}>
      <View style={[styles.modal, { backgroundColor: colors.surface }]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.foreground }]}>Book a Session</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={24} color={colors.foreground} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Tutor Info */}
          <View style={[styles.section, { backgroundColor: colors.background }]}>
            <Text style={[styles.label, { color: colors.muted }]}>Tutor</Text>
            <View
              style={[
                styles.tutorInfo,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <MaterialIcons name="person" size={24} color={colors.primary} />
              <Text style={[styles.tutorName, { color: colors.foreground }]}>{tutorName}</Text>
            </View>
          </View>

          {/* Session Type */}
          <View style={styles.section}>
            <Text style={[styles.label, { color: colors.muted }]}>Session Type</Text>
            <View style={styles.typeButtons}>
              {(["one-on-one", "group"] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSessionType(type)}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor:
                        sessionType === type ? colors.primary : colors.background,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      { color: sessionType === type ? "white" : colors.foreground },
                    ]}
                  >
                    {type === "one-on-one" ? "1-on-1" : "Group"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Subject */}
          <View style={styles.section}>
            <Text style={[styles.label, { color: colors.muted }]}>Subject</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.foreground,
                },
              ]}
              placeholder="e.g., Music Theory, Songwriting"
              placeholderTextColor={colors.muted}
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          {/* Date and Time */}
          <View style={styles.row}>
            <View style={[styles.section, { flex: 1 }]}>
              <Text style={[styles.label, { color: colors.muted }]}>Date</Text>
              <TouchableOpacity
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    justifyContent: "center",
                  },
                ]}
              >
                <Text style={[{ color: date ? colors.foreground : colors.muted }]}>
                  {date || "Select date"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.section, { flex: 1 }]}>
              <Text style={[styles.label, { color: colors.muted }]}>Time</Text>
              <TouchableOpacity
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    justifyContent: "center",
                  },
                ]}
              >
                <Text style={[{ color: time ? colors.foreground : colors.muted }]}>
                  {time || "Select time"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Duration */}
          <View style={styles.section}>
            <Text style={[styles.label, { color: colors.muted }]}>Duration</Text>
            <View style={styles.durationButtons}>
              {[30, 45, 60, 90].map((mins) => (
                <TouchableOpacity
                  key={mins}
                  onPress={() => setDuration(mins)}
                  style={[
                    styles.durationButton,
                    {
                      backgroundColor:
                        duration === mins ? colors.primary : colors.background,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.durationButtonText,
                      { color: duration === mins ? "white" : colors.foreground },
                    ]}
                  >
                    {mins}m
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={[styles.label, { color: colors.muted }]}>Notes (Optional)</Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.foreground,
                },
              ]}
              placeholder="Any specific topics or questions?"
              placeholderTextColor={colors.muted}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Price Info */}
          <View
            style={[
              styles.priceInfo,
              {
                backgroundColor: colors.primary + "10",
                borderColor: colors.primary,
              },
            ]}
          >
            <MaterialIcons name="info" size={20} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.priceLabel, { color: colors.foreground }]}>
                Session Price
              </Text>
              <Text style={[styles.priceValue, { color: colors.primary }]}>
                ${(duration / 60) * 29.99} USD
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <TouchableOpacity
            onPress={onClose}
            style={[
              styles.button,
              { backgroundColor: colors.background, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.buttonText, { color: colors.foreground }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleBook}
            style={[styles.button, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>Book Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    zIndex: 100,
  },
  modal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tutorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  tutorName: {
    fontSize: 14,
    fontWeight: "500",
  },
  typeButtons: {
    flexDirection: "row",
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  durationButtons: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  durationButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minWidth: "22%",
    alignItems: "center",
  },
  durationButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
  textArea: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    textAlignVertical: "top",
  },
  priceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
