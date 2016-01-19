"use strict";
var i=0;
//var page_num;
App.Router=Backbone.Router.extend({
//var AppRouter=Backbone.Router.extend({
	routes:{
		'student/page/:id':'display_first_page',
		'student/edit/:id':'edit',
		'student/create/new':'insert'		
	},
	initialize: function(){
		this.collection=new App.Collections.coll();	
	},
	display_first_page: function(){
		console.log(this.collection);
		 var v1= new App.Views.v1({
			collection: this.collection
		});
	},
	edit: function(id){
		var model=new App.Models.pro();		
		model.get_id(id,function successCallback(){
	    var vf=new App.Views.view_form({model:model});			
	    });
	},
	insert:function(){
		var viewsf=new App.Views.view_form({
			model : new App.Models.pro()
		});
	}
	
});
//var app_router = new AppRouter;
var routes = new App.Router();
Backbone.history.start();
