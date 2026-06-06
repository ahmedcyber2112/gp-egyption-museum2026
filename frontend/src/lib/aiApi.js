import { apiRequest } from "./api";

export function sendAiChat({ message, sessionId, imageBase64, imageMimeType, source = "web" }) {
    return apiRequest("/api/ai/chat", {
        method: "POST",
        body: {
            message: message || "",
            sessionId,
            imageBase64: imageBase64 || null,
            imageMimeType: imageMimeType || null,
            source,
        },
    });
}
