"use strict";
/*added comment*/
App.Views.v1=Backbone.View.extend({
el:$('#ParentDiv'),
//template: _.template($('#mainTemplate').html()),
template: Handlebars.compile($('#mainTemplate').html()),								
	initialize:function(options){		
			this.collection=options.collection;
  			this.render();
  			this.collection.disc(this.commonCallback.bind(this));
  			obj.on('common_call',this.commonCallback.bind(this));
  	},
	render: function(){	
		this.$el.html(this.template());	
	},
	events :{
		'keyup #search':'display',
		'keyup #search_page':'display_page',
		'click #click_subject':'filter_subj',
		'click #insert':'insert',
		'click .filter':'remove_filter',
		'click .filter1':'remove_filter',
		'click .filter2':'remove_filter',
		'click .filter3':'remove_filter',
		'click .filter4':'remove_filter',
		'click .filter5':'remove_filter',
		'click .filter6':'remove_filter',
		'change #forms':'per_display',
		'change #check_subj':'filter_sub_multiple'
	},
	per_display:function(){
		var per=$('#forms').serialize()
		var x=per.split('=');
		var y=x[1];
		this.collection.per_page=y;
		this.collection.page='';
		this.collection.disc(this.commonCallback.bind(this))
	},
	filter_sub_multiple:function(){	
		var g="\""+this.collection.subject+"\"";
		var subject=$('#check_subj').serialize();
		var c=subject.split('=');
		if(g.indexOf(c[1])!=-1)
		{
			alert('Enter other subject');
		}
		else
		{
		var x=subject.split('=');
		var y=x[1];
		console.log(y);
		var a=[];
		if(y=='PCT')
		{
			this.$el.find('.filter1').html(y);
		}
		else if(y=='DataWarehouse')
		{
			this.$el.find('.filter2').html(y);
		}
		else if(y=='DataMining')
		{
			this.$el.find('.filter3').html(y);
		}
		else if(y=='Sensors')
		{
			this.$el.find('.filter4').html(y);
		}
		else if(y=='NeuralNetworks')
		{
			this.$el.find('.filter5').html(y);
		}
		else if(y=='HCI')
		{
			this.$el.find('.filter6').html(y);
		}
		if(this.collection.subject==undefined||this.collection.subject=='')
		{
			a[0]=y;
			this.collection.subject=y;
		}
		else
		{
			a[0]=this.collection.subject;
			a[1]=y;
			if(a[0]==a[1])
			{
			alert('Enter different subject');
			if(y=='PCT')
			{
			this.$el.find('.filter1').html('');
			}
			else if(y=='DataWarehouse'){
			this.$el.find('.filter2').html('');
			}
			else if(y=='DataMining'){
			this.$el.find('.filter3').html('');
			}
			else if(y=='Sensors'){
			this.$el.find('.filter4').html('');
			}
			else if(y=='NeuralNetworks'){
			this.$el.find('.filter5').html('');
			}
			else if(y=='HCI'){
			this.$el.find('.filter6').html('');
			}						
			}
			else{
			this.collection.subject='['+'\"'+a[0]+'\"'+','+'\"'+a[1]+'\"'+']';
			}
		}
		}
		
	this.collection.disc(this.commonCallback.bind(this))
	},
	display: function(e){
		var next=$("#search").val() || "";	
		if(e.which==37||e.which==39||e.which==38||e.which==40)
        {
            
        }
        else{
		console.log('Again'+next)
		var per=$('#forms').serialize()
		var x=per.split('=');
		var y=x[1];
		this.collection.per_page=y;
		this.collection.page='';
		this.collection.query=next;
		this.collection.disc(this.commonCallback.bind(this));
		}
	},
	display_page: function(e){
		var page=$("#search_page").val() || "";
		if(e.which==37||e.which==39||e.which==38||e.which==40)
        {
            
        }
        else{	
		var per=$('#forms').serialize()
		var x=per.split('=');
		var y=x[1];
		this.collection.per_page=y;
		this.collection.page=page;
		this.collection.disc(this.commonCallback.bind(this));
		}
	},
	filter_subj: function(e){
		//alert(this.collection.subject);
		if(this.collection.subject=='')
		{
			//alert('already empty');
		}
		var nexts=$(e.currentTarget).text();
		if(this.collection.subject==undefined || this.collection.subject=='')
		{
			
			$('.filter').html(nexts);
			this.collection.subject=nexts;
		}
		else if(this.collection.subject.indexOf(nexts)!=-1)
		{
		alert('Enter other subject');		
		}
		else{
			//alert('innju')
			var y=nexts;
			if(y=='PCT')
		{
			this.$el.find('.filter1').html(y);
		}
		else if(y=='DataWarehouse')
		{
			this.$el.find('.filter2').html(y);
		}
		else if(y=='DataMining')
		{
			this.$el.find('.filter3').html(y);
		}
		else if(y=='Sensors')
		{
			this.$el.find('.filter4').html(y);
		}
		else if(y=='NeuralNetworks')
		{
			this.$el.find('.filter5').html(y);
		}
		else if(y=='HCI')
		{
			this.$el.find('.filter6').html(y);
		}
		
		//this.$el.find('.filter').html(nexts);
		var per=$('#forms').serialize()
		var x=per.split('=');
		var y=x[1];
		var a=[];
		this.collection.per_page=y;
		this.collection.page='';
		if(this.collection.subject==undefined||this.collection.subject=='')
		{
			this.collection.subject=nexts;
		}
		else{
		a[0]=this.collection.subject;
		a[1]=nexts;
		this.collection.subject='['+'\"'+a[0]+'\"'+','+'\"'+a[1]+'\"'+']';
		//this.follow(this.collection.subject,nexts);
		}
		//alert(this.collection.subject);
		
		
	}
	this.collection.disc(this.commonCallback.bind(this))
	},
	insert: function(e){
		console.log('Insert');
		routes.navigate("student/create/new",{trigger:true }); 
	},
	remove_filter:function(e){
		var $filter = $(e.currentTarget)
		if($filter.html()=='')
		{
			e.preventDefault();
		}
		else{
		var u=$filter.text();
		$filter.html('');
		var per=$('#forms').serialize()
		var x=per.split('=');
		var y=x[1];
		console.log(y);
		this.collection.per_page=y;
		this.collection.page='';
		this.follow(this.collection.subject,u);	
		this.collection.disc(this.commonCallback.bind(this))
		}
	},
	commonCallback:function(data){
		console.log(this.collection);
	 	var that=this.collection;
	 	console.log(data);
						var obj =data;
						console.log(data);
						var t=[];
						var total_records=obj.total_records;						
						that.total_records=total_records;												
						var total_pages=Math.ceil(total_records/obj.per_page);
						that.total_pages=total_pages;
						console.log(total_pages);
						that.per_page=obj.per_page;
						if(total_pages<7)							
						{	
							for(var i=0;i<total_pages;i++){
							t[i]=i+1;
						}
						modefg=new App.Models.pro({process:t});					
					 	v4=new App.Views.view_page({model:modefg,collection: that});
						}
						else
						{	
						var current_page_num=obj.current_page;								
								if((f[0]==current_page_num) && (f[0]!=1))
								{
									for(var i=0;i<f.length;i++)				
									{	
										if(f[i]=='')
										{
											f[i]=f[i-1]+1;
										}	
										else{									
										f[i]=f[i]-2
										console.log(f[i]);
										}						
									} 
									console.log(f);
									k=k+2;

								}
								if(f[6]==current_page_num) 				 
								{	
									
									if(current_page_num==total_pages){
										current_page_num=current_page_num-2;
									}							
									var g=current_page_num-4;													
									for(var i=0;i<f.length;i++)				
									{	
										f[i]=i+g; 
										if(f[i]>total_pages)
										{
											f[i]='';									
										}
										
									} 							
								}
						modefg=new App.Models.pro({process:f});	
						console.log(that);					
						v4=new App.Views.view_page({model:modefg,collection: that});
						}
						console.log('less');
						console.log('subject model done');
						for(var i=0;i<obj.data.length;i++)
						{ 
						mode=new App.Models.pro(obj.data[i]);					
						var v43=new App.Views.v3({model:mode,collection:that});												
						}

						
	},
	follow:function(x,u){
		var f=this.collection.subject.replace('"'+u+'"','');
		var ja = f.search(/[a-z]/i);
		if(ja == -1||ja==0) {
		this.collection.subject='';
		}
		else{
		this.collection.subject=f;
		}

	}
	});
//App.Views.v7=new App.Views.v1();
