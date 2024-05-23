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
    await driver.get("https://www.airbnb.fr/");

    let destinationInput = await driver.wait(
      until.elementLocated(By.name("query")),
      10000
    );
    await driver.wait(until.elementIsVisible(destinationInput), 10000);
    await destinationInput.sendKeys("Paris");

    let startDate = await driver.findElement(
      By.css('[data-testid="structured-search-input-field-split-dates-0"]')
    );
    await driver.wait(until.elementIsVisible(startDate), 10000);
    await startDate.click();

    let selectedStartDate = await driver.findElement(
      By.css('[data-testid="calendar-day-23/05/2024"]')
    );
    await driver.wait(until.elementIsVisible(selectedStartDate), 10000);
    await selectedStartDate.click();

    let endDate = await driver.findElement(
      By.css('[data-testid="structured-search-input-field-split-dates-1"]')
    );
    await driver.wait(until.elementIsVisible(endDate), 10000);
    await endDate.click();

    let selectedEndDate = await driver.findElement(
      By.css('[data-testid="calendar-day-26/05/2024"]')
    );
    await driver.wait(until.elementIsVisible(selectedEndDate), 10000);
    await selectedEndDate.click();

    let voyageurs = await driver.findElement(
      By.css('[data-testid="structured-search-input-field-guests-button"]')
    );
    await driver.wait(until.elementIsVisible(voyageurs), 10000);
    await voyageurs.click();

    let incrementVoyageurs = await driver.findElement(
      By.css('[data-testid="stepper-adults-increase-button"]')
    );
    await driver.wait(until.elementIsVisible(incrementVoyageurs), 10000);
    await incrementVoyageurs.click();

    let searchButton = await driver.findElement(
      By.css('[data-testid="structured-search-input-search-button"]')
    );
    await driver.wait(until.elementIsVisible(searchButton), 10000);
    await searchButton.click();

    await driver.wait(until.titleContains("Paris"), 10000);
    let title = await driver.getTitle();
    console.log(title);

    assert(
      title.includes("Paris"),
      "The title does not match the query destination"
    );

    let url = await driver.getCurrentUrl();
    console.log(url);
    assert(
      url.includes(
        "checkin=2024-05-23",
        "The current url does not includes the trip's start date"
      )
    );
    assert(
      url.includes(
        "checkout=2024-05-26",
        "The current url does not includes the trip's end date"
      )
    );
    assert(
      url.includes(
        "adults=1",
        "The current url does not includes the chosen number of guests"
      )
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
