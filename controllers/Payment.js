const mercadopago = require('mercadopago');

// ------------------------------------------------

class Payment {

  constructor(accessToken, preference) {
    this.mercadopago = mercadopago;
    this.integratorId = process.env.MP_INTEGRATOR_ID;
    this.accessToken = accessToken;
    this.preference = preference;
    this.inicialize();
  }

  inicialize() {
    this.mercadopago.configure({
      access_token: this.accessToken,
      integrator_id: this.integratorId
    });
  }

  create() {
    return new Promise((resolve, reject) => {
      this.mercadopago.preferences.create(this.preference)
      .then(response => {
        resolve(response.body);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

}

module.exports = Payment;
