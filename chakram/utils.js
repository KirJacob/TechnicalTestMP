var exports = module.exports = {};

exports.requestSmth = "Hello from export";

exports.endPoint = "https://api.taxamo.com/api/v1/transactions";

exports.postRequestHeaders = {
	"headers":{
		"Content-Type":"application/json"
	}
}
exports.tokenData = {
	"headers":{
		'Private-Token':'SamplePrivateTestKey1'
	}
}

exports.updateRequestHeaders = {
	"headers":{
		"Content-Type":"application/json",
		'Private-Token':'SamplePrivateTestKey1'
	}
}

exports.postRequestBody = {
  "transaction": {
      "transaction_lines": [
          {
              "custom_id": "line1",
              "amount": 1314
          }
      ],
      "currency_code": "GBP",
      "billing_country_code": "UA",
      "buyer_credit_card_prefix": "131313131"
  },
  "public_token": "SamplePublicTestKey1"
}

exports.updateRequestBody = {
  "transaction": {
    "custom_id": "custom_id_121441",
    "order_date": "2013-11-14",
    "currency_code": "EUR",
    "billing_country_code": "IE",
    "buyer_credit_card_prefix": "424242424",
    "buyer_tax_number": "IE5251981413X",
    "tax_country_code": "IE",
    "tax_deducted": true,
    "tax_country_code": "IE",
    "buyer_ip": "127.0.0.1",
    "invoice_date": "2014-11-15",
    "invoice_place": "Geneva, Switzerland",
    "invoice_number": "511414/2013",
    "invoice_address": {
      "street_name": "Langford St",
      "building_number": "32",
      "city": "KillorglinKirill",
      "region": "Kerry"
    },
    "transaction_lines": [
      {
        "custom_id": "line1",
        "line_key": "e_43E3wlNnpJ0tpj",
        "product_type": "e-service",
        "quantity": 1,
        "amount": 100,
        "description": "hosting",
        "product_code": "hosting_1"
      }
    ]
  }
}