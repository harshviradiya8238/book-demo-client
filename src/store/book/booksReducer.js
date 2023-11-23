const initialState = {
    books: [],
    totalPages: 0,
    currentPage: 1,
    totalBooks: 0
};

export default function booksReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.payload.books,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                totalBooks: action.payload.totalBooks
            };
        case 'CREATE_BOOK_SUCCESS':
            return {
                ...state,
                books: [...state.books, action.payload]
            };
        case 'UPDATE_BOOK_SUCCESS':
            return {
                ...state,
                books: state.books.map(book =>
                    book._id === action.payload._id ? action.payload : book
                )
            };
        case 'DELETE_BOOK_SUCCESS':
            return {
                ...state,
                books: state.books.filter(book => book._id !== action.payload)
            };
        default:
            return state;
    }
}
