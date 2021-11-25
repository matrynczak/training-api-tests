import chai from 'chai';
import axios from 'axios';
import mocha from "mocha";

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


    mocha.describe('Tests of users endpoint', () => {

    it('should get the list of users with code 200', async() => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        expect(response.status).to.equal(200);
    });

    it('should respond with 404 for incorrect users endpoint', async() => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/userssss', { validateStatus: false })
        expect(response.status).to.equal(404);
    });

    it('should get the user with attributes', async() => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/1')
        expect(response.data).to.deep.equal(userExample)
    });

    it('should get the user with attributes', async() => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/1')
        expect(response.data).to.have.all.keys(userExampleKeys1stLevel);
    });

    it.only('should create new user by POST request with status 201', async() => {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', newlyCreatedUser)
        expect(response.data).to.have.all.keys(newlyCreatedUser);
        expect(response.status).to.equal(201);
    });
});
