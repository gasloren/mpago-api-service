const Payment = require('../controllers/Payment');

const validAuthApiKeyToken = require('../validators/valid-auth-api-key-token');
const validPreference = require('../validators/valid-preference');
const validAccessToken = require('../validators/valid-access-token');
const checkValidationsErrors = require('../validators/check-validations-errors');

// ------------------------------------------

class PaymentCreate {

  constructor(server) {
    this.path = '/mpago/payment/create';
    this.server = server;
    this.route();
  }

  route() {
    this.server.post(
      this.path,
      [
        ...validAuthApiKeyToken,
        ...validAccessToken,
        ...validPreference,
        checkValidationsErrors
      ],
      async (req, res) => {
        try {
          const { accessToken, preference } = req.body;
          const payment = new Payment(accessToken, preference);
          const data = await payment.create();
          res.status(201).json({ data });
        } catch(error) {
          res.status(400).json({ error });
        }
      }
    );
  }

}

module.exports = PaymentCreate;
