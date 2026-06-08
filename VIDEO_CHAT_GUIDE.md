# Video Chat Integration Guide

## Overview

Tom's Talented Tutoring includes **free, open-source video conferencing** powered by **Jitsi Meet**. This integration enables one-on-one and group tutoring sessions without requiring any paid API keys or exhausting credits.

## Why Jitsi Meet?

**Jitsi Meet** is the perfect solution for this app because it:

- **Completely Free**: No API keys, no subscription fees, no credit usage
- **Open Source**: Full control and transparency over the codebase
- **No Limits**: Unlimited participants, unlimited sessions, unlimited duration
- **Privacy Focused**: All data stays on your server (if self-hosted)
- **Feature Rich**: Screen sharing, recording, chat, and more
- **Mobile Friendly**: Works on iOS, Android, and web
- **Easy Integration**: Simple iframe or SDK integration

## Architecture

### Components

1. **Video Chat Service** (`lib/video-chat-service.ts`)
   - Session management logic
   - Room name generation
   - Configuration helpers
   - Status utilities

2. **Video Chat Container** (`components/video-chat-container.tsx`)
   - Jitsi Meet WebView integration
   - Event handling
   - Participant tracking
   - Recording status

3. **Session Booking Modal** (`components/session-booking-modal.tsx`)
   - Schedule tutoring sessions
   - Select session type (1-on-1 or group)
   - Choose duration and subject
   - Add notes

4. **Tutoring Screen** (`app/(tabs)/tutoring.tsx`)
   - View upcoming sessions
   - Browse featured tutors
   - Start or join sessions
   - Access session history

## How It Works

### 1. Session Creation

```typescript
import { createTutoringSession, generateRoomName } from "@/lib/video-chat-service";

const session = await createTutoringSession({
  id: "session-123",
  title: "Music Theory Basics",
  type: "one-on-one",
  subject: "Music Theory",
  tutorId: "tutor-456",
  studentIds: ["student-789"],
  duration: 60,
  startTime: new Date(),
});
```

### 2. Starting a Session

```typescript
import { VideoChatContainer } from "@/components/video-chat-container";

<VideoChatContainer
  roomName={session.roomName}
  userName={currentUser.name}
  displayName={currentUser.displayName}
  onClose={() => handleSessionEnd()}
  onParticipantJoined={(name) => console.log(`${name} joined`)}
  onParticipantLeft={(name) => console.log(`${name} left`)}
  isRecording={session.isRecording}
  onRecordingToggle={(isRecording) => updateSessionRecording(isRecording)}
/>
```

### 3. Booking a Session

```typescript
import { SessionBookingModal } from "@/components/session-booking-modal";

<SessionBookingModal
  visible={showBooking}
  onClose={() => setShowBooking(false)}
  onBook={(bookingData) => {
    // Save booking to database
    createBooking(bookingData);
  }}
  tutorName="Tom Smith"
  tutorId="tutor-123"
/>
```

## Features

### One-on-One Sessions

- Direct connection between tutor and student
- Screen sharing for demonstrations
- Chat for quick notes
- Session recording (optional)
- Maximum 2 participants

### Group Sessions

- Multiple students with one or more tutors
- Collaborative learning environment
- Breakout rooms (optional)
- Recording for later review
- Scalable to 100+ participants

### Session Management

- **Scheduling**: Book sessions in advance
- **Reminders**: Notifications before session start
- **Recording**: Automatically record sessions
- **Playback**: Access recorded sessions anytime
- **Analytics**: Track session duration and attendance

## Deployment Options

### Option 1: Public Jitsi (Recommended for Quick Start)

Use the public Jitsi Meet instance at `meet.jitsi`:

```typescript
const jitsiUrl = "https://meet.jitsi";
```

**Pros:**
- No setup required
- Instant deployment
- Reliable infrastructure

**Cons:**
- Limited customization
- Public room names (use random IDs)
- Subject to public instance policies

### Option 2: Self-Hosted Jitsi

Deploy your own Jitsi instance using Docker:

```bash
# Clone Jitsi Docker repository
git clone https://github.com/jitsi/docker-jitsi-meet.git
cd docker-jitsi-meet

# Configure environment
cp env.example .env

# Start services
docker-compose up -d
```

**Pros:**
- Full control and customization
- Private data
- Unlimited usage
- Custom branding

**Cons:**
- Server infrastructure costs
- Maintenance responsibility
- Technical setup required

### Option 3: Jitsi Cloud

Use Jitsi's managed cloud service:

```
https://cloud.jitsi.com
```

**Pros:**
- Managed infrastructure
- Professional support
- Advanced features

**Cons:**
- Paid service
- Less control
- Vendor lock-in

## Configuration

### Basic Configuration

```typescript
const config = {
  roomName: "tutoring-session-123",
  parentNode: document.getElementById("jitsi-container"),
  configOverwrite: {
    startWithAudioMuted: false,
    startWithVideoMuted: false,
    disableSimulcast: false,
    enableLipSync: true,
    prejoinPageEnabled: true,
  },
  interfaceConfigOverwrite: {
    DEFAULT_BACKGROUND: "#1f1f1f",
    SHOW_JITSI_WATERMARK: false,
    MOBILE_APP_PROMO: false,
  },
  userInfo: {
    displayName: "User Name",
  },
};
```

### Advanced Configuration

