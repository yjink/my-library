
let booklist = document.getElementById("booklist");
let formBG = document.getElementById("formBG");
// the background to add the form
let form = document.getElementById("form");

// THE INPUTS
let add = document.getElementById("add");
let exit = document.getElementById("exit")
// the button to x out from add book form
let submit = document.getElementById("submit");
let clear = document.getElementById("clear");
let title = document.getElementById("title");
let author = document.getElementById("author");
let year = document.getElementById("year");
let page = document.getElementById("page");
let check = document.getElementById("check");
let del = document.getElementById("del"); 

let myLibrary = [];


// FUNCTIONS

function Book() {

};

function addBook(title, author, year, page, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.page = page;
    
    if (read) {
        this.read = 'Read';
    } else {
        this.read = 'Unread';
    }
}

addBook.prototype = Object.create(Book.prototype);

function deleteBook(arr, delBook) {
    // delBook is the book to delete
    let newArr = [];
    for (let j = 0; j < arr.length; j++) {
        let element = arr[j];
        let bookTitle = element.title.toLowerCase().split(' ').join('');
        if (bookTitle !== delBook) {
            newArr.push(element);
        }
    }

    myLibrary = newArr;
    addElement();
    // refresh page with updated array
};

function addElement() {
    while(booklist.lastChild) {
        booklist.removeChild(booklist.lastChild);
    }

    myLibrary.map(function({title, author, year, page, read}) {
        let newCover = document.createElement('div');
        let bookTitle = title.toLowerCase().split(' ').join('');

        newCover.className = "book";
        newCover.innerHTML = `
        <button id="del" value=${bookTitle} onclick="deleteBook(myLibrary, value)">X</button>   
        <p class="para" id="tLine"><b>${title}</b></p>
        <p class="para" id="aLine"><i>${author}</i></p>
        <p class="para">${year}</p>
        <p class="para">${page} pages</p>
        <p class="para">${read}</p>
        `

        booklist.appendChild(newCover);
    })
}

function clearForm() {
    title.value = '';
    author.value = '';
    year.value = '';
    page.value = '';
    check.checked=false;
}


// EVENTS

add.addEventListener('click', () => {
    formBG.style.display = "block";
});

exit.addEventListener('click', () => {
    formBG.style.display = "none";
});

submit.addEventListener('click', () => {
    let t = title.value;
    let a = author.value;
    let y;
    let p;
    let c;

    // if year is not a number
    if (isNaN(year.value)) {
        y = 'Unknown Year';
    } else y = year.value;

    // if page is not a number 
    if (isNaN(page.value)) {
        p = 'Unknown';
    } else p = page.value;

    // checkbox 

    if (check.checked) {
        c = true;
    } else c = false;

    let titleName = t.toLowerCase().split(' ').join('');

    let newTitle = titleName;

    newTitle = new addBook(t, a, y, p, c);

    let inLibrary = false;

    for (let i = 0; i < myLibrary.length; i++) {
        let element = myLibrary[i];
        if (element.title === t && element.author === a) {
            alert("This book is already in the library!");
            inLibrary = true;
            break;
        } else {
            inLibrary = false;
        }
    }

    if (!inLibrary) {
        alert("Book added!");
        myLibrary.push(newTitle);
        addElement();
    }


    clearForm();
})

clear.addEventListener('click', () => {
    clearForm();
})


// Default Books

let dracula = new addBook('Dracula', 'Bram Stoker', 1897, 418, true);
let yellowpages = new addBook('Yellow Pages', 'Various', 2021, 99, true);
let littlewoman = new addBook('Little Woman', 'Louisa May Alcott', 1868, 759, false);
let thegreatgatsby = new addBook('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 218, false);

myLibrary.push(dracula);
myLibrary.push(yellowpages);
myLibrary.push(littlewoman);
myLibrary.push(thegreatgatsby);