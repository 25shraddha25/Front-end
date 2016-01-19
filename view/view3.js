"use strict";
App.Views.v9=Backbone.View.extend({
	template: Handlebars.compile($('#mainTemplate').html()),								
	//template: _.template($('#student_list_header').html()),
	initialize:function(){
		this.render();
	},
	render:function(){ 
		$("#StudentListHeader").html(this.$el.append(this.template()));
	}
});