```typescript
const advancedConfig = {
  // Audio settings
  audio: {
    enableNoiseSuppression: true,
    enableEchoCancellation: true,
  },
  // Video settings
  video: {
    resolution: 720,
    constraints: {
      video: {
        height: { ideal: 720 },
        width: { ideal: 1280 },
      },
    },
  },
  // Recording settings
  recording: {
    enabled: true,
    format: "mp4",
  },
  // Toolbar customization
  toolbarButtons: [
    "microphone",
    "camera",
    "desktop",
    "fullscreen",
    "hangup",
    "recording",
    "screenshare",
    "settings",
    "stats",
    "tileview",
  ],
};
```

## Security Considerations

### Room Name Security

```typescript
// ✅ Good: Use random, unpredictable room names
const roomName = `tutoring-${generateRandomId()}-${Date.now()}`;

// ❌ Bad: Predictable room names
const roomName = `tutoring-session-1`;
```

### Authentication

For production, implement authentication:

```typescript
// Verify user is authorized to join session
async function verifySessionAccess(userId: string, sessionId: string) {
  const session = await getSession(sessionId);
  const isParticipant = session.participants.includes(userId);
  const isTutor = session.tutorId === userId;
  return isParticipant || isTutor;
}
```

### Recording Consent

Always get consent before recording:

```typescript
// Show consent dialog
showConsentDialog({
  title: "Recording Notice",
  message: "This session will be recorded. Do you consent?",
  onAgree: () => startRecording(),
  onDecline: () => disableRecording(),
});
```

## Event Handling

### Participant Events

```typescript
api.addEventListener("participantJoined", (participant) => {
  console.log(`${participant.displayName} joined`);
  updateParticipantList();
});

api.addEventListener("participantLeft", (participant) => {
  console.log(`${participant.displayName} left`);
  updateParticipantList();
});
```

### Session Events

```typescript
api.addEventListener("videoConferenceJoined", () => {
  console.log("Session started");
  startTimer();
});

api.addEventListener("videoConferenceLeft", () => {
  console.log("Session ended");
  saveSessionData();
});
```

### Recording Events

```typescript
api.addEventListener("recordingStatusChanged", (data) => {
  if (data.on) {
    console.log("Recording started");
    showRecordingIndicator();
  } else {
    console.log("Recording stopped");
    hideRecordingIndicator();
  }
});
```

## Troubleshooting

### Issue: "Connection Failed"

**Solution**: Check internet connection and Jitsi server status
```bash
# Test Jitsi connectivity
curl -I https://meet.jitsi
```

### Issue: "No Audio/Video"

**Solution**: Check browser permissions
```typescript
// Request permissions
const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
});
```

### Issue: "Participants Can't See Each Other"

**Solution**: Check firewall and NAT settings
- Ensure UDP ports 10000-20000 are open
- Check if behind restrictive firewall
- Try TURN server configuration

### Issue: "Recording Not Working"

**Solution**: Enable recording in config
```typescript
configOverwrite: {
  recordingService: {
    enabled: true,
    sharingEnabled: true,
  },
}
```

## Performance Optimization

### Bandwidth Optimization

```typescript
// Limit video quality for better performance
configOverwrite: {
  constraints: {
    video: {
      height: { ideal: 360 }, // Lower resolution
      width: { ideal: 640 },
    },
  },
  disableSimulcast: false, // Enable simulcast for better quality
}
```

### CPU Optimization

```typescript
// Disable features to reduce CPU usage
configOverwrite: {
  disableAudioLevels: true,
  disableTranscription: true,
  enableLayerSuspension: true,
}
```

## Scaling Considerations

### For 10-50 Participants

- Use public Jitsi Meet
- Standard configuration
- No special optimization needed

### For 50-500 Participants

- Consider self-hosted Jitsi
- Enable simulcast
- Optimize video quality
- Use TURN servers

### For 500+ Participants

- Use Jitsi cluster setup
- Implement load balancing
- Use CDN for content delivery
- Consider alternative solutions (livestream)

## Cost Analysis

| Solution | Setup Cost | Monthly Cost | Participant Limit |
|----------|-----------|-------------|------------------|
| Public Jitsi | $0 | $0 | Unlimited |
| Self-Hosted | $0-500 | $10-100 | Unlimited |
| Jitsi Cloud | $0 | $50-500 | Unlimited |

## Integration with Monetization

### Free Tier

- Limited to 1-on-1 sessions
- 30-minute session limit
- No recording

### Pro Tier ($9.99/mo)

- 1-on-1 and group sessions
- 60-minute session limit
- Recording enabled
- 5 sessions/month

### Studio Tier ($19.99/mo)

- Unlimited 1-on-1 and group sessions
- Unlimited duration
- Recording enabled
- Unlimited sessions

## Next Steps

1. **Test Locally**: Run the app and test video chat
2. **Configure Jitsi**: Choose deployment option
3. **Add Database Integration**: Store session history
4. **Implement Notifications**: Remind users of sessions
5. **Add Analytics**: Track session metrics
6. **Deploy to Production**: Use self-hosted or cloud Jitsi

## Resources

- **Jitsi Meet Documentation**: https://jitsi.github.io/handbook/
- **Jitsi Docker Setup**: https://github.com/jitsi/docker-jitsi-meet
- **Jitsi API Reference**: https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md
- **React Native WebView**: https://github.com/react-native-webview/react-native-webview

## Support

For issues or questions:
- Check the Jitsi documentation
- Review the troubleshooting section
- Open an issue on GitHub
- Contact support@tomstutoring.com
