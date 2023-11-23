import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { createBook, fetchBooks, updateBook } from '../store/book/bookAction';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import API from '../helper/API';


function BookForm() {
    const { id } = useParams(); // ID for edit mode
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        genre: '',
        publicationYear: '',
        ISBN: ''
    });
    const [errors, setErrors] = useState({});

    function validateField(name, value) {
        switch (name) {
            case 'title':
                return value ? '' : 'Title is required.';
            case 'author':
                return value ? '' : 'Author is required.';
            case 'genre':
                return value ? '' : 'genre is required.';
            case 'publicationYear':
                return value ? '' : 'publicationYear is required.';
            case 'ISBN':
                return value ? '' : 'ISBN is required.';
            default:
                return '';
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBookData({ ...bookData, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    useEffect(() => {
        if (id) {
            API.get(`/books/${id}`)
                .then(response => {
                    setBookData(response.data);
                })
                .catch(error => console.error("Error fetching book details", error));
        }
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let isValid = true;
        let newErrors = {};

        Object.keys(bookData).forEach((key) => {
            const error = validateField(key, bookData[key]);
            newErrors[key] = error;
            if (error) isValid = false;
        });

        setErrors(newErrors);

        if (isValid) {

            if (id) {
                // Update the book
                dispatch(updateBook(id, bookData));
            } else {
                dispatch(createBook(bookData));

            }
            navigate('/books'); // Navigate back to the book list

            event.preventDefault();
        }

    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="title" label="Title" name="title" autoFocus onChange={handleChange} value={bookData.title}
                error={!!errors.title}
                helperText={errors.title}

            />
            <TextField margin="normal" fullWidth id="author" label="Author" name="author" onChange={handleChange} value={bookData.author}
                error={!!errors.author}
                helperText={errors.author}
            />
            <TextField margin="normal" fullWidth id="genre" label="Genre" name="genre" onChange={handleChange} value={bookData.genre}
                error={!!errors.genre}
                helperText={errors.genre}
            />
            <TextField margin="normal" fullWidth id="publicationYear" label="Publication Year" name="publicationYear" onChange={handleChange} value={bookData.publicationYear}
                error={!!errors.publicationYear}
                helperText={errors.publicationYear}

            />
            <TextField margin="normal" fullWidth id="ISBN" label="ISBN" name="ISBN" onChange={handleChange} value={bookData.ISBN}
                error={!!errors.ISBN}
                helperText={errors.ISBN}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Submit</Button>
        </Box>
    );
}

export default BookForm;
