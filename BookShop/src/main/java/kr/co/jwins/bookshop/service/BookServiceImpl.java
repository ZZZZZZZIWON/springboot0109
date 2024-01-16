package kr.co.jwins.bookshop.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.jwins.bookshop.dao.BookDao;
import kr.co.jwins.bookshop.model.Book;
import kr.co.jwins.bookshop.pager.Pager;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	BookDao dao;
	
	@Override
	public List<Book> list(Pager pager) {
		int total = dao.total(pager);
		pager.setTotal(total);
		return dao.list(pager);
	}

	@Override
	public void add(Book item) {
		dao.add(item);
	}

	@Override
	public void delete(Long bookid) {
		dao.delete(bookid);
	}
	
	@Override
	public Book item(Long bookid) {
		return dao.item(bookid);
	}

	@Override
	public void update(Book item) {
		dao.update(item);
	}



}
