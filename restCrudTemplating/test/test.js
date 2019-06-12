const chai = require('chai');
const db = require("../db"); // opens the connection
/*
integration test request composition
test http apps or external services
assertions for common http tasks
chai expect and should interfaces
*/
const chaiHttp = require('chai-http')
const expect = chai.expect;
const app = require("../app");

chai.use(chaiHttp);

/*
When passing an app to request; it will automatically open the server for incoming requests (by calling listen()) and, once a request has been made the server will automatically
 shut down (by calling .close()). 
If you want to keep the server open, perhaps if you’re making multiple requests, you must call .keepOpen() after .request(), and manually close the server down:
*/

describe('testing CRUD endpoints', function() {
    describe('Test post endpoint', function () {
        it('should return with status 201 and a string with no error ', function (done) {
            chai.request(app)
                .post('/post')
                .send({ "name": 'justCreated' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.not.redirect;
                    expect(res).to.have.status(201);
                    done()
                })
        });
    });
    describe('Test get endpoint', function () {

        it('should return a json object with the value true', function (done) {
            chai.request(app)
                .get('/get')
                .query({ name: 'justCreated' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.not.redirect;
                    expect(res).to.have.status(200);
                    done()
                })
        });
    });
    describe('Test put endpoint', function () {

        it('should not return error and status code 200', function (done) {
            chai.request(app)
                .put('/put')
                .query({ originalValue: 'justCreated', updatedValue:"jonas" })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.not.redirect;
                    expect(res).to.have.status(200);
                    done()
                })
        });
    });
    describe('Test delete endpoint', function () {

        it('should not return error and status code 200', function (done) {
            chai.request(app)
                .delete('/delete')
                .query({updatedValue:"name" })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.not.redirect;
                    expect(res).to.have.status(200);
                    done()
                })
        });
    });
});