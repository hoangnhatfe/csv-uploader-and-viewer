const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

// api/data?page=1&pageSize=100

describe('Get Data', () => {
  it('should upload a CSV file', (done) => {
    chai
      .request(app)
      .post('/api/data/upload')
      .attach('file', './tests/data/get-data.csv')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  })
  
  it('should get all data', (done) => {
    chai
      .request(app)
      .get('/api/data')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body).to.have.property('meta');
        expect(res.body.meta).to.be.an('object');
        done();
      });
  });
  
  it('should get data with pageSize', (done) => {
    chai
      .request(app)
      .get('/api/data?page=0&pageSize=100')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data.length).to.be.eql(100);
        done();
      });
  })

  it('should get data with page', (done) => {
    chai
      .request(app)
      .get('/api/data?page=1&pageSize=100')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.meta).to.be.an('object');
        expect(res.body.meta.pagination.page).to.be.eql(1);
        done();
      });
  })
});