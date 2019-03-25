const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http')

describe('Test get endpoint', function () {
    
    before(function (done) {
        this.server = app.listen(3004, function () {
            done()
        });
    });

    it('should return a json object with the value true', function () {
        chai.request(this.server)
            .get('/')
            .end((err, res) => {
                expect(err).to.be.json;
                expect(res).to.have.status(200)
                done()
            })
    });

    after(function () {
        this.server.close()
    });
});