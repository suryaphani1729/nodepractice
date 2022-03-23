const { iteratee } = require('lodash');
const request = require('supertest');
let server;
let token;

describe('auth', ()=> {
    beforeEach(async ()=>{
        server = require('../../index');
        const result = await request(server).post('/api/auth/')
        .set('Accept', 'application/json')
        .send({
            "email" : "surya@mail.com",
            "password": "surya"
        });
        expect(result.status).toBe(200);
        
        token = result.body.token;
    });
    afterEach(()=>{
        server.close();
    })

   it('401 auth ', async ()=>{
    const res = await request(server).get('/api/courses');
    expect(res.status).toBe(401);
       
   });
   it('400 auth ', async ()=>{
    const res = await request(server).get('/api/courses').set({'x-auth-token':'xyz'});
    expect(res.status).toBe(400);
   
        
   });
   it('200 Success ', async ()=>{
    const res = await request(server).get('/api/courses').set({'x-auth-token':token});
    expect(res.status).toBe(200);
   
        
   });

});