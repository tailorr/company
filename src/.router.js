function setRouter(app){ 
 var router = app; 

app.get('/getProducts', function(request, response) {

    response.send({ a: 1 })
})}
 module.exports.setRouter = setRouter