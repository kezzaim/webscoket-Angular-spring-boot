package web.socket.demo.websocket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class WebSocketService {

   private final SimpMessagingTemplate simpMessagingTemplate;

    public WebSocketService(SimpMessagingTemplate simpMessagingTemplate){
        this.simpMessagingTemplate= simpMessagingTemplate;
    }

    public void sendMessage(String sessionID, Object message) {
        log.info("suffix : {}", sessionID);
       this.simpMessagingTemplate.convertAndSend("/topic/public", message);
//        this.simpMessagingTemplate.convertAndSendToUser("test","/topic/private", message);


    }
}
