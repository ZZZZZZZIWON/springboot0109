package kr.co.jwins.hello.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import kr.co.jwins.hello.model.Book;

@RestController
public class RootController {

	@GetMapping
	String index() {
		return "index";
	}
	
	@GetMapping("/list")
	List<Book> list() {
		List<Book> list = new ArrayList<>();
		
		list.add(new Book(1L, "도서명 1", "출판사 1", 1000));
		list.add(new Book(2L, "도서명 2", "출판사 2", 1000));
		list.add(new Book(3L, "도서명 3", "출판사 3", 1000));
		list.add(new Book(4L, "도서명 4", "출판사 4", 1000));
		
		return list; 
	
	}
	
	
	
}
