import supertest from 'supertest'
import app from '../../server'
import { DUMMY_ORDER } from '../models/orderSpec'

import { TOKEN } from './userSpec'

const request = supertest(app)

describe('Order Route', ()=>{
    it('Fetches all orders', async()=>{
        const response = await request.get('/orders')
        expect(response.status).toEqual(200)
    })
    it('Fetches certain order', async()=>{
        const response = await request.get('/orders/1')
        expect(response.status).toEqual(200)
    })
    it('Creates an order', async()=>{
        const response = await request.post('/orders').send(DUMMY_ORDER).set('Authorization', 'Bearer ' + TOKEN)
        expect(response.body.quantity).toEqual(2)
    })
})