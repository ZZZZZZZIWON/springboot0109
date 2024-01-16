package kr.co.jwins.bookshop.dao;



import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.jwins.bookshop.model.Book;
import kr.co.jwins.bookshop.pager.Pager;

@Mapper
public interface BookDao {

	List<Book> list(Pager pager);

	void add(Book item);

	void delete(Long bookid);

	Book item(Long bookid);

	void update(Book item);

	int total(Pager pager);


}