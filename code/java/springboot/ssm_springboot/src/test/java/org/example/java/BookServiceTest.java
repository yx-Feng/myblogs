package org.example.java;

import org.example.domain.Book;
import org.example.service.BookSerive;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class BookServiceTest {
    @Autowired
    private BookSerive bookSerive;

    @Test
    public void testGetById() {
        Book book = bookSerive.getById(1);
        System.out.println(book);
    }

    @Test
    public void testGetAll() {
        List<Book> all = bookSerive.getAll();
        System.out.println(all);
    }
}
