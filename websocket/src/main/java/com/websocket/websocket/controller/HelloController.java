package com.websocket.websocket.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public String getHelloMessage() {
        return "Hello from Spring Boot!";
    }
}
