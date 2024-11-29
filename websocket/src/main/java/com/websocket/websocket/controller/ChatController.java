package com.websocket.websocket.controller;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final List<String> chatHistory = new ArrayList<>();

    @GetMapping("/history")
    public List<String> getChatHistory() {
        return chatHistory;
    }

    @PostMapping("/send")
    public String sendMessage(@RequestBody String message) {
        chatHistory.add(message);
        return "Message received: " + message;
    }
}

