import {randomNumFromRange} from "../../help/methods.js";

export const newPost = {
    title: 'TEST',
    body: 'TEST',
    userId: randomNumFromRange(1,10)
};

export const postKeys = [
    'userId',
    'id',
    'title',
    'body'
];
