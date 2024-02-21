package web.socket.demo;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@Slf4j
public class WebsocketApplication {
	@Autowired
	private Environment env;

	public static Map<Integer , String> PERSON_ID = new HashMap<>();

	public static void main(String[] args) {
		SpringApplication.run(WebsocketApplication.class, args);
	}


	@PostConstruct
	public void initAPP(){
		PERSON_ID.put(1,"wsuser1");
		PERSON_ID.put(2,"wsuser3");
		PERSON_ID.put(3,"wsuser4");
		log.info("\nhttp://localhost:{}/api/\n", env.getProperty("server.port"));
	}

}
