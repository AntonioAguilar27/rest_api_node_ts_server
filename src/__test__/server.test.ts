import request from 'supertest'
import server, { conectDB } from '../server'
import db from '../config/db'


jest.mock('../config/db')

describe('conectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('hubo un error al conectar con la bd'))
        const consoleSpy = jest.spyOn(console, 'log')

        await conectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('hubo un error al conectar con la bd')
        )
    })
})