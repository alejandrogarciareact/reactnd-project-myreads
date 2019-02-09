import React, {Component} from 'react';
import Book from "./Book";
import {bookShelves} from "../utils/bookShelves";
import PropTypes from "prop-types";

class ListBooks extends Component {


    renderBookShelf = (key, title) => {
        const {books, onChangeShelfBook} = this.props;
        return (<div className="bookshelf" key={key}>
            <h2 className="bookshelf-title">{title} </h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter((book) => book.shelf === key).map((book) => (
                        <li key={book.id}>
                            <Book book={book} onChangeShelfBook={onChangeShelfBook}/>
                        </li>))}
                </ol>
            </div>
        </div>)
    };

    render() {
        return (
            <div className="list-books-content">
                {Object.values(bookShelves).map((bookShelf) =>
                    this.renderBookShelf(bookShelf.key, bookShelf.title))
                }
            </div>
        );
    }
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelfBook: PropTypes.func.isRequired
};

export default ListBooks;
