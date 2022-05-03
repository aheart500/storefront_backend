import supertest from 'supertest'
import app from '../../server'
import { DUMMY_USER } from '../models/usersSpec'

const request = supertest(app)
export const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJtb2hhbWVkIiwibGFzdG5hbWUiOiJuYXNzZXIiLCJwYXNzd29yZCI6IiQyYiQxMSRqdlBLM1doenJSRmFrZHBqbkVjOUx1OFBteTNCT29wVDVWZ3BKMUJIVk9wWEYxQm9rUmsyQyJ9LCJpYXQiOjE2NTE1OTExMDV9.T1AKcpzDnw0J1TUnTuNuKiPg_pw3jJCWJgqmtNzcqLA'

describe('User Route', ()=>{
    it('Fetches users without auth token',async ()=>{
        const response = await request.get('/users')
        expect(response.status).toEqual(401)
    })
    it('Fetches users',async ()=>{
        const response = await request.get('/users').set('Authorization', 'Bearer ' + TOKEN)
        expect(response.status).toEqual(200)
    })
    it('Fetches a single user',async ()=>{
        const response = await request.get('/users/1').set('Authorization', 'Bearer ' + TOKEN)
    
        expect(response.body.firstname).toEqual('Mohamed')
    })
    it('Creates a user',async ()=>{
        const response = await request.post('/users').send(DUMMY_USER).set('Authorization', 'Bearer ' + TOKEN)
        expect(response.body.firstname).toEqual('Mohamed')
    })
    it('logs a user with correct credintials',async ()=>{
        const response = await request.post('/users/login').send(DUMMY_USER).set('Authorization', 'Bearer ' + TOKEN)
        expect(response.body).toBeTruthy()
    })
    it('logs a user with incorrect credintials',async ()=>{
        const response = await request.post('/users/login').send({...DUMMY_USER, password: '0110'}).set('Authorization', 'Bearer ' + TOKEN)
        expect(response.body).toEqual(null)
    })
    it('gets active user orders',async ()=>{
        const response = await request.get('/users/1/orders/active').set('Authorization', 'Bearer ' + TOKEN)
        expect(response.body).toBeTruthy()
    })
})

