const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Module = require('../models/module.js');
const sampleModule =     {
    "title": "Module 1",
    "description": "A modules of different parts of the frog.",
}

chai.use(chaiHttp);
chai.should();

describe('Modules', ()  => {

  after(() => {
    Module.deleteMany({title: 'Module 1'}).exec((err, modules) => {
      console.log(modules)
      modules.remove();
    })
  });

  // TEST INDEX
  it('should index ALL modules on / GET', (done) => {
    chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
          // Call done if the test completed successfully.
        });
  });

  // TEST NEW
  it('should display new form on /modules/new GET', (done) => {
      chai.request(app)
        .get(`/modules/new`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
          });
});

  // TEST CREATE
  it('should create a SINGLE modules on /modules POST', (done) => {
   chai.request(app)
     .post(`/modules/new`)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.html
         done();
       });
 });

  // TEST SHOW
  it('should show a SINGLE modules on /modules/<id> GET', (done) => {
    var modules = new Module(sampleModule);
    modules.save((err, data) => {
      chai.request(app)
        .get(`/modules/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });
  });

  // TEST EDIT
  it('should edit a SINGLE modules on /modules/<id>/edit GET', (done) => {
    var modules = new Module(sampleModule)
     modules.save((err, data) => {
       chai.request(app)
         .get(`/modules/${data._id}/edit`)
         .end((err, res) => {
           res.should.have.status(200);
           res.should.be.html
           done();
         });
     });
    });

    // TEST CREATE
  // it('should create a SINGLE modules on /modules POST', (done) => {
  //   chai.request(app)
  //       .post('/modules')
  //       .send(sampleModule)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.should.be.html
  //         done();
  //       });
  // });

  // TEST UPDATE
  it('should update a SINGLE modules on /modules/<id> PUT', (done) => {
    var modules = new Module(sampleModule);
    modules.save((err, data)  => {
     chai.request(app)
      .put(`/modules/${data._id}?_method=PUT`)
      .send({'title': 'Updating the title'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });

  // TEST DELETE
  it('should delete a SINGLE modules on /modules/<id> DELETE', (done) => {
    var modules = new Module(sampleModule);
    modules.save((err, data)  => {
     chai.request(app)
      .delete(`/modules/${data._id}?_method=DELETE`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });
});