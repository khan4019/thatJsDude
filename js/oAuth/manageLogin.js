var uName = cookieManager.getCookie('uName');
      if(uName){
        $('#loginText, #logoutText').toggleClass('hide');
        $('#uName').text('Welcome ' + uName);
      }else{
        $('#uName').addClass('hide');
      }

      $('#loginText').on('click', function(){
        login();
      });
      $('#logoutText').on('click', function () {
         
         $('#myIFrame').location='https://www.google.com/accounts/Logout'; 
         startLogoutPolling();
         return false;
      });