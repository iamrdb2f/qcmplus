package com.qcmplus.qcmplus.controller;




import com.qcmplus.qcmplus.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;

@RestController
public class HomeController {

    @GetMapping("/users")
    public List<User> getItems() {
        // This is a mock data. You might want to fetch data from a database.
        return Arrays.asList(
                new User(1L, "User 1", "DescriptionItem1@gmail.com"),
                new User(2L, "User 2", "DescriptionItem2@gmail.com"),
                new User(3L, "User 3", "DescriptionItem3@gmail.com")
        );
    }
}
