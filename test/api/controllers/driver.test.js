const assert = require('chai').assert;
const request = require('supertest');
process.env.NODE_PORT = 8090
const app = require('../../../app.js');
const driverRepo = require('../../../api/repositories/driver.repository.js');

describe('Controllers', () => {
    let server
    before(async () => {
        app.log.setTraceLevel('info')
        app.stop()
        server = await app.init()
    })
    beforeEach(() => {
        request(server)
            .post('/drivers')
            .send({
                name: 'César León Schaus',
                age: 31,
                phone: '011-57678510',
                email: 'cesar.leon.schaus@gmail.com',
                patent: 'MMY127',
                model: 'Fiesta',
                year: 2010
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                res;
            });
    })
    describe('Driver Controller', () => {
        describe('GET /drivers', () => {
            it('should return a driver array with one object', done => {
                request(server)
                    .get('/drivers')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        assert.isArray(res.body)
                        assert.equal(res.body.length, 1)
                        assert.isObject(res.body[0])
                        assert.equal(res.body[0].name, 'César León Schaus')
                        assert.equal(res.body[0].age, 31)
                        assert.equal(res.body[0].phone, '011-57678510')
                        assert.equal(res.body[0].email, 'cesar.leon.schaus@gmail.com')
                        assert.equal(res.body[0].patent, 'MMY127')
                        assert.equal(res.body[0].model, 'Fiesta')
                        assert.equal(res.body[0].year, 2010)
                        done();
                    });
            });
        })
        describe('POST /drivers', () => {
            it('should insert a new driver object', done => {
                request(server)
                    .post('/drivers')
                    .send({
                        name: 'Luis Perez',
                        age: 41,
                        phone: '011-57671000',
                        email: 'luis.perez@gmail.com',
                        patent: 'OPG127',
                        model: 'Focus',
                        year: 2015
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end(function (err, res) {
                        assert.isObject(res.body)
                        assert.equal(res.body.name, 'Luis Perez')
                        assert.equal(res.body.age, 41)
                        assert.equal(res.body.phone, '011-57671000')
                        assert.equal(res.body.email, 'luis.perez@gmail.com')
                        assert.equal(res.body.patent, 'OPG127')
                        assert.equal(res.body.model, 'Focus')
                        assert.equal(res.body.year, 2015)
                        done();
                    });
            });
        })
        describe('PUT /drivers/{id}', () => {
            it('should update a existing driver object', done => {
                let driverId
                request(server)
                    .get('/drivers')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        driverId = res.body[0].id
                        request(server)
                            .put(`/drivers/${driverId}`)
                            .send({
                                name: 'Luis Suarez',
                                age: 41,
                                phone: '011-57671000',
                                email: 'luis.perez@gmail.com',
                                patent: 'OPG127',
                                model: 'Focus',
                                year: 2015
                            })
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .expect(201)
                            .end(function (err, res) {
                                assert.isObject(res.body)
                                assert.equal(res.body.name, 'Luis Suarez')
                                assert.equal(res.body.age, 41)
                                assert.equal(res.body.phone, '011-57671000')
                                assert.equal(res.body.email, 'luis.perez@gmail.com')
                                assert.equal(res.body.patent, 'OPG127')
                                assert.equal(res.body.model, 'Focus')
                                assert.equal(res.body.year, 2015)
                                done();
                            });
                    });

            });
        })
        describe('DELETE /drivers/{id}', () => {
            it('should delete a existing driver object', done => {
                let driverId
                request(server)
                    .get('/drivers')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        driverId = res.body[0].id
                        request(server)
                            .delete(`/drivers/${driverId}`)                            
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .expect(201)
                            .end(function (err, res) {
                                assert.isObject(res.body)
                                assert.equal(res.body.success, 1)
                                assert.equal(res.body.description, 'Driver deleted successfully')
                                done();
                            });
                    });

            });
        })
    })
})