const axios = require('axios');

const validAuthApiKeyToken = require("../validators/valid-auth-api-key-token");
const validAccessToken = require("../validators/valid-access-token");
const validRequestId = require("../validators/valid-request-id");
const checkValidationsErrors = require("../validators/check-validations-errors");

const mpPaymentsUrl = process.env.MP_REQUEST_PAYMENT;

// ------------------------------------------

class PaymentStatus {

  constructor(server) {
    this.path = '/mpago/payment/status';
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
      (req, res) => {
        const { accessToken, requestId } = req.body;
        axios({
          method: 'get',
          url: `${mpPaymentsUrl}/${requestId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(({ data }) => {
          res.status(200).json({ data });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
      }
    );
  }

}

module.exports = PaymentStatus;
