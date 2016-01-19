
"use strict";
var modefg;
var mode;
var v4;
var f=["1","2","3","4","5","6","7"];
App.Collections.coll=Backbone.Collection.extend({
		model:App.Models.pro,
		initialize:function(){
			console.log('Collection done');
		},
		disc:function(commonCallback){
			console.log(this);//collection
			var that = this
			console.log('API sending');	
			console.log('Query run');
			var per=$('#forms').serialize()
			var x=per.split('=');
			var y=x[1];
			console.log(y);
			var url='http://www.facebooklogintest.com/student?page='+(this.page || "")+"&per_page=" + (this.per_page || "") + "&query=" + (this.query || "")+"&subject=" + (this.subject || "")+"&subj1=" + (this.subj1 || "")+"&subj2=" + (this.subj2 || "")+"&subj3=" + (this.subj3 || "")+"&subj4=" + (this.subj4 || "")+"&subj5=" + (this.subj5 || "")+"&subj6=" + (this.subj6 || "");
			$(".js-student-list").empty();
			console.log(url);	
				$.ajax({ 
						url: url,
						success:function(data){	
						commonCallback(data);
						},
						error:function(error){
						console.log(error);
						}
				
		});
		}
		
});

