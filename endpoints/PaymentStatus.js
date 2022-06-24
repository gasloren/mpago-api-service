const axios = require('axios').default;

const validAuthApiKeyToken = require("../validators/valid-auth-api-key-token");
const validAccessToken = require("../validators/valid-access-token");
const validRequestId = require("../validators/valid-request-id");
const checkValidationsErrors = require("../validators/check-validations-errors");

const URL = process.env.MP_REQUEST_PAYMENT;

// ------------------------------------------

class PaymentStatus {

  constructor(server) {
    this.path = '/mercadopago/payment/status';
    this.server = server;
    this.route();
  }

  route() {
    this.server.post(
      this.path,
      [
        ...validAuthApiKeyToken,
        ...validAccessToken,
        ...validRequestId,
        checkValidationsErrors
      ],
      async (req, res) => {
        try {
          const { accessToken, requestId } = req.body;
          const url = `${URL}/${requestId}`;
          const { data } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          res.status(200).json({ data });
        } catch(error) {
          res.status(400).json({ error });
        }
      }
    );
  }

}

module.exports = PaymentStatus;
