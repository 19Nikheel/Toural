package com.toural.AuthServer.AuthServer.Service;

import com.toural.AuthServer.AuthServer.DTO.PostSign;
import com.toural.AuthServer.AuthServer.external_Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SendService {

    private final UserService bClient;

    public SendService(UserService bClient) {
        this.bClient = bClient;
    }

    public boolean sendToB(String jwtToken,PostSign payload) {
        ResponseEntity<Boolean> resp = bClient.sendItem(jwtToken,payload);
        return resp.getBody();
    }

    public String receiveFromB(String s){
        ResponseEntity<String>resp= bClient.getId(s);
        return resp.getBody();
    }
}