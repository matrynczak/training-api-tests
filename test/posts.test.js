import chai from 'chai';
import axios from 'axios';
import mocha from "mocha";
import {apiUrl} from "../config/api.js";
import {randomNumFromRange} from "../help/methods.js";

const expect = chai.expect;

const newPost = {
    title: 'TEST',
    body: 'TEST',
    userId: randomNumFromRange(1,10)
};

const postKeys = [
    'userId',
    'id',
    'title',
    'body'
];

mocha.describe('Tests of posts endpoint', () => {

    it('should get the list of posts with code 200', async() => {
        const response = await axios.get(`${apiUrl}/posts`);
        expect(response.status).to.equal(200);
    });

    it('should create new post with response status 201', async() => {
        const response = await axios.post(`${apiUrl}/posts`, newPost);
        expect(response.status).to.equal(201);
        expect(response.data).to.deep.equal(Object.assign(newPost, {id: 101}));
    });

    it('should get the list of posts with proper keys for each', async() => {
        const response = await axios.get(`${apiUrl}/posts`);
        response.data.forEach(post => {
            expect(post).to.have.all.keys(postKeys);
        })
    });
});
