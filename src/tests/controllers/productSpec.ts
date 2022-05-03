import supertest from 'supertest'
import app from '../../server'
import { DUMMY_PRODUCT } from '../models/productSpec'
import { TOKEN } from './userSpec'

const request = supertest(app)

describe('Product Route', ()=>{
    it('Fetches all products', async()=>{
        const response = await request.get('/products')
        expect(response.status).toEqual(200)
    })
    it('Fetches certain product', async()=>{
        const response = await request.get('/products/1')
        expect(response.status).toEqual(200)
    })
    it('Creates a product', async()=>{
        const response = await request.post('/products').send(DUMMY_PRODUCT).set('Authorization', 'Bearer ' + TOKEN)
        expect(response.body.name).toEqual('Book')
    })
})