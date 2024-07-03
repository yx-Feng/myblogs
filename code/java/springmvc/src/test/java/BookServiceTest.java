import org.example.config.SpringConfig;
import org.example.domain.Book;
import org.example.service.BookSerive;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=SpringConfig.class)
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
