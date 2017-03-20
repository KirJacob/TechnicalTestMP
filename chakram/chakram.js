var chakram = require('chakram');
var expect = chakram.expect;
var fs = require('file-system');

var utils = require("./utils");

describe('transaction operations', function() {
	var postTransactionId;
	var response;
	var globalKey;
	var amount;
	
	function getTimeStamp(){
		var currentdate = new Date(); 
		var datetime = currentdate.getDate() + "." + (currentdate.getMonth()+1)  + "." 
				+ currentdate.getFullYear() + " "  + currentdate.getHours() + "-"  
				+ currentdate.getMinutes() + "-" + currentdate.getSeconds();
		return datetime;
	}
	
	var fileName = "./logs/chakram" + getTimeStamp() + ".txt";
	fs.writeFileSync(fileName, "LOGS" + getTimeStamp());

	function addEntryToLog(testCase, text){
		fs.appendFileSync(fileName, "\n\n" + testCase + "\n\n");
		fs.appendFileSync(fileName, text);
	}

	it('should be possible to store transaction', function() {
		var response = chakram.post(utils.endPoint, utils.postRequestBody, utils.postRequestHeaders);
		expect(response).to.have.status(200);

		addEntryToLog("POST - request", JSON.stringify(utils.postRequestBody));
		expect(response).to.have.json('transaction', function (dataArray) {
			globalKey = dataArray.key;
			amount = dataArray.amount;
			addEntryToLog("POST - response", JSON.stringify(dataArray));
		});
		return chakram.wait();
	});

	it('should be possible to browse transaction', function() {
		response = chakram.get(utils.endPoint + "?key_or_custom_id=" + globalKey, utils.tokenData);
		expect(response).to.have.status(200);
		
		expect(response).to.have.json('transactions', function (dataArray) {
			expect(dataArray[0].status).to.equal('N');
			expect(dataArray[0].amount).to.equal(amount);

			addEntryToLog("BROWSE - response", JSON.stringify(dataArray[0]));
		});
		return chakram.wait();
	});

	it('should be possible to retrieve transaction', function() {
		response = chakram.get(utils.endPoint + "/" + globalKey, utils.tokenData);
		expect(response).to.have.status(200);

		expect(response).to.have.json('transaction', function(dataArray) {
			addEntryToLog("RETRIEVE - response", JSON.stringify(dataArray));
		});

		return chakram.wait();
	});

	it('should be possible to confirm transaction', function() {
		response = chakram.post(utils.endPoint + "/" + globalKey + "/confirm?private_token=" + utils.tokenData.headers["Private-Token"]);
		expect(response).to.have.status(200);

		expect(response).to.have.json('transaction', function(dataArray) {
			expect(dataArray.status).to.equal('C');
			addEntryToLog("CONFIRM - response", JSON.stringify(dataArray));
		});

		return chakram.wait();
	});

	it('should be possible to unconfirm transaction', function() {
		response = chakram.post(utils.endPoint + "/" + globalKey + "/unconfirm?private_token=" + utils.tokenData.headers["Private-Token"]);
		expect(response).to.have.status(200);

		expect(response).to.have.json('transaction', function(dataArray) {
			expect(dataArray.status).to.equal('N');
			addEntryToLog("UNCONFIRM - response", JSON.stringify(dataArray));
		});

		return chakram.wait();
	});

	it('should be possible to update transaction', function() {
		response = chakram.put(utils.endPoint + "/" + globalKey, utils.updateRequestBody, utils.updateRequestHeaders);
		expect(response).to.have.status(200);

		addEntryToLog("UPDATE - request", JSON.stringify(utils.updateRequestBody));
		expect(response).to.have.json('transaction', function(dataArray) {
			addEntryToLog("UPDATE - response", JSON.stringify(dataArray));
		});

		return chakram.wait();
	});
});

