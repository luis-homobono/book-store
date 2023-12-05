import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://127.0.0.1:5555/books/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book Deleted successfully', { variant: 'success' })
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error Book not deleted', { variant: 'error' })
                console.log(error);
            })
    }

    return (
        <div className="p-4 ">
            <BackButton />
            <h1 className="text-3xl m-4">Delete Book</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <h3>Are you sure you want to delete this book?</h3>
                <button
                    className="p-4 bg-red-600 text-white m-8 w-full"
                    onClick={handleDeleteBook}
                >
                    Yes, Delete it
                </button>
            </div>
        </div>
    )
}

export default DeleteBook;