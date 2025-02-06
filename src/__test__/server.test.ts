describe('nuestro primer test', ()=>{
    it('debe revisar que 1+1 sean 2', ()=>{
        expect(1+1).toBe(2)
    })
    it('debe revisar que 1+1 no sean 3', ()=>{
        expect(1+1).not.toBe(3)
    })
})