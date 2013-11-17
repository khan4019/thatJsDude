    //source: http://www.gethugames.in/blog/2012/04/authentication-and-authorization-for-google-apis-in-javascript-popup-window-tutorial.html

var OAUTHURL    =   'https://accounts.google.com/o/oauth2/auth?';
var VALIDURL    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
var SCOPE       =   'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
var CLIENTID    =   '638348368613.apps.googleusercontent.com';
var REDIRECT    =   'http://www.thatjsdude.com/'
var LOGOUT      =   'http://accounts.google.com/Logout';
var TYPE        =   'token';
var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
var acToken;
var tokenType;
var expiresIn;
var user;
var loggedIn    =   false;

function login() {
    var win =  window.open(_url, "windowname1", 'width=800, height=600');             
    var pollTimer   =   window.setInterval(function() { 
        
        try {
            var url = win.document.URL;                     
            if (url.indexOf(REDIRECT) != -1) {
                window.clearInterval(pollTimer);
                acToken =   gup(url, 'access_token');
                tokenType = gup(url, 'token_type');
                expiresIn = gup(url, 'expires_in');
                win.close();

                validateToken(acToken);
            }
        } catch(e) {
            console.log('error '+e);
        }
    }, 500);
}

function validateToken(token) {
    $.ajax({
        url: VALIDURL + token,
        data: null,
        success: function(responseText){  
            getUserInfo();
            loggedIn = true;
            $('#loginText, #logoutText').toggleClass('hide');            
        },
        error:function(){
            console.log('Failed to validateToken');
        },
        dataType: "jsonp"  
    });
}

function getUserInfo() {
    $.ajax({
        url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
        data: null,
        success: function(resp) {
            user    =   resp;            
            $('#uName').text('Welcome ' + user.name);
            
            saveNewUser({id:user.id, email:user.email, firstName:user.family_name, lastName:user.given_name});

            cookieManager.setCookie('uName', user.name, 100);
            cookieManager.setCookie('uEmail', user.email, 100);
            //$('#imgHolder').attr('src', user.picture);
        },
        error:function(){
            console.log('Failed to get userinfo');
        },
        dataType: "jsonp"
    });
}

function saveNewUser(data){
    $.ajax({
      type: "POST",
      url: 'dbHandlers/createUser.php',
      data: data,
      dataType: 'json',
      success: function(data){
        console.log(data);
      },
      error:function(x,e){
        console.log(x);             
      }
    });
    return false;
}

//credits: http://www.netlobo.com/url_query_string_javascript.html
function gup(url, name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\#&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    if( results == null )
        return "";
    else
        return results[1];
}

function startLogoutPolling() {
    $('#loginText, #logoutText').toggleClass('hide');
    loggedIn = false;
    $('#uName').text('That Js Dude');
    cookieManager.eraseCookie('uName');
    cookieManager.eraseCookie('uEmail');
    //$('#imgHolder').attr('src', 'none.jpg');
}
