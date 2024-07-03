package org.example.service.impl;

import org.example.controller.Code;
import org.example.dao.BookDao;
import org.example.domain.Book;
import org.example.exception.BusinessException;
import org.example.exception.SystemException;
import org.example.service.BookSerive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookSerive {

    @Autowired
    private BookDao bookDao;

    public boolean save(Book book) {
        return bookDao.save(book) > 0;
    }

    public boolean update(Book book) {
        return bookDao.update(book) > 0;
    }

    public boolean delete(Integer id) {
        return bookDao.delete(id) > 0;
    }

    public Book getById(Integer id) {
//        if(id == 1) {
//            throw new BusinessException(Code.BUSINESS_ERR, "业务异常处理");
//        }
//        try {
//            int i = 1/0;
//        } catch (Exception e) {
//            throw new SystemException(Code.SYSTEM_ERR, "系统异常", e);
//        }
        return bookDao.getById(id);
    }

    public List<Book> getAll() {
        return bookDao.getAll();
    }
}
