package kr.co.jwins.bookshop.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.jwins.bookshop.model.Book;
import kr.co.jwins.bookshop.pager.Pager;
import kr.co.jwins.bookshop.service.BookService;

@RestController
@RequestMapping("/api")
public class ApiController {

	@Autowired
	BookService service;
	
	@GetMapping("/list/{page}")
	Map<String, Object> list(@PathVariable int page) {
		Pager pager = new Pager();
		pager.setPage(page);
		
		return list(pager);
	}
	
	@GetMapping
	Map<String, Object> list(@RequestBody(required = false) Pager pager) {
		if(pager == null) {
			pager = new Pager();
		}
		Map<String, Object> map = new HashMap<>();
		
		map.put("list", service.list(pager));
		map.put("pager", pager);
		
		return map;
	}
	
	@PostMapping
	Book add(@RequestBody Book item) {
		service.add(item);
		
		return item;
	}
	
	@PutMapping
	Book update(@RequestBody Book item) {
		service.update(item);
		
		return item;
	}
	
	@DeleteMapping
	Book delete(@RequestBody Book item) {
		service.delete(item.getBookid());
		
		return item;
	}
}
