import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Pagination, Button, TextField } from '@mui/material';
import { deleteBook, fetchBooks } from '../store/book/bookAction';
import { Link } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

function BookList() {
    const dispatch = useDispatch();
    const { books, totalPages } = useSelector(state => state?.booksReducer);

    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const limit = 5;

    useEffect(() => {
        dispatch(fetchBooks(searchQuery, page, limit));
    }, [dispatch, searchQuery, page]);

    const handleSearch = () => {
        setPage(1);
        dispatch(fetchBooks(searchQuery, 1, limit));
    };

    const handleDelete = (id) => {
        dispatch(deleteBook(id));
    };
    const handlePageChange = (event, value) => {
        setPage(value);
    };


    return (
        <div>
            <TextField label="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <Button onClick={handleSearch}>Search</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Publication Year</TableCell>
                            <TableCell>ISBN</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books && books.map(book => (
                            <TableRow key={book._id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.genre}</TableCell>
                                <TableCell>{book.publicationYear}</TableCell>
                                <TableCell>{book.ISBN}</TableCell>
                                <TableCell>
                                    <Link to={`/books/edit/${book._id}`}>
                                        <ModeEditIcon />
                                    </Link>


                                    <DeleteIcon style={{ cursor: "pointer" }} onClick={() => handleDelete(book._id)} />

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} />
        </div>
    );
}

export default BookList;
