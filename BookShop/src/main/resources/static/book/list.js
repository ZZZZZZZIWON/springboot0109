/*window.addEventListener("load", () => {
    fetch("/api")
    .then(resp => resp.json())
    .then(result => {
        console.log(result);
    })
})*/
window.addEventListener("load", () => {
    const state = {};

    const addModal = new bootstrap.Modal('#addModal') 
    const updateModal = new bootstrap.Modal('#updateModal') 

    document.querySelectorAll("form").forEach(item => {
        item.addEventListener("submit", e => {
            e.preventDefault();
            console.log(e);
      
      		const search = item.querySelector("select[name='search']").value;      
      		const keyword = item.querySelector("input[name='keyword']").value;    
      		
      		console.log(`${search} -> ${keyword}`)

            getPage(1, {search, keyword})
    /*        const form = e.target;
            for(let i = 0; i < form.length; i++) {
				const param = form[i];
				console.log(`${param.name}: ${param.value}`);
			}*/
        })
    })

    document.querySelector(".pagination").addEventListener("click", e => {
        if(e.target.classList.contains("page-link")) {
            const {search, keyword} = state;

            getPage(e.target.dataset.page,{search, keyword});
        }
        
    }, {
        capture:true,
    })
    
    const getPage = (page, option) => {

        const item = {
            page, 
        }

        if(option && option.search && option.keyword) {
            item.search = option.search;
            item.keyword = option.keyword;
        }

        fetch(`/api/list`, {
            method: 'POST',
            body:JSON.stringify(item),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(resp => resp.json())
        .then(result => {
            console.log(result)

            const {list, pager} = result;

            if(option && option.search && option.keyword) {
                state.search = pager.search;
                state.keyword = pager.keyword;
            } else {
                delete state.search;
                delete state.keyword;
            }
              /*let html = '';
                list.forEach(item => {
                  	html += `<tr>
						<td>${item.bookid}</td>
						<td>${item.bookname}</td>
						<td>${item.publisher}</td>
						<td>${item.price}</td>
						<td>
							<a href="delete/${item.bookid}"><button class="btn btn-sm btn-outline-danger">삭제</button></a>
							<a href="update/${item.bookid}"><button class="btn btn-sm btn-outline-warning">수정</button></a>
						</td>
					</tr>`;

                    document.querySelector("tbody").innerHTML = html;
                });*/
                document.querySelectorAll("tbody tr:not(#list-empty)").forEach(item => item.remove())
                if(list.length) {
                    document.getElementById("list-empty").classList.add("hide");
                } else {
                    document.getElementById("list-empty").classList.remove("hide");
                }

                list.forEach(item => {
                    const tr = document.createElement("tr");
					tr.dataset.bookid = item.bookid;
					tr.dataset.bookname = item.bookname;
					tr.dataset.publisher = item.publisher;
					tr.dataset.price = item.price;
                    
                    const bookid = document.createElement("td");
                    bookid.textContent = item.bookid;
                    tr.append(bookid);
                    
                    const bookname = document.createElement("td");
                    bookname.textContent = item.bookname;
                    tr.append(bookname);
                    
                    const publisher = document.createElement("td");
                    publisher.textContent = item.publisher;
                    tr.append(publisher);
                    
                    const price = document.createElement("td");
                    price.textContent = item.price;
                    tr.append(price);
                    
                    const management = document.createElement("td");
                    
                    const remove = document.createElement("a")
                    remove.textContent = '삭제'
                    remove.addEventListener("click", deleteHandler)
                    remove.classList.add('btn', 'btn-sm', 'btn-outline-danger')
                    management.append(remove)
                    
                    const update = document.createElement("a")
                    update.textContent = '변경'
                    update.classList.add('btn', 'btn-sm', 'btn-outline-warning')
                    update.addEventListener("click", updateHandler)
                    management.append(update);

                    tr.append(management);

                    document.querySelector("tbody").append(tr);
 				document.querySelector(".pagination .first").dataset.page = 1;
                document.querySelector(".pagination .prev").dataset.page = pager.prev;
                document.querySelector(".pagination .next").dataset.page = pager.next;
                document.querySelector(".pagination .last").dataset.page = pager.last;
                
                document.querySelectorAll(".pagination .page").forEach(item => item.remove());
                
                const next = document.querySelector(".pagination .next");
                pager.list.forEach(item => {
	                const pageItem = document.createElement("li")
					pageItem.classList.add("page-item","page")	
                    if(pager.page == item) {
						pageItem.classList.add("active");
					}
                    
	                const pageLink = document.createElement("a")
                    pageLink.textContent = item;
					pageLink.classList.add("page-link")	
					pageLink.dataset.page = item;
					/* pageLink.addEventListener("click", e=> {
                        getPage(e.target.dataset.page)
                    }) */
                   
					pageItem.append(pageLink)  
			
                    next.parentElement.before(pageItem);              
	                });
					
				});

        });
               
	}
    
    const deleteHandler = e => {
        const bookid = e.target.closest('tr').dataset.bookid;

        fetch("/api", {
            method: 'DELETE',
            body: JSON.stringify({bookid}),
            headers: {
                "Content-Type":"application/json"
            }
        }).then(resp => resp.json())
        .then(result => {
            console.log(result);
        })
    }


   const updateHandler = e => {
	   
	   const {bookid, bookname, publisher, price} = e.target.closest('tr').dataset;
	   
	    document.querySelector("#updateModal input[name='bookid']").value = bookid;
	    document.querySelector("#updateModal input[name='bookname']").value = bookname;
        document.querySelector("#updateModal input[name='publisher']").value = publisher;
        document.querySelector("#updateModal input[name='price']").value = price;
	   
	   updateModal.show();
	   }; 
   document.querySelector("#updateModal .update").addEventListener("click", e => {
    const item = {
        bookid:document.querySelector("#updateModal input[name='bookid']").value,
        bookname:document.querySelector("#updateModal input[name='bookname']").value,
        publisher:document.querySelector("#updateModal input[name='publisher']").value,
        price:document.querySelector("#updateModal input[name='price']").value
    }
    fetch("/api", {
        method:'PUT',
        body:JSON.stringify(item),
        headers: {
            "Content-Type" : "application/json"
        }
    }).then(resp => resp.json())
    .then(result => {
        console.log(result)
    });
    updateModal.hide();
   })
    
    document.querySelector("#add").addEventListener("click", e => {
        document.querySelector("#addModal input[name='bookname']").value = '';
        document.querySelector("#addModal input[name='publisher']").value = '';
        document.querySelector("#addModal input[name='price']").value = '';
        addModal.show();

    })

    document.querySelector("#addModal .add").addEventListener("click", e => {
        const item = {
            bookname: document.querySelector("#addModal input[name='bookname']").value,
            publisher: document.querySelector("#addModal input[name='publisher']").value,
            price: document.querySelector("#addModal input[name='price']").value,
        };

        console.log(item);

        fetch("/api", {
            method:'POST',
            body:JSON.stringify(item),
            headers: {
				"Content-Type" : "application/json"
			}
        }).then(resp => resp.json())
        .then(result => console.log(result))

        addModal.hide();

    })

	getPage(1)

/*    fetch("/api")
    .catch(reason => console.log(reason))
    .then(resp => {
        if(resp.ok) {
            resp.json()
            .catch(reason => console.log(reason))
            .then(result => {

                const {list, pager } = result; 
                console.log(result);
                
            })
        } else {
            console.log(resp)
        }
    })*/
    
})