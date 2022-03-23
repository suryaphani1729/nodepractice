const request = require('supertest');
const courses = require('../../routes/courses');
let server;
let token;
describe('courses',()=>{
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
  
    describe('GET',()=>{
        it('Should return all courses',async ()=>{


            const res = await request(server).get('/api/courses').set({'x-auth-token':token});
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            
            
          });
          it('Should return added course',async ()=>{


            const res2 = await request(server).post('/api/courses')
            .set({'x-auth-token':token}).send({"name":"ne"});

            expect(res2.status).toBe(400);

            const res = await request(server).post('/api/courses')
            .set({'x-auth-token':token}).send({"name":"newCourse"});

            expect(res.status).toBe(200);
            console.log(res.body);
            expect(res.body).toMatchObject({"name":"newCourse"});
            
            
          });
          
    });
    describe('GET /:id',()=>{
       
        it('Should return request course',async ()=>{


          const res = await request(server).post('/api/courses')
          .set({'x-auth-token':token}).send({"name":"newCourse"});

          expect(res.status).toBe(200);
          
          const _id = res.body.id;

          const res2 = await request(server).get(`/api/courses/${_id}`);
          expect(res2.body).toMatchObject(res.body);
          const res3 = await request(server).get(`/api/courses/123`);
          expect(res3.status).toBe(404);
         
          
        });
        
  });
      
  });