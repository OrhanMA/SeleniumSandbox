const {
  By,
  Key,
  Builder,
  WebElementCondition,
  until,
} = require("selenium-webdriver");
const assert = require("assert");

(async function test_function() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://github.com/");

    let loginButton = await driver.wait(
      until.elementLocated(By.linkText("Sign in")),
      10000
    );
    await loginButton.click();

    await driver.wait(until.titleContains("Sign in to GitHub · GitHub"), 10000);
    let title = await driver.getTitle();
    console.log(title);

    assert(
      title.includes("Sign in to GitHub · GitHub"),
      "The title does not match the Github's sign in page title"
    );

    let usernameInput = await driver.wait(
      until.elementLocated(By.name("login")),
      10000
    );
    await usernameInput.sendKeys("simplon");
    let passwordInput = await driver.wait(
      until.elementLocated(By.name("password")),
      10000
    );
    await passwordInput.sendKeys("simplon", Key.RETURN);

    let flashError = await driver.wait(
      until.elementLocated(By.className("js-flash-alert")),
      10000
    );
    let flashErrorText = await flashError.getText();
    assert(
      flashErrorText.includes("Incorrect username or password."),
      "No error flash on sign in form submit"
    );
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();

    /*
	    setInterval(function(){
	        driver.quit();
	    }, 10000);
			*/
  }
})();
