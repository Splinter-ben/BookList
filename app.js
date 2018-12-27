// Book Class: represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: handle UI tasks
class UI {
    static displayBooks() {
        const StoreBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: 345364
            },
            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: 564890
            }
        ];

        const books = StoreBooks;
        // loop throw the array of books
        books.forEach(book => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delet">X</a></td>
        `;

        // append the row to the list
        list.appendChild(row);
    }
}

// Store Class: handles storage

// Display Event: display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add Event: add a Book
document.querySelector('#book-form')
    .addEventListener('submit', (e) => {
        // Prevent default of submit
        e.preventDefault();

        // Get form values
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;

        // Instantiate Book
        const book = new Book(title, author, isbn);
        console.log(book);

        // Add Book to UI
        UI.addBookToList(book);
    });

// Remove Event: Remove a Book