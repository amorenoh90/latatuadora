var mocha = require("mocha");
var assert = require("assert");

describe('EmailService', function () {

  var mockemail = {
      //to: 'alberto@blick.mx',
      to: 'dyll240719@gmail.com',
      subject: "Test Email Service",
      text: 'mock Text',
      model: {
        user: {
          name: "Juan Alberto"
        }
      }
    },
    mockQuotationEmail = {
      //to: 'alberto@blick.mx',
      to: 'dyll240719@gmail.com',
      subject: "Test Email Service",
      text: 'mock Text',
      model: {
        quotation: {
          styleId: {
            name: 'Religioso',
            quotation: false,
            createdAt: '2017-09-28T14:29:57.909Z',
            updatedAt: '2017-09-28T14:29:57.909Z',
            id: 1
          },
          userId: 10,
          freelancerId: null,
          bodypartId: {
            name: 'Brazo',
            createdAt: '2017-09-28T14:29:57.930Z',
            updatedAt: '2017-09-28T14:29:57.930Z',
            id: 1
          },
          studioId: null,
          dimensionsY: 4,
          dimensionsX: 4,
          comments: 'False comment to quote a tattoo',
          used: false,
          createdAt: '2017-09-28T14:30:05.637Z',
          updatedAt: '2017-09-28T14:30:05.637Z',
          id: 1,
          user: {
            name: 'Pepito',
            email: 'blick@blick.com',
            telephone: '92050923',
            updatedAt: '2017-09-28T14:30:05.632Z'
          },
          referenceList: [],
          maxAmount: 600,
          minAmount: 600
        }
      }
    };

  it("should send a welcome email", function (done) {
    EmailService.sendUserWelcomeMail(mockemail, function (err, email) {
      if (err) {
        done(err);
      } else {
        assert.equal(email.message, "email sended");
        done();
      }
    })
  });

  it("should send a Studio welcome email", function (done) {
    EmailService.sendStudioWelcomeMail(mockemail, function (err, email) {
      if (err) {
        done(err);
      } else {
        assert.equal(email.message, "email sended");
        done();
      }
    })
  });

  it("should send a Admin welcome email", function (done) {
    EmailService.sendAdminWelcomeMail(mockemail, function (err, email) {
      if (err) {
        done(err);
      } else {
        assert.equal(email.message, "email sended");
        done();
      }
    })
  });

  it("should send a Studio Quotation email", function (done) {
    mockQuotationEmail.model.quotation.freelancerId = {
      name: "kris"
    };
    mockQuotationEmail.model.quotation.studio = mockQuotationEmail.model.quotation.freelancerId;
    EmailService.sendStudioQuotation(mockQuotationEmail, function (err, email) {
      if (err) {
        done(err);
      } else {
        assert.equal(email.message, "email sended");
        done();
      }
    })
  });

  it("should send a Admin Quotation email", function (done) {
    EmailService.sendAdminQuotation(mockQuotationEmail, function (err, email) {
      if (err) {
        done(err);
      } else {
        assert.equal(email.message, "email sended");
        done();
      }
    })
  });

  it("should send a User Quotation email", function (done) {
    EmailService.sendUserQuotation(mockQuotationEmail, function (err, email) {
      if (err) {
        done(err);
      } else {
        assert.equal(email.message, "email sended");
        done();
      }
    })
  });
});
