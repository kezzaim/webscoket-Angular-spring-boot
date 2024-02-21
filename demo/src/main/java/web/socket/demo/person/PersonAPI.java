package web.socket.demo.person;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import web.socket.demo.WebsocketApplication;
import web.socket.demo.websocket.WebSocketService;

import java.util.List;

@RestController
@Slf4j
public class PersonAPI {


    private final WebSocketService webSocketService;

    private final PersonRepository personRepository;


    public PersonAPI(
            WebSocketService webSocketService,
            PersonRepository personRepository
    ) {
        this.webSocketService = webSocketService;
        this.personRepository = personRepository;
    }


    @GetMapping("/api/persons")
    public String getPerson() {
        log.info("this api person");
        return "aoi person";
    }

    //    @MessageMapping("/api/persons/list")
    @GetMapping("/api/persons/list")
    public List<PersonModel> getListPerson() {
        log.info("get all persons");
        //this.webSocketService.sendMessage("public", "back end : all person");
        return this.personRepository.findAll();
    }

    @MessageMapping("/persons/save")
    @Transactional
    // @SendTo("/topic/public")
    public PersonModel savePerson(@Payload PersonModel person,  SimpMessageHeaderAccessor headerAccessor) {
        log.info("save a person : {}", person);
        person = this.personRepository.save(person);
        String sessionId = headerAccessor.getSessionId();
        log.info("save : session id : {} ", sessionId);
        this.webSocketService.sendMessageToUserId(sessionId, "back end : save person : " + person);
//        this.webSocketService.sendMessage("back end : save person : " + person);
        return person;
    }

    @MessageMapping("/persons/delete")
    @Transactional
    // @SendTo("/topic/public")
    public String deletePerson(@Payload int id, SimpMessageHeaderAccessor headerAccessor) {
        log.info("save a person : {}", id);
        this.personRepository.deleteById(id);
        String sessionId = headerAccessor.getSessionId();
        log.info("delete : session id : {} ", sessionId);
        this.webSocketService.sendMessage("back end : delete person : " + id);

        return "person has deleted by id : " + id;
    }

    private String getUserId(){
        return WebsocketApplication.PERSON_ID.get(1);
    }
}
