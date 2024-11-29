package com.websocket.websocket.model;

public class ChatMessage {
    private String type; // "join", "leave", "chat"
    private String username;
    private String message;

    // Constructors, Getters, Setters
    public ChatMessage() {}

    public ChatMessage(String type, String username, String message) {
        this.type = type;
        this.username = username;
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
