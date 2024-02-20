package web.socket.demo.person;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
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
        return "this api person";
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
        log.info("session id : {} ", sessionId);
        this.webSocketService.sendMessage(sessionId, "back end : save person : " + person.toString());
        return person;
    }

    @MessageMapping("/persons/delete")
    @Transactional
    // @SendTo("/topic/public")
    public String deletePerson(@Payload int id) {
        log.info("save a person : {}", id);
        this.personRepository.deleteById(id);
        this.webSocketService.sendMessage("public", "back end : delete person : " + id);

        return "person has deleted by id : " + id;
    }
}
