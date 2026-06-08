import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { getJitsiMeetUrl } from "@/lib/video-chat-service";

interface VideoChatContainerProps {
  roomName: string;
  userName: string;
  displayName?: string;
  onClose?: () => void;
  onParticipantJoined?: (participantName: string) => void;
  onParticipantLeft?: (participantName: string) => void;
  isRecording?: boolean;
  onRecordingToggle?: (isRecording: boolean) => void;
}

/**
 * Video Chat Container Component
 * Integrates Jitsi Meet for video conferencing
 * Free, open-source solution with no API key required
 */
export const VideoChatContainer: React.FC<VideoChatContainerProps> = ({
  roomName,
  userName,
  displayName,
  onClose,
  onParticipantJoined,
  onParticipantLeft,
  isRecording = false,
  onRecordingToggle,
}) => {
  const colors = useColors();
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [participantCount, setParticipantCount] = useState(1);

  const jitsiMeetUrl = getJitsiMeetUrl(roomName, userName);

  const jitsiIframeHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Jitsi Meet</title>
      <script src="https://meet.jitsi/external_api.js"></script>
      <style>
        body {
          margin: 0;
          padding: 0;
          background: #1f1f1f;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        #jitsi-container {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .loading {
          color: white;
          font-size: 18px;
        }
      </style>
    </head>
    <body>
      <div id="jitsi-container">
        <div class="loading">Loading video conference...</div>
      </div>
      <script>
        const domain = "meet.jitsi";
        const options = {
          roomName: "${roomName}",
          width: "100%",
          height: "100%",
          parentNode: document.querySelector("#jitsi-container"),
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            disableSimulcast: false,
            enableLipSync: true,
            prejoinPageEnabled: true,
            toolbarButtons: [
              "microphone",
              "camera",
              "closedcaptions",
              "desktop",
              "fullscreen",
              "hangup",
              "help",
              "participants-pane",
              "profile",
              "raisehand",
              "recording",
              "screenshare",
              "settings",
              "stats",
              "tileview",
              "videoquality",
            ],
            disableProfile: false,
            enableWelcomePage: true,
            enableClosePage: true,
          },
          interfaceConfigOverwrite: {
            DEFAULT_BACKGROUND: "#1f1f1f",
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            MOBILE_APP_PROMO: false,
            LANG_DETECTION: true,
            SHOW_BRAND_WATERMARK: false,
            BRAND_WATERMARK_LINK: "",
            GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
            DISPLAY_WELCOME_PAGE_CONTENT: true,
            ALLOW_USER_INTERACTION: true,
            TOOLBAR_TIMEOUT: 4000,
            TOOLBAR_ALWAYS_VISIBLE: false,
            INITIAL_TOOLBAR_TIMEOUT: 20000,
            FILMSTRIP_MAXHEIGHT: 120,
            AUTHENTICATION_ENABLE: false,
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
            DISABLE_PRESENCE_STATUS: false,
            DISABLE_FOCUS_INDICATOR: false,
            DISABLE_DOMINANT_SPEAKER_INDICATOR: false,
            DISABLE_TRANSCRIPTION_SUBTITLES: false,
            DISABLE_RINGING: false,
            AUDIO_LEVEL_PRIMARY_COLOR: "rgba(255, 255, 255, 0.4)",
            AUDIO_LEVEL_SECONDARY_COLOR: "rgba(255, 255, 255, 0.2)",
            POLICY_LOGO: null,
            LOCAL_THUMBNAIL_RATIO: 16 / 9,
            REMOTE_THUMBNAIL_RATIO: 1,
            TILE_VIEW_MAX_COLUMNS: 5,
          },
          userInfo: {
            displayName: "${displayName || userName}",
          },
        };

        const api = new JitsiMeetExternalAPI(domain, options);

        api.addEventListener("videoConferenceJoined", () => {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "conferenceJoined",
            data: { roomName: "${roomName}" }
          }));
        });

        api.addEventListener("participantJoined", (participant) => {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "participantJoined",
            data: { participantName: participant.displayName }
          }));
        });

        api.addEventListener("participantLeft", (participant) => {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "participantLeft",
            data: { participantName: participant.displayName }
          }));
        });

        api.addEventListener("recordingStatusChanged", (data) => {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "recordingStatusChanged",
            data: { isRecording: data.on }
          }));
        });

        api.addEventListener("videoConferenceLeft", () => {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "conferenceLeft",
            data: {}
          }));
        });

        api.addEventListener("readyToClose", () => {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "readyToClose",
            data: {}
          }));
        });
      </script>
    </body>
    </html>
  `;

  const handleWebViewMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      switch (message.type) {
        case "conferenceJoined":
          setIsLoading(false);
          break;
        case "participantJoined":
          setParticipantCount((prev) => prev + 1);
          onParticipantJoined?.(message.data.participantName);
          break;
        case "participantLeft":
          setParticipantCount((prev) => Math.max(1, prev - 1));
          onParticipantLeft?.(message.data.participantName);
          break;
        case "recordingStatusChanged":
          onRecordingToggle?.(message.data.isRecording);
          break;
        case "conferenceLeft":
        case "readyToClose":
          onClose?.();
          break;
      }
    } catch (error) {
      console.error("Error handling WebView message:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isLoading && (
        <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.foreground }]}>
            Connecting to video conference...
          </Text>
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ html: jitsiIframeHTML }}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        allowsFullscreenVideo={true}
        style={styles.webview}
      />
      {/* Header with participant count and close button */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View style={styles.participantInfo}>
          <MaterialIcons name="people" size={20} color={colors.primary} />
          <Text style={[styles.participantText, { color: colors.foreground }]}>
            {participantCount} participant{participantCount !== 1 ? "s" : ""}
          </Text>
        </View>
        {isRecording && (
          <View style={styles.recordingBadge}>
            <MaterialIcons name="fiber-manual-record" size={12} color="#EA4335" />
            <Text style={styles.recordingText}>Recording</Text>
          </View>
        )}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color={colors.foreground} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    zIndex: 5,
  },
  participantInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  participantText: {
    fontSize: 14,
    fontWeight: "500",
  },
  recordingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#EA433520",
    borderRadius: 12,
  },
  recordingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#EA4335",
  },
  closeButton: {
    padding: 8,
  },
});
