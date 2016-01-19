"use strict";
var next=0;
App.Views.view_page=Backbone.View.extend({
	//template: _.template($('#student_list').html()),
	template: Handlebars.compile($('#pagination').html()),

	initialize:function(that){
		this.collection= that.collection;
		console.log(this.collection);
		this.render();
		this.cal_pagination();
		console.log('reached here');
		
	},
	render:function(){ 
		$("#SubDiv").html(this.$el.html(this.template(this.model.toJSON())));
	},
	cal_pagination:function(){									
										var total_records=this.collection.total_records;
										var total_pages=this.collection.total_pages;
										var per_page=this.collection.per_page;
										var page_num=this.collection.page;
										if(isNaN(page_num)==true && page_num!=undefined )
										{
											alert('Enter proper page number');
											page_num=1;
										}
//************************************  RENDER		 PAGE NUMBERS INFORMATION         *************************************************//				
										if(page_num==1){	
												this.$el.find('.right').html('1');
												this.$el.find('.left').html(per_page);
										}
										else{
												var first_digper=per_page/10;
												if(page_num==undefined)
												{
													this.$el.find('.right').html(1);
													this.$el.find('.left').html(per_page);								
												}
												else if(page_num=='')
												{
													this.$el.find('.right').html(1);
													this.$el.find('.left').html(per_page);	
												}
												else {
													var first_dig_numfirst=(page_num-1)*first_digper;
													var first_dig_numsecond=first_dig_numfirst+first_digper;										
													var first_dig_numfirst1=1;
													var first_num=("" + first_dig_numfirst + first_dig_numfirst1);
													this.$el.find('.right').html(first_num);													
													var first_dig_numsecond2=0;
													var last_num=("" + first_dig_numsecond + first_dig_numsecond2);
													if(last_num>total_records)
													{
														last_num=total_records;
													}
													this.$el.find('.left').html(last_num);
												}								
										}
										this.$el.find('.footer').html(total_records);	
//************************************  RENDER		 PAGE NUMBERS INFORMATION         *************************************************//				
//************************************  RENDER		 PAGINATION   INFORMATION         *************************************************//				

										if(total_pages==0)
										{
											this.$el.find('.previous').html('');
											this.$el.find('.next').html('');
										}
										if(page_num==''||page_num==undefined )
										{
											page_num=1;
											this.$el.find('.previous').html('');
										}
										if(total_pages==1)
										{
											this.$el.find('.previous').html('');
											this.$el.find('.next').html('');
										}
										if(page_num==1)
										{
											this.$el.find('.previous').html('');
										}
										if(page_num==total_pages){
											this.$el.find('.next').html('');
										}
										this.$el.find('div.page:contains("'+page_num+'")').css('background-color', 'red');
									
//************************************  RENDER		 PAGINATION   INFORMATION         *************************************************//				
	},
	events:{
		'click .page':'pagination',
		'click .previous':'previous',
		'click .next':'next',
		'click .move_up':'move_up'
	},
	pagination:function(e){
		console.log(this.collection);
		var p=$(e.currentTarget).text();
		console.log(p);		
		this.collection.page=p;
		this.collection.disc(function(data){
			obj.trigger('common_call',data);
		});
	},
	previous:function(){
		console.log(this);
		console.log('click previous');
		this.collection.page=this.collection.page-1;
		this.collection.disc(function(data){
			obj.trigger('common_call',data);
		});
	},
	next:function(){
			this.collection.page= this.collection.page || 1;
				
		console.log('click next');
		this.collection.page=+this.collection.page + 1;
		this.collection.disc(function(data){
			obj.trigger('common_call',data);
		});
	},
	move_up:function(){
		$("html, body").animate({scrollTop:0});		
	}
});