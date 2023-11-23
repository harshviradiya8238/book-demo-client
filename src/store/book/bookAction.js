import API from '../../helper/API';

export const fetchBooks = (searchQuery = '', page = 1, limit = 10) => async dispatch => {
    try {
        const response = await API.get(`/books/getAllBooks`, {
            params: { search: searchQuery, page, limit }
        });
        dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error fetching books', error);

    }
};

export const createBook = (bookData) => async dispatch => {
    try {
        const response = await API.post('/books/createBook', bookData);
        dispatch({ type: 'CREATE_BOOK_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error creating book', error);

    }
};

export const updateBook = (id, bookData) => async dispatch => {
    try {
        const response = await API.put(`/books/${id}`, bookData);
        dispatch({ type: 'UPDATE_BOOK_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error updating book', error);

    }
};

export const deleteBook = (id) => async dispatch => {
    try {
        await API.delete(`/books/${id}`);
        dispatch({ type: 'DELETE_BOOK_SUCCESS', payload: id });
    } catch (error) {
        console.error('Error deleting the book', error);

    }
};
