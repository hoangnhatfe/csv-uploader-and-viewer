const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('File Upload API', () => {
  it('should upload a CSV file', (done) => {
    chai
      .request(app)
      .post('/api/data/upload')
      .attach('file', './tests/data/data-valid-1.csv')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should return error if no file is uploaded', (done) => {
    chai
      .request(app)
      .post('/api/data/upload')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.have.property('message').eql('No file uploaded');
        done();
      });
  });
  it('should return error if file is not CSV', (done) => {
    chai
      .request(app)
      .post('/api/data/upload')
      .attach('file', './tests/data/data-invalid-1.txt')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.have.property('message').eql('File must be CSV');
        done();
      });
  });
  it('should return error if file is not valid CSV', (done) => {
    chai
      .request(app)
      .post('/api/data/upload')
      .attach('file', './tests/data/data-invalid-1.csv')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.have.property('message').eql('Invalid CSV data');
        done();
      });
  });
});
