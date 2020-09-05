/* Script to help interact with backEnd
 * */

let user;

let userKey = "user";

readUser();


function clearUserInfo()
{
    window.sessionStorage.setItem(userKey, null);
    window.localStorage.setItem(userKey, null);
}

function readUser()
{
    user = JSON.parse(window.sessionStorage.getItem(userKey));
    if (user === null)
    {
        user = JSON.parse(window.localStorage.getItem(userKey));
    }
}

function getUser()
{
    return user;
}

function setUser(newUser, storeTemporary)
{
    user = newUser;
    window.sessionStorage.setItem(userKey, null);
    window.localStorage.setItem(userKey, null);
    if (storeTemporary)
    {
        window.localStorage.setItem(userKey, JSON.stringify(newUser));
    }
    else
    {
        window.sessionStorage.setItem(userKey, JSON.stringify(newUser));
    }

}

class User
{
    constructor(username, token, tokenUse)
    {
        this.username = username;
        this.token = token;
        this.tokenUse = tokenUse;
    }
}

class PostRequest
{
    constructor(command, user)
    {
        this.command = command;
        if (user !== undefined)
        {

            this.username = user.username;
            this.tokenUse = user.tokenUse;
            this.token = user.token;
        }
    }

    setCRUDRequest(request)
    {
        this.content = "";
        this.content += JSON.stringify(request);
    }

}

class CRUDRequest
{
    constructor()
    {
    }
}


function sendPostRequest(postRequest, onReadyFunction)
{
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function ()
    {
        if (this.readyState === 4)
        {
            onReadyFunction(xmlHttpRequest);
        }
    };
    xmlHttpRequest.open("POST", host, true);
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
    console.log(JSON.stringify(postRequest));
    xmlHttpRequest.send(JSON.stringify(postRequest));
}


/* Sends a XMLHttpRequest To Get The Form Html
 *
 *
 *  */
function getForm(pageName, onReadyFunction)
{
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            onReadyFunction(xmlHttpRequest);
        }
    };
    xmlHttpRequest.open("GET", pageName, true);
    xmlHttpRequest.send();
}

function getFormLink(formName)
{
    return host + formName;
}


//This is defined in navbar.js but requires function in postutil to work
// we call it here
getForm(getFormLink("navbar.html"), loadNavBarFunction);

