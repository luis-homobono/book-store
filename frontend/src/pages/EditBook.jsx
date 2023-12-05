import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState();
    const [loading, setLoading] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://127.0.0.1:5555/books/${id}`)
            .then((response) => {
                console.log(response)
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please Check console');
                console.log(error);
            });
    }, []);

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios
            .put(`http://127.0.0.1:5555/books/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please Check console');
                console.log(error);
            })
    }

    return (
        <div className="p-4 ">
            <BackButton />
            <h1 className="text-3xl m-4">Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-2 border-gray-500 px-4 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="border-2 border-gray-500 px-4 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input
                        type="number"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className="border-2 border-gray-500 px-4 w-full"
                    />
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditBook;