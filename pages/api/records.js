import {sendMethodNotAllowed, sendOk} from "@/js/utils/apiMethods";
import {getCollection} from "@/js/utils/functions";
import {ObjectId,} from 'mongodb';

const COLLECTION_NAME = 'records';

const getRecords = async () => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.find({}).toArray();
}

const getOneRecord = async (id) => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.findOne({_id: new ObjectId(id)});
}

const postRecord = async (record) => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.insertOne(record);
}

const putRecord = async (record) => {
	const collection = await getCollection(COLLECTION_NAME);
	const id = record._id;
	delete record._id;
	return collection.updateOne({_id: new ObjectId(id)}, {$set: record});
}

const deleteRecord = async (id) => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.deleteOne({_id: new ObjectId(id)});
}

export default async function handler(req, res) {
	const isAllowedMethod = req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE';

	if (!isAllowedMethod) {
		return sendMethodNotAllowed()
	}

	if(req.method === 'GET' && req.query.id){
		const id = req.query.id;
		const record = await getOneRecord(id);
		return sendOk(res, record);
	}
	else if(req.method === 'GET'){
		const records = await getRecords();
		return sendOk(res, records);
	}
	else if (req.method === 'POST'){
		const record = req.body;
		const response = await postRecord(record);
		return sendOk(res, response);
	}
	else if (req.method === 'PUT'){
		const record = req.body;
		const response = await putRecord(record);
		return sendOk(res, response);
	}
	else if (req.method === 'DELETE'){
		const id = req.query.id;
		const response = await deleteRecord(id);
		return sendOk(res, response);
	}
}