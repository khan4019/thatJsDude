function createLink (data) {
	$.ajax({
	  type: "POST",
	  url: '../dbHandlers/createLink.php',
	  data: data,
	  dataType: 'json',
	  success: function(data){
		console.log('success');
	  },
	  error:function(x,e){
		console.log(x.responseText);
	  }
	});
	return false;
}