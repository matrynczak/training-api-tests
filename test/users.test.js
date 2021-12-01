import chai from 'chai';
import axios from 'axios';
import mocha from "mocha";
import {apiUrl} from "../config/api.js";

const expect = chai.expect;

const userExample = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {lat: '-37.3159', lng: '81.1496'}
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
    }
};

const userExampleKeys1stLevel = [
    'id',
    'name',
    'username',
    'email',
    'address',
    'phone',
    'website',
    'company',
];

const newlyCreatedUser = {
    id: 1,
    name: 'Test User',
    username: 'testUser',
    email: 'test@april.biz',
    address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {lat: '-17.3159', lng: '42.1496'}
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
    }
};

const titleModified = {
    name: 'Test User'
};


mocha.describe('Tests of users endpoint', () => {

    it('should get the list of users with code 200', async() => {
        const response = await axios.get(`${apiUrl}/users`);
        expect(response.status).to.equal(200);
    });

    it('should return list of 10 users as objects', async() => {
        const response = await axios.get(`${apiUrl}/users`);
        expect(response.data.length).to.equal(10);
        response.data.forEach( user => {
            expect(user).to.be.an('object')
        });
    });

    it('should respond with 404 for incorrect users endpoint', async() => {
        const response = await axios.get(`${apiUrl}/userssss`, { validateStatus: false });
        expect(response.status).to.equal(404);
    });

    it('should get the user with attributes', async() => {
        const response = await axios.get(`${apiUrl}/users/1`);
        expect(response.data).to.deep.equal(userExample)
    });

    it('should get the user with keys', async() => {
        const response = await axios.get(`${apiUrl}/users/1`);
        expect(response.data).to.have.all.keys(userExampleKeys1stLevel);
    });

    it('should create new user by POST request with status 201', async() => {
        const response = await axios.post(`${apiUrl}/users`, newlyCreatedUser);
        expect(response.data).to.have.all.keys(newlyCreatedUser);
        expect(response.status).to.equal(201);
    });

    it('should modify user by PATCH request with status 200', async() => {
        const response = await axios.patch(`${apiUrl}/users/1`, titleModified);
        expect(response.status).to.equal(200);
        expect(response.data.name).to.equal(titleModified.name)
    });

    it('should remove the user with DELETE', async() => {
        const response = await axios.delete(`${apiUrl}/users/1`);
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('object').that.is.empty;
    });

    it('should return posts written by user', async() => {
        const response = await axios.get(`${apiUrl}/users/1/posts`);
        expect(response.status).to.equal(200);
        if(response.data.length>0) {
            response.data.forEach( post => {
                expect(post.userId).to.equal(1);
            });
        }
    });
});
