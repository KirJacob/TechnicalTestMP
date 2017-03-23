describe('Test for CleverBot', function() {

	var userEmail = 'livatek.user24@gmail.com';
	var userPassword = '2015user02';
	var userName = 'livatek.user24';
	var userFullName = 'livatek.user24';
	var verificationMessage = "We have sent you an email. Please click on the link to verify your account.";

	before(function(client, done) {
		done();
	});

	after(function(client, done) {
		if (client.sessionId) {
			client.end(function() {
				done();
			});
		}else{
			done();
		}
	});

	function signUp(browser, login, username, email, password){
	  browser
		.url('http://www.cleverbot.com/')
		.click('#cbsocialsigninup>span')
		.setValue('#cbsocialsignupform>input[name=username]', login)
		.setValue('#cbsocialsignupform>input[name=fullname]', username)
		.setValue('#cbsocialsignupform>input[name=email]', email)
		.click('#cbsocialsignupform>.passwordclear')
		.setValue('#cbsocialsignupform>.passwordnormal', password)
		.click('select[id=cbsocialregisterterms] option[value="yes"]')
		.click('#cbsocialsignupform>input[type=submit]')
		.waitForElementVisible('#cbsocialmessagesignup>span', 10000)
		.assert.containsText('#cbsocialmessagesignup>span', verificationMessage);
	}

	function verifyInvitation(browser, login, password){
		browser
			.url('http://mail.google.com')
      		.waitForElementVisible('body', 1000)
      		.click('div>a:nth-child(2)')
			.setValue('#Email',login)
			.click('input[id=next]')
			.clearValue('#Passwd')
			.setValue('#Passwd', password)
			.click('#signIn')
      		.waitForElementVisible('body', 1000)
			.useXpath()
			.waitForElementVisible('//span[@class="bog"]/b[contains(text(),"Cleverbot")]', 60000)
			.click('//span[@class="bog"]/b[contains(text(),"Cleverbot")]')
			.click('//a[contains(@href,"cleverbot.com")]')
			.pause(5000)
			.window_handles(function(result) {
                var newHandle = result.value[1];
                browser.switchWindow(newHandle);
            })
			.pause(5000);
	}

	function signInWithUser(browser, login, password, username){
		browser
 			.useCss()
			.setValue('#cbsocialmessagesignin + input[name=username]', login)
			.click('#cbsocialmessagesignin~input[class=passwordclear]')
			.setValue('#cbsocialmessagesignin~input[class=passwordnormal]', password)
			.click('input[value="sign in"]')
      		.waitForElementVisible('body', 1000)
			.assert.containsText('#cbsocialsigninup>span', username)
      		.waitForElementVisible('body', 1000);
	}

	function chatWithBot(browser, message){
		browser
			.click('.stimulus')
			.setValue('.stimulus',message)
			.keys(browser.Keys.ENTER)
			.waitForElementVisible('#snipTextIcon', 10000);
	}

	it('should be possible to sign up to CleverBot', function(client) {
		signUp(client, userName, userFullName, userEmail, userPassword);
	});

	it('should be possible to sign in to gmail mailbox and verify invitation', function(client) {	
		verifyInvitation(client, userEmail, userPassword);	
		signInWithUser(client, userEmail, userPassword, userName);       
	});

	it('should be possible to chat with a bot for a while', function(client) {	
		chatWithBot(client, 'Hello there');
		chatWithBot(client, 'How are you doing?');
		chatWithBot(client, 'Are you Hungry?');
	});
});
