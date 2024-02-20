package web.socket.demo;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
@Slf4j
public class WebsocketApplication {
	@Autowired
	private Environment env;

	public static void main(String[] args) {
		SpringApplication.run(WebsocketApplication.class, args);
	}

	@PostConstruct
	public void initAPP(){
		log.info("\nhttp://localhost:{}/api/\n", env.getProperty("server.port"));
	}

}
