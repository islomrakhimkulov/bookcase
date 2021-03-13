const bookName = document.querySelector('.input1');
const bookAuthor = document.querySelector('.input2');
const addButton = document.querySelector('button');
const bookTable = document.querySelector('table tbody');

var bookarr = JSON.parse(localStorage.getItem('books')) || [];

if(bookarr.length){
    addData(bookarr);
}

addButton.addEventListener('click',function(e){
        e.preventDefault();
        
        const name = bookName.value.trim(),
              author = bookAuthor.value.trim();
        if(name === '' && author === ''){
           alert('Kitob nomi va Muallifini kiritng!')
           }
        else if(name === ''){
            alert('Kitob nomini kiriting!');
            bookName.focus();
        }
        else if(author === ''){
            alert('Kitob muallifini kiriting!');
            bookName.focus();
        }
        else{
            const book = {
                name: name,
                author: author
            }  
            
            bookarr.push(book);
            addData(bookarr);
             
            bookName.value = '';
            bookName.focus();
            bookAuthor.value = '';   
        }
        
});

bookTable.addEventListener('click',function(e){
    
    const target = e.target;
    
    if(target.classList.contains('remove')){
        
        const id =target.getAttribute('data-id');
        
        bookarr = bookarr.filter(function(item,index){
           return index  !== parseInt(id); 
        });
        
        addData(bookarr);
    }
});
       
function addData(data =[]){
    
    localStorage.setItem('books',JSON.stringify(data));
    
    bookTable.innerHTML = '';
      
    if(data.length){
        
        data.forEach(function(book,index){
            
               var tr = '<tr>'+
               '<td>%index%</td>'+
               '<td>%name%</td>'+
               '<td>%author%</td>'+
               '<td data-id=%id% class="remove">&times;</td>'+
          '</tr>';
    
    tr = tr.replace('%index%',index + 1);
    tr = tr.replace('%name%',book.name);
    tr = tr.replace('%author%',book.author);
    tr = tr.replace('%id%',index);
    
    bookTable.insertAdjacentHTML('beforeend',tr);
        });
    }
    
}
