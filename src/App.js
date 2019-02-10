import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from "./components/ListBooks";
import {getAll, update} from "./service/BooksAPI";
import SearchBook from "./components/SearchBook";
import {Link, Route, Switch} from "react-router-dom";
import NotFound from "./components/NotFound";

class BooksApp extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        getAll().then((books) => {
            this.setState(() => ({books}));
        })
    }

    updateBook = (book, shelf) => {
        this.setState((currentState) => {
            const books = currentState.books;
            book.shelf = shelf;
            books.map(b => b.id === book.id ? book : b);
            !books.find((b) => b.id === book.id) && books.push(book);
            return {books}
        });
        update(book, shelf);
    };

    render() {
        const {books} = this.state;
        return (
            <div className="app">
                <Switch>
                    <Route path="/search" render={() => (
                        <SearchBook bookShelves={books}
                                    onChangeShelfBook={(book, shelf) => this.updateBook(book, shelf)}/>
                    )}/>
                    <Route path="/" exact
                           render={() => (
                               <div>
                                   <ListBooks books={books}
                                              onChangeShelfBook={(book, shelf) => this.updateBook(book, shelf)}/>
                                   <div className="open-search">
                                       <Link to='/search'>
                                           <button>Add a book</button>
                                       </Link>
                                   </div>
                               </div>
                           )}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        )
    }
}

export default BooksApp
