package org.example.controller;

import org.example.domain.Book;
import org.example.service.BookSerive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@ResponseBody
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookSerive bookSerive;

    @PostMapping
    public Result save(@RequestBody Book book) {
        boolean flag = bookSerive.save(book);
        return new Result(flag ? Code.SAVE_OK:Code.SAVE_ERR, flag);
    }

    @PutMapping
    public Result update(@RequestBody Book book) {
        boolean flag = bookSerive.update(book);
        return new Result(flag ? Code.UPDATE_OK:Code.UPDATE_ERR, flag);
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        boolean flag = bookSerive.delete(id);
        return new Result(flag ? Code.DELETE_OK:Code.DELETE_ERR, flag);
    }

    @GetMapping("/{id}")
    public Result getById(@PathVariable Integer id) {
        Book book = bookSerive.getById(id);
        Integer code = book != null ? Code.GET_OK : Code.GET_ERR;
        String msg = book != null ? "":"数据查询失败，请重试!";
        return new Result(code, book, msg);
    }

    @GetMapping
    public Result getAll() {
        List<Book> bookList = bookSerive.getAll();
        Integer code = bookList != null ? Code.GET_OK : Code.GET_ERR;
        String msg = bookList != null ? "":"数据查询失败，请重试!";
        return new Result(code, bookList, msg);
    }
}
