package com.websocket.websocket.config;

import com.websocket.websocket.model.ChatMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class ChatWebSocketHandler extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("Connection established: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // แปลงข้อความที่รับเข้ามาเป็น ChatMessage
        ChatMessage chatMessage = objectMapper.readValue(message.getPayload(), ChatMessage.class);

        if ("join".equals(chatMessage.getType())) {
            chatMessage.setMessage(chatMessage.getUsername() + " has joined the chat!");
        } else if ("leave".equals(chatMessage.getType())) {
            chatMessage.setMessage(chatMessage.getUsername() + " has left the chat.");
        }

        // ส่งข้อความให้ทุก session
        for (WebSocketSession s : sessions) {
            if (s.isOpen()) {
                s.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMessage)));
            }
        }

        // ดีบัก: แสดงข้อความที่ส่งออก
        System.out.println("Broadcasted message: " + chatMessage.getMessage());
    }


    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        sessions.remove(session);
    }
}
