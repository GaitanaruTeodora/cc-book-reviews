import { sendOk, sendBadRequest } from "@/js/utils/apiMethods";
import { getCollection } from "@/js/utils/functions";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = 'records';

const deleteReview = async (recordId, reviewId) => {
  const collection = await getCollection(COLLECTION_NAME);
  return collection.updateOne({_id: new ObjectId(recordId)}, {$pull: {reviews: {idReview: new ObjectId(reviewId)}}});
}

const getReviews = async (req, res) => {
  const id = req.query.reviewBookId;

  if (!id) {
    return sendBadRequest(res, "Missing reviewBookId parameter");
  }

  try {
    const collection = await getCollection(COLLECTION_NAME);
    const result = await collection.findOne({ _id: new ObjectId(id) });
    console.log(result)
    if (!result) {
      throw new Error(`Could not find reviews for book with ID ${id}`);
    }
    return sendOk(res, result.reviews);
  } catch (error) {
    return sendBadRequest(res, error.message);
  }
}

const postReviewToBook = async (req, res) => {
  const id = req.query.reviewBookId;
  const review = req.body;

  try {
    const collection = await getCollection(COLLECTION_NAME);
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $push: { reviews: { idReview: new ObjectId(), ...review } } },
      { upsert: true }
    );
    if (result.modifiedCount === 0) {
      throw new Error(`Could not add review to book with ID ${id}`);
    }
    return sendOk(res, result);
  } catch (error) {
    return sendBadRequest(res, error.message);
  }
}

export default async function handler(req, res) {
  console.log(req.body)
  const isAllowedMethod = req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE';
  
  if (!isAllowedMethod) {
    return sendMethodNotAllowed()
  }

  if (req.method === 'GET' && req.query.reviewBookId) {
    return getReviews(req,res);
  } else if (req.method === 'POST') {
    return postReviewToBook(req, res);
  } else if (req.method === 'DELETE'){
  
		const bookId = req.query.reviewBookId.split("-")[0];
    const reviewId = req.query.reviewBookId.split("-")[1];
		const response = await deleteReview(reviewId,bookId);
    console.log(response)
		return sendOk(res,response);
	} else {
    return sendBadRequest(res);
  }
}