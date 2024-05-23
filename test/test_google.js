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
    await driver.get("https://www.google.com");

    try {
      let consentButton = await driver.wait(
        until.elementLocated(By.id("W0wltc")),
        5000
      );
      if (consentButton) {
        await consentButton.click();
      }
    } catch (err) {}

    let searchInput = await driver.wait(
      until.elementLocated(By.name("q")),
      10000
    );
    await searchInput.sendKeys("simplon", Key.RETURN);

    await driver.wait(until.titleContains("simplon"), 10000);
    let title = await driver.getTitle();
    assert(title.includes("simplon"), "Title does not contain search query");
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
