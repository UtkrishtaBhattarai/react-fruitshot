const {Builder, By, Key, util }=require("selenium-webdriver")
const firefox=require("selenium-webdriver/firefox")
const options=new firefox.Options();
options.setPreference("browser.download.dir","C:\\mySeleniuDownloads")
options.setPreference("browser.download.folderList",2)
async function example()
{
    let driver= await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:3000");
    await driver.findElement(By.name("q")).sendKeys("kaka",Key.ENTER)

}

async function login()
{
    let driver= await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.name("email")).sendKeys("qagydu@mailinator.com",Key.TAB)
    await driver.findElement(By.name("password")).sendKeys("qagydu@mailinator.com",Key.TAB)
    await driver.findElement(By.name("login")).sendKeys(Key.ENTER)
    var request = require("request");
    request({uri: "http://localhost:3000/login", method:"POST", form:{"status":"Login Successful!","reason":""}})
}


login()