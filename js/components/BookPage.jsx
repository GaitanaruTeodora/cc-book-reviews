import React from 'react';
import { useRouter } from 'next/router';
import StartRaiting from './StarRating';
import { useEffect, useState } from 'react';

export default function BookPage({ bookData }) {

    const [book, setBook] = useState(bookData);
    const [isInserted, setIsInserted] = useState(false);
    const [isDeleted, setIsDeteled] = useState(false);
    const [reviews, setReviews] = useState(bookData ? bookData.reviews || [] : []);
    const [resetRating, setResetRating] = useState(false);
    const [starRatings, setStarRatings] = useState(0);
    const router = useRouter();


    const handleBackButtonClick = () => {
        router.push('/');
    };

    const fetchReviews = async () => {
        if (router.query.bookData) {
            const bookData = JSON.parse(router.query.bookData);

            fetch(`/api/reviews/${bookData._id}`, {
                method: 'GET',
            }).then((response) => {
                response.json().then((json) => {
                    if (json.data) {
                        const bookInfo = json.data.map(record => record);
                        setReviews(bookInfo.reverse());
                    }
                });
            });
        }
    };

    useEffect(() => {
        if (router.query.bookData) {
            const bookData = JSON.parse(router.query.bookData);
            setBook(bookData);
            fetchReviews().catch((c) => console.log(c))
        }
    }, [router.query.bookData]);

    useEffect(() => {
        if (isInserted == true || isDeleted == true) {
            fetchReviews()
            setIsInserted(false)
            setIsDeteled(false)
        }
    }, [isInserted, isDeleted])

    useEffect(() => {
        if (resetRating === true) {
          setStarRatings(0);
          setResetRating(false);
        }
      }, [resetRating]);

    const insertReview = async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const text = document.getElementById('text').value;
        const rating = book.rating;
        const data = { name, text, rating };
        try {
            const response = await fetch(`/api/reviews/${book._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then((response) => {
                response.json().then((result) => {
                    setIsInserted(true)
                    setResetRating(true);
                })

            });
            document.getElementById('name').value = '';
            document.getElementById('text').value = '';
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await fetch(`/api/reviews/${reviewId.concat("-").concat(book._id)}`, {
                method: 'DELETE',
            });
            response.json().then((r) => {
                setIsDeteled(true)
            });
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className='p-10'>
            <button onClick={handleBackButtonClick}
                className="text-gray-900 mb-4 bg-white border border-gray-400 border-2 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 hover:shadow-lg transform hover:scale-105 transition ease-in-out duration-150 font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" > Home </button>

            <div className="grid grid-cols-4 gap-0 mx-auto max-w-screen-lg">
                <div className="col-span-1">
                    {book && (
                        <img
                            src={book.thumbnail}
                            alt="Book Cover"
                            className="w-44 h-auto rounded-lg"
                        />
                    )}
                </div>
                <div className="col-span-3">
                    {book && (
                        <>
                            <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
                            <cite className="text-base font-semibold">Author: </cite>
                            <h3 className="inline text-base font-semibold ">{book.author}</h3>
                            <div className='mt-4'>
                                <cite className="text-base font-semibold ">Description: </cite>
                                <p className="text-lg  mb-4">{book.description}</p>
                            </div>
                            <div>
                                <cite className="text-base font-semibold">Number of pages: </cite>
                                {book.pageCount}
                            </div>
                            <div>
                                <cite className="text-base font-semibold">Category: </cite>
                                {book.categories}
                            </div>
                            <div>
                                <cite className="text-base font-semibold">Publisher: </cite> 
                                {book.publisher}
                            </div>
                            <div>
                                <cite className="text-base font-semibold">Publish Date: </cite>
                                {book.publishedDate}
                            </div>
                            <a
                                href={book.previewLink}
                                target="_blank"
                                className="block mb-5 text-base font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                                Preview on Google Books
                            </a>
                        </>
                    )}
                </div>
            </div>

            <section className="mt-5 mx-auto max-w-screen-lg bg-gray-200 rounded-lg p-8">
                <h2 className="mx-auto text-center max-w-screen-lg mb-2 text-xl font-medium text-gray-900">Write a Review</h2>
                <form className="mx-auto max-w-screen-lg">
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your review</label>
                        <textarea id="text" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a review..."></textarea>
                    </div>
                    <StartRaiting
                     setRating={(rating) => setBook({ ...book, rating })} resetRating={resetRating} />
                    <button onClick={insertReview} type="submit" className="mt-5 text-white bg-black hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </section>

            <section className="mx-auto max-w-screen-lg mb-10 mt-10">
                <h2 className="text-center text-xl font-medium text-gray-900">Reviews</h2>
                {reviews.length > 0 ? (
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index} className="flex items-center mb-4">
                                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                    </div>

                                    <div className="pl-3">
                                        <cite className="font-medium text-gray-900 dark:text-white">{review.name}</cite>

                                        <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">{review.rating}
                                            <svg aria-hidden="true" className="w-5 h-5 text-yellow-300 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                            out of 5
                                        </cite>
                                        <p className="text-gray-600 dark:text-gray-300">{review.text}</p>
                                    </div>
                                </div>
                                <div className="ml-auto pl-3">
                                    <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' onClick={() => handleDeleteReview(review.idReview)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews available for this book.</p>
                )}
            </section>

        </div>

    );
}
