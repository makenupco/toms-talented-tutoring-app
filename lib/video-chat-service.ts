/**
 * Video Chat Service
 * Handles live video conferencing for tutoring sessions using Jitsi Meet
 * Free, open-source solution - no credits required
 */

export interface VideoSession {
  id: string;
  type: "one-on-one" | "group";
  title: string;
  description?: string;
  hostId: string;
  participants: string[];
  maxParticipants: number;
  startTime: Date;
  endTime?: Date;
  roomName: string;
  isRecording: boolean;
  recordingUrl?: string;
  status: "scheduled" | "active" | "completed" | "cancelled";
}

export interface TutoringSession extends VideoSession {
  tutorId: string;
  studentIds: string[];
  subject: string;
  duration: number; // in minutes
  price?: number;
  notes?: string;
}

export interface VideoParticipant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isMuted: boolean;
  isVideoOn: boolean;
  joinedAt: Date;
}

/**
 * Generate a unique room name for Jitsi Meet
 */
export function generateRoomName(sessionId: string): string {
  return `tutoring-${sessionId}-${Date.now()}`.replace(/[^a-zA-Z0-9-]/g, "");
}

/**
 * Get Jitsi Meet configuration for embedding
 */
export function getJitsiConfig(roomName: string, userName: string) {
  return {
    roomName: roomName,
    parentNode: "jitsi-container",
    configOverwrite: {
      startWithAudioMuted: false,
      startWithVideoMuted: false,
      disableSimulcast: false,
      enableLipSync: true,
      prejoinPageEnabled: true,
      disableProfile: false,
      enableWelcomePage: true,
      enableClosePage: true,
      enableInsecureRoomNameWarning: false,
      toolbarButtons: [
        "microphone",
        "camera",
        "closedcaptions",
        "desktop",
        "fullscreen",
        "foyer",
        "hangup",
        "help",
        "highlight",
        "invite",
        "livestream",
        "microphone",
        "mute-everyone",
        "mute-video-everyone",
        "participants-pane",
        "profile",
        "raisehand",
        "recording",
        "screenshare",
        "settings",
        "shareaudio",
        "sharedvideo",
        "stats",
        "tileview",
        "toggle-camera",
        "videoquality",
      ],
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
      ENABLE_DIAL_OUT: true,
      DIAL_IN_CONF_ID: "",
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
      displayName: userName,
    },
  };
}

/**
 * Create a tutoring session
 */
export async function createTutoringSession(
  session: Partial<TutoringSession>
): Promise<TutoringSession> {
  const roomName = generateRoomName(session.id || "");
  return {
    id: session.id || `session-${Date.now()}`,
    type: session.type || "one-on-one",
    title: session.title || "Tutoring Session",
    description: session.description,
    hostId: session.hostId || "",
    participants: session.participants || [],
    maxParticipants: session.maxParticipants || (session.type === "one-on-one" ? 2 : 10),
    startTime: session.startTime || new Date(),
    endTime: session.endTime,
    roomName: roomName,
    isRecording: session.isRecording || false,
    recordingUrl: session.recordingUrl,
    status: session.status || "scheduled",
    tutorId: session.tutorId || "",
    studentIds: session.studentIds || [],
    subject: session.subject || "",
    duration: session.duration || 60,
    price: session.price,
    notes: session.notes,
  };
}

/**
 * Get Jitsi Meet embed URL
 */
export function getJitsiMeetUrl(roomName: string, userName: string): string {
  const baseUrl = "https://meet.jitsi";
  const encodedRoom = encodeURIComponent(roomName);
  const params = new URLSearchParams({
    userInfo: JSON.stringify({ displayName: userName }),
  });
  return `${baseUrl}/${encodedRoom}?${params.toString()}`;
}

/**
 * Format session duration for display
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Check if session is currently active
 */
export function isSessionActive(session: VideoSession): boolean {
  const now = new Date();
  return (
    session.status === "active" &&
    session.startTime <= now &&
    (!session.endTime || session.endTime > now)
  );
}

/**
 * Calculate session end time
 */
export function calculateEndTime(startTime: Date, durationMinutes: number): Date {
  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + durationMinutes);
  return endTime;
}

/**
 * Format session time for display
 */
export function formatSessionTime(startTime: Date, endTime?: Date): string {
  const start = startTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (!endTime) return start;
  const end = endTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${start} - ${end}`;
}

/**
 * Validate session before starting
 */
export function validateSession(session: VideoSession): { valid: boolean; error?: string } {
  if (!session.roomName) {
    return { valid: false, error: "Room name is required" };
  }
  if (session.participants.length === 0) {
    return { valid: false, error: "At least one participant is required" };
  }
  if (session.participants.length > session.maxParticipants) {
    return {
      valid: false,
      error: `Maximum ${session.maxParticipants} participants allowed`,
    };
  }
  return { valid: true };
}

/**
 * Get session status badge color
 */
export function getSessionStatusColor(status: VideoSession["status"]): string {
  switch (status) {
    case "scheduled":
      return "#FBBC04"; // Yellow
    case "active":
      return "#34A853"; // Green
    case "completed":
      return "#5F6368"; // Gray
    case "cancelled":
      return "#EA4335"; // Red
    default:
      return "#5F6368";
  }
}
