import React from 'react';
import {bookShelves} from "../utils/bookShelves";
import PropTypes from "prop-types";


function BookOptions(props) {
    return ((props.options) ? (
            <select value={props.shelf ? props.shelf : 'none'}
                    onChange={(event) => props.onChangeShelf(event.target.value)}>
                <option value="move" disabled>Move to...</option>
                {props.options.map((option) => (
                    <option key={option} value={option}>
                        {bookShelves[option].title}
                    </option>
                ))}
                <option value="none">None</option>
            </select>) : <div/>
    )
}

BookOptions.propTypes = {
    options: PropTypes.array.isRequired
};


export default BookOptions;