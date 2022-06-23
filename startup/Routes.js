const PaymentCreate = require('../endpoints/PaymentCreate');
const PaymentStatus = require('../endpoints/PaymentStatus');

// --------------------------------

class Routes {

  constructor(server) {
    this.paymentCreate = new PaymentCreate(server);
    this.paymentStatus = new PaymentStatus(server);
  }

}

module.exports = Routes;
