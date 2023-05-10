import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { getBookData } from '@/lib/googlebooks';
import Loading from './Loading';
export default function MainPage() {

  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/records', {
        method: 'GET',
      });
      const json = await response.json();
      const bookData = json.data.map(record => record);


      const bookDetails = await Promise.all(bookData.map(async (record) => {
        const details = await getBookData(record.isbn);
        return { ...details, ...record };
      }));
      setRecords(bookDetails);
      setIsLoading(false)
    } catch (e) {
      console.log(e);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleReviewButtonClick = async (bookData) => {
    try {
      const dataWithReviews = {
        // from API
        ...bookData.details,
        // from database
        ...bookData,
      };
      router.push({
        pathname: "/insert",
        query: {
          bookData: JSON.stringify(dataWithReviews),
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-gray-50 p-10">

      <h1 className={"w-[600px] mx-auto text-center text-3xl font-bold  text-black uppercase tracking-wider font-serif"}>Book Review</h1>
      <p className="mt-4 mx-auto text-center text-lg text-black italic font-serif">
        Welcome to the book review app, where you can discover and share reviews for classic literature.
      </p>
      {isLoading? <Loading/> :  <section className='mx-auto max-w-screen-lg'>
        <div className={"grid grid-cols-2 gap-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3"}>
          {records.map(record => (
            <div key={record._id}
              className={"max-w-xs p-6 bg-gray-200 border-2 border-x-4 border-gray-300  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "} >
              <img className="mx-auto rounded-md hover:shadow-lg transform hover:scale-105 transition ease-in-out duration-150"
                src={record.thumbnail}
                alt="book image" />
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-4">{record.title}</h5>
                <h6 className="font-semibold tracking-tight text-gray-800 dark:text-white ">{record.author}</h6>

                <div className="flex items-center mt-2.5 mb-5">
                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  {(record.reviews && record.reviews.length) > 0 ? (
                    <span className="bg-gray-300 text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{(record.reviews.reduce((acc, cur) => acc + cur.rating, 0) / record.reviews.length).toFixed(1)}</span>
                  ) : (
                    <span className="bg-gray-300 text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">0.0</span>
                  )}
                </div>
                <button onClick={() => handleReviewButtonClick(record)} className="text-white w-full bg-black hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-900 hover:shadow-lg transform hover:scale-105 transition ease-in-out duration-150 font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Review book </button>
              </div>

            </div>
          ))
          }
        </div>
      </section>}
     

    </div>
  );
}
