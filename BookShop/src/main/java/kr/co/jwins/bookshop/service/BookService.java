package kr.co.jwins.bookshop.service;


import java.util.List;

import kr.co.jwins.bookshop.model.Book;
import kr.co.jwins.bookshop.pager.Pager;

public interface BookService {

	List<Book> list(Pager pager);

	void add(Book item);

	void delete(Long bookid);

	Book item(Long bookid);

	void update(Book item);


}
