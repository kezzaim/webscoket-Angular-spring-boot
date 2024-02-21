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

    public void sendMessage(Object message) {
       this.simpMessagingTemplate.convertAndSend("/queue/public", message);
    }
    public void sendMessageToUserId(String sessionID, Object message) {
        log.info("suffix : {}", sessionID);
        this.simpMessagingTemplate.convertAndSendToUser(sessionID,"/queue/reply", message);


    }
}
