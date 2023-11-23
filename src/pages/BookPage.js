// src/pages/BookPage.js
import React from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function BookPage() {
    return (
        <Grid container spacing={2} mt={10}>
            <Grid item xs={12}>
                <Link to="/books/add">
                    <Button>
                        Add Book
                    </Button>
                </Link>            </Grid>
            <Grid item xs={12}>
                <BookList />
            </Grid>
        </Grid>
    );
}

export default BookPage;
