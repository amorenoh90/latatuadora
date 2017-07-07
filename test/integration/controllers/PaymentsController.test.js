/**
 * Created by edwin.
 */
var request = require('supertest'),
  assert = require('assert');

describe('PaymentsControllerTest', function() {

  var mock = {
    name : "Pepito",
    email: "pepito@gmail.com",
    item: "Tattoo",
    payment_type: "OXXO",
    price: 300,
    itemTypeId: 1,
    itemId: 58
  },
  mockhook = {
   "short_id": "000000",
   "type": "charge.success",
   "object": "charge",
   "created": "1424024955774",
   "paid": true,
   "amount": "12.00",
   "livemode": true,
   "currency": "mxn",
   "refunded": false,
   "fee": "3.35",
   "fee_details": {
     "amount": "3.35",
     "currency": "mxn",
     "type": "compropago_fee",
     "description": "Honorarios de ComproPago",
     "application": null,
     "amount_refunded": 0,
     "tax": "1.80"
   },
   "order_info": {
     "order_id": "test_12",
     "order_price": "12.00",
     "order_name": "Chocolate",
     "payment_method": "cash",
     "store": "7Eleven",
     "country": "MX",
     "image_url": "http://upload.wikimedia.org/wikipedia/commons/5/56/Chocolate_cupcakes.jpg",
     "success_url": "http://example.com/success",
     "failed_url": "http://example.com/failed",
     "exchange": null
   },
   "customer": {
     "customer_name": "pepito",
     "customer_email": "pepito@gmail.com",
     "customer_phone": "5555555555"
   }
 } 
 var mockuser = {
        form: "user",
        name: "usertest",
        email: "payusertest@test.com",
        password: "password"
      },
      mockflash = {};
  it("should logup a normal User (prerequisites)", function (done) {
    request(sails.hooks.http.app)
    .post('/logup')
    .send(mockuser)
    .expect(function(res) {
      mockuser.token = res.body.token;
      assert.notEqual(res.body, null);
    })
    .expect(200, done);
  });
  it("should apply for buy a flash", function (done) {
    this.timeout(20000);
    request(sails.hooks.http.app)
      .post('/compropago')
      .send(mock)
      .set('X-Authorization', mockuser.token)
      .expect(function(res) {
        mockhook.id = res.body.id;
        assert.equal(res.body.status, "pending");
        assert.notEqual(res.body.instructions, null);
        assert.equal(res.body.item, mock.item);
      })
      .expect(200, done);
  });
  it("should seccess an order", function (done) {
    this.timeout(20000);
    request(sails.hooks.http.app)
      .post('/compropagopay')
      .send(mockhook)
      .expect(function(res) {
        assert.equal(mockhook.id, res.body.purchaseId)
        assert.equal(2, res.body.status);
      })
      .expect(200, done);
  });
});