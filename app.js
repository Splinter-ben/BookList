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
        const books = Store.getBooks();
        // loop through the array of books
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        // append the row to the list
        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            // parent element of the td = row
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Vanish in 2 sec
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearField() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class: handles storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            };
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

}

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

        // Validate
        if (!title || !author || !isbn) {
            UI.showAlert('Please fill in all the fields', 'danger');
        } else {
            // Instantiate Book
            const book = new Book(title, author, isbn);
            console.log(book);

            // Add Book to UI
            UI.addBookToList(book);

            // Add book to Store
            Store.addBook(book);

            // Clear field after submit
            UI.clearField();

            UI.showAlert('Added Book to local storage', 'success');
        }
    });

// Remove Event: Remove a Book
document.querySelector('#book-list')
    .addEventListener('click', (e) => {
        // Remove book from UI   
        UI.deleteBook(e.target);

        // Remove book from Store
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

        UI.showAlert('Book removed', 'warning');
    });