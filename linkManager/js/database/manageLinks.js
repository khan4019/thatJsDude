function createLink () {
	$.ajax({
	  type: "POST",
	  url: '../../dbHandlers/createTeam.php',
	  data: data,
	  dataType: 'json',
	  success: function(data){
		console.log('success');
	  },
	  error:function(x,e){
		console.log(e);
	  }
	});
	return false;
}