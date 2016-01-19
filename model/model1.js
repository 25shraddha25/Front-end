"use strict";
var g;
var i=0;
App.Models.pro = Backbone.Model.extend({	
	initialize:function(){
			console.log('FIRE');
			console.log('model done');
		},
		insert:function(post){		
			$.ajax({
			type: "POST", 
	        contentType: "application/x-www-form-urlencoded",       
	        url: "http://www.facebooklogintest.com/student",
	        data:post,
	        dataType:"json",	       	
	        success: function(response) {
				routes.navigate("student/page/:id",{trigger:true });	 
	        },
	        error: function(error) {
	        	alert('ENTER PROPER DATA');
	        }	
	    });
		},
		get_id:function(id,successCallback){
			var that = this
			$.ajax({   
	        url: "http://lwww.facebooklogintest.com/student?number="+id,
	        dataType:"json",
	        success: function(data){
	        	var obj=data;
	        	that.set(obj.data[0]); 
	        	successCallback(data);
	        },
	        error: function(error) {
	            console.log("error");
	        }
	    });
		},		
		edit:function(id,post){
			$.ajax({
	        type: "PUT",  
	        contentType: "application/x-www-form-urlencoded",     
	        url: "http://www.facebooklogintest.com/student/"+id,
	        data:post,
	        dataType:"json",
	        success: function(response) {
	        	//routes.navigate("student/create/new",{trigger:true });  
	        	routes.navigate("student/page/:id",{trigger:true });		        	
	        },
	        error: function(error) {
	        	alert('ENTER PROPER DATA');
	        	routes.navigate("student/"+id,{trigger:true });
	        }
	    });
		}

	});
