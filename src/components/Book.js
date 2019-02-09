import React, {Component} from 'react';
import BookOptions from "./BookOptions";
import {bookShelves} from "../utils/bookShelves";
import PropTypes from "prop-types";

class Book extends Component {

    renderBookCover = () => {
        const {book} = this.props;
        return book.imageLinks && (<div className="book-cover" style={{
                width: 128,
                height: 188,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`
            }}/>
        )
    };


    renderAuthors = () => {
        const {book} = this.props;
        return book.authors && book.authors.map((author) =>
            (<div className="book-authors" key={author}>{author}</div>)
        )
    };

    onChangeShelf = (shelf) => {
        const {book, onChangeShelfBook} = this.props;
        onChangeShelfBook(book, shelf);
    };

    render() {
        const {book} = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    {this.renderBookCover()}
                    <div className="book-shelf-changer">
                        <BookOptions options={Object.keys(bookShelves)} shelf={book.shelf}
                                     onChangeShelf={(shelf) => this.onChangeShelf(shelf)}/>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {this.renderAuthors()}
            </div>
        );
    }
}

Book.propTypes = {
    book : PropTypes.object.isRequired,
    onChangeShelfBook: PropTypes.func.isRequired
};

export default Book;
