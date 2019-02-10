import React, {Component} from 'react';
import {search} from "../service/BooksAPI";
import Book from "./Book";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {debounce} from "throttle-debounce";

class SearchBook extends Component {
    state = {
        query: '',
        results: []
    };

    debouncedSearch = debounce(300,() => {
        search(this.state.query.trim()).then((results) => {
            if (results && results.error) {
                this.setState({results: []});
            } else {
                this.setState({results})
            }
        })
    });

    searchBooks = (query) => {
        this.setState(() => ({
            query
        }));

        this.debouncedSearch();
    };


    getBooksWithShelf() {
        const {results} = this.state;
        const {bookShelves} = this.props;
        const showingBooks = results ? results.slice() : [];
        return showingBooks.map((book) => {
            const bookShelf = bookShelves.find((b) => b.id === book.id);
            book.shelf = bookShelf ? bookShelf.shelf : 'none';
            return book;
        });
    }

    render() {
        const {query} = this.state;
        const {onChangeShelfBook} = this.props;

        const showingBooks = this.getBooksWithShelf();
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                               value={query}
                               onChange={(event) => this.searchBooks(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => (
                            <Book key={book.id} book={book} onChangeShelfBook={onChangeShelfBook}/>))}
                    </ol>
                </div>
            </div>
        );
    }
}

SearchBook.propTypes = {
    bookShelves: PropTypes.array.isRequired,
    onChangeShelfBook: PropTypes.func.isRequired
};

export default SearchBook;
