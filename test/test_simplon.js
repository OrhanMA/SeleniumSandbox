const {
  By,
  Key,
  Builder,
  Actions,
  WebElementCondition,
  until,
} = require("selenium-webdriver");
const assert = require("assert");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function test_function() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://simplonline.co");
    let cookieButton = await driver.wait(
      until.elementLocated(By.className("sc-3243846d-0 eZuIYT")),
      5000
    );
    await cookieButton.click();
    let emailInput = await driver.wait(
      until.elementLocated(By.name("email")),
      5000
    );
    await emailInput.sendKeys("madi.assani.simplon@gmail.com");
    let passwordInput = await driver.wait(
      until.elementLocated(By.name("password")),
      5000
    );
    await passwordInput.sendKeys("Jm4plOmA#");
    let connectionButton = await driver.wait(
      until.elementLocated(By.css("[type='submit']")),
      5000
    );
    await connectionButton.click();

    let promoChoice = await driver.wait(
      until.elementLocated(By.css("[aria-label='Afficher les suggestions']"))
    );
    await promoChoice.click();

    let cdaChoicie = await driver.wait(
      until.elementLocated(
        By.xpath("//*[text()='CDA PRF Grenoble Janv24 P21']")
      )
    );
    await cdaChoicie.click();

    let rendusButton = await driver.wait(
      until.elementLocated(By.css("[href='/briefs/my-briefs']"))
    );
    await rendusButton.click();

    let individuelInput = await driver.wait(
      until.elementLocated(By.xpath("//*[text()='Assignés individuellement']"))
    );
    await individuelInput.click();

    let briefCard = await driver.wait(
      until.elementLocated(
        By.css("[href='/briefs/9cbff6af-82f5-4ff6-a2dd-868a02038da7']")
      )
    );
    await briefCard.click();

    let optionsButton = await driver.wait(
      until.elementLocated(By.xpath("//*[text()='Options']"))
    );
    await optionsButton.click();

    let optionRendu = await driver.wait(
      until.elementLocated(By.css("[data-key='submitIndividualWork']"))
    );
    await optionRendu.click();

    let buttonRendu = await driver.wait(
      until.elementLocated(By.xpath("//*[text()='Soumettre un rendu']"))
    );
    await buttonRendu.click();

    let linkInput = await driver.wait(
      until.elementLocated(By.css("[placeholder='Coller votre URL ici...']")),
      5000
    );
    await linkInput.sendKeys("https://github.com/OrhanMA/SeleniumSandbox");

    let addLinkButton = await driver.wait(
      until.elementLocated(
        By.css("[type='button'][class='sc-9f43adf8-0 egdvqs']")
      )
    );
    await addLinkButton.click();

    await driver.actions().sendKeys(Key.TAB, Key.TAB, Key.TAB).perform();

    await driver
      .actions()
      .sendKeys("Message automatique depuis mon test Selenium")
      .perform();

    let submitButton = await driver.wait(
      until.elementLocated(By.xpath("//*[text()='Envoyer']")),
      5000
    );
    await submitButton.click();
    await sleep(3000);
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
