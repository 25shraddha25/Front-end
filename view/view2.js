"use strict";
App.Views.v3=Backbone.View.extend({
	//template: _.template($('#student_list').html()),
	template: Handlebars.compile($('#student_list').html()),
	tagName: "tr",
	initialize:function(that){
		this.collection=that.collection;
		console.log(this.collection);	
		this.render();
	},
	render:function(){ 
		$(".js-student-list").append(this.$el.append(this.template(this.model.toJSON())));
	},
	events:{
		'click #edit':'edit',
		'click #delete':'delete'
	},
	edit:function(){
		console.log('Editing'); 
		var id_edit=this.model.get('id');
		routes.navigate("student/edit/"+id_edit,{ trigger:true });										
	},
	delete:function(){
		console.log('Destroying model');
		var id_delete=this.model.get('id');
		var ok = confirm("Are you sure you want to delete this item?");
		if (ok)
 		 {
       		this.model.destroy({url: "student/"+ id_delete});
       		this.remove();
       		this.collection.total_records=this.collection.total_records-1;
       		$(".footer").html(this.collection.total_records);
       	}       	
	}
});
//App.Views.v3.off( null, null, this );

