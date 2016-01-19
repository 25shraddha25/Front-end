"use strict";
App.Views.view_form=Backbone.View.extend({
	//template: _.template($('#form_template').html()),
	template: Handlebars.compile($('#form_template').html()),
	
	initialize:function(){	
		this.render();	
		this.check_subjects();		
	},
	render:function(){ 
		$("#SubDiv").html('');
		$("#ParentDiv").html(this.$el.append(this.template(this.model.toJSON())));
	},
	check_subjects:function(){	
	   var sub_name=this.model.get('subject');
	   					var t=sub_name.split(',');
	   					if(t.length<2)
	   					{	console.log('#'+t);
	   						$('#'+t[0]).attr( 'checked', true );
	   					}
	   					else
	   					{
	  						console.log('two values');
	   						$('#'+t[0]+','+'#'+t[1]).attr( 'checked', true );
	   					}	   	
	},
	events:{
		'click #save':'save_insert',	
		'change #branch':'set_Subj'
	},
	set_Subj:function(){
		var y=this.$el.find('#branch').val();
		if(y=='CMPN')
		{
			this.$el.find(':checkbox').attr( 'checked', false );
			this.$el.find('#'+'HCI'+','+'#'+'PCT').prop( 'checked', true );
			this.$el.find('#'+'DataWarehouse'+','+'#'+'DataMining'+','+'#'+'Sensors'+','+'#'+'NeuralNetworks').prop( 'disabled', true );
		}
		else if(y=='IT')
		{
			this.$el.find(':checkbox').attr( 'checked', false );
			this.$el.find('#'+'DataWarehouse'+','+'#'+'DataMining').prop( 'checked', true );
			this.$el.find('#'+'HCI'+','+'#'+'PCT'+','+'#'+'Sensors'+','+'#'+'NeuralNetworks').prop( 'disabled', true );
		}
		else{
			this.$el.find(':checkbox').attr( 'checked', false );
			this.$el.find('#'+'Sensors'+','+'#'+'NeuralNetworks').prop( 'checked',true );
			this.$el.find('#'+'DataWarehouse'+','+'#'+'DataMining'+','+'#'+'HCI'+','+'#'+'PCT').prop( 'disabled', true );
		}
	},
	save_insert:function(e){
		e.preventDefault()
		console.log('Saving');
		var id=this.model.get("id");
		var post=this.$el.find('#form').serialize();
		console.log(post);
		alert('okkk');
		//console.log(files);
		if(id==undefined)
			{
			this.model.insert(post);
			}
		else{
			this.model.edit(id,post);	
			}
	}
});
