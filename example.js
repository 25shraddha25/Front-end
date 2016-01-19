"use strict";
var http = require('http');
var url = require("url");
var mysql = require('mysql');
var multiparty = require('multiparty');
var formidable = require('formidable');
var fs = require('fs');
var path=require('path');

var nums_page;
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pass',
  database :'shraddha',
});

connection.connect(function() {  
  console.log('set');
});

const PORT=8080; 

var server = http.createServer(function(request, response)
{
		console.log('herrrrrreeee');
		console.log(request.method);
		var paras = url.parse(request.url, true);	
		var f=paras.pathname.split('/');
		console.log(f);
		console.log('f[1] is here'+f[1]);
		console.log('f[2] is here'+f[2]);
		var g=paras.pathname.split('?');
		console.log(g);
		var n1=f[1];
		console.log(n1);
		var n=f[2];
		console.log(n);
		console.log('oath followed');
		console.log(paras.pathname);

		if(request.method=='GET'  && (paras.pathname=='/' ||f[1]=='design.css'|| f[1]=='view'|| f[1]=='model'|| f[1]=='collection'||paras.pathname=='')){
			console.log('second');
			console.log('getting html file content');
			console.log(paras.pathname + "----------------------"  + __dirname);
			var filePath = paras.pathname == "/" ? "/index.html" : paras.pathname
				fs.readFile(__dirname + filePath, function(err,data){
	            if(err){
	                console.log(err);
	            }
	            else{ 
	            	response.writeHead(200,{"Content-Type": "text/html"});
	                response.end(data,'UTF-8');
	            }
        		});
		}
		else if(request.method=='GET' && paras.pathname=='/student')
		{	var d=connection.query('select count(*) as count from Student_Manage',function(err,s)							        //calculate num of queries and pages in total
			{	
				var t=s[0].count;																									//total rows
				var params = url.parse(request.url, true);
				var p= params.query.page;		
				console.log(p);	
				var i=params.query.number;
				console.log(i);
				var next=params.query.query || '';
				var nexts=params.query.subject|| '' ;
				console.log('Subject is'+nexts);
				if(nexts.indexOf('[')!='-1')
				{
					console.log('inside loop ]');
				}
				if(nexts.indexOf('[')!='-1'){
						console.log('subject is '+nexts);
						var nextsh = nexts.replace(/[^a-zA-Z0-9]/g,'');
						console.log(nextsh.length+'--------++++++++++');
						console.log('subject after removing characters' + nexts);
				}

				console.log('heree is nextss');
				var count=params.query.per_page;
				var counts=10;																										//constant count
				var initial_page=Math.ceil(t/counts);																				//constant for page0
				var cou=count;			
				console.log(count);
				if(count==undefined)
				{
					cou=counts;
				}
				var num_page=Math.ceil(t/cou);																						//changing num pf pages as per count 
				if(count==undefined||count<0||count==0)																				//if count is nt spec den const,or if count is -ve
				{
				count=counts;
				num_page=initial_page;
				nums_page=initial_page;
				}
				else if(p==0||p<0)																									//if page 0 den direct to page1
				{
					 	p=1;
					 	console.log(params.query.page);
					 	params.query.page=1;
					 	num_page=initial_page;
					 	nums_page=initial_page;
				}
				var rec=(p*count)-count;																							//after all dis for limit
				if(isNaN(rec)==true)																								//rec is asd or bsd 
				{
						p=1;
						count=counts;
						var rec=(p*count)-count;
				}	
				if((next==''&& next==undefined)&&(nexts==''||nexts==undefined))
				{
					console.log('here');
					console.log(next);
					console.log('dis');
					console.log(p);
					console.log('iewb');
					console.log(count);
					console.log(rec);
					first(rec,count,t,p,num_page);				
				}
				else if((next==undefined|| next=='')&&(nexts==undefined|| nexts=='')&&(typeof i !== "undefined")){
					console.log('fect daa');
					console.log(a);
					console.log('id is'+i);
							var sql="select Student_Manage.id,Student_Manage.first_name,Student_Manage.middle_name,Student_Manage.last_name,Student_Manage.year,Student_Manage.branch,Student_Manage.date_created,Student_Manage.date_updated, group_concat(subject separator ' ,') as subject from Student_Subj  join Student_Manage on Student_Manage.id=Student_Subj.id where Student_Manage.id="+i+";";
							connection.query(sql, function(error, rows)
					{
						console.log(rows);
						var data={
							   				data:rows
							   			}
							   		response.end(JSON.stringify(data));
					});
				}
			

				else if(nexts==undefined|| nexts=='')																	//query
				{
				console.log('undefined here');
				console.log(nexts);
				console.log('pagehere');
				console.log(p);
				if(rec<0)
				{
					rec=0;
				}				
				console.log(next);
				var dtd="select  count(*) as count from Student_Subj join Student_Manage on Student_Manage.id=Student_Subj.id  where Student_Manage.first_name LIKE "+'\''+'%'+next+'%'+'\''+"  OR Student_Manage.last_name LIKE "+'\''+'%'+next+'%'+'\''+"   group by Student_Subj.id";
				console.log(dtd);
				var dt=connection.query( dtd,function(err,se)							        
				{	
					console.log('se is'+se);
					var tos=se.length;
					var sqlu="select Student_Manage.id,Student_Manage.first_name,Student_Manage.middle_name,Student_Manage.last_name,Student_Manage.year,Student_Manage.branch,Student_Manage.date_created,Student_Manage.date_updated, group_concat(subject separator ',' ) as subject from Student_Subj join Student_Manage on Student_Manage.id=Student_Subj.id  where Student_Manage.first_name LIKE "+'\''+'%'+next+'%'+'\''+"  OR Student_Manage.last_name LIKE "+'\''+'%'+next+'%'+'\''+"   group by Student_Subj.id ORDER BY Student_Manage.date_created DESC limit "+rec+","+count+";";
					console.log(sqlu);
					connection.query(sqlu, function(error, rows)
					{
					console.log(rows);	
					if(p<0 || p==0)																			//for 0 and -1 page
					{
						p=1;
					}
					console.log(p);

					var nums_page=Math.ceil(tos/cou);
					console.log(tos);
					console.log(cou);
					console.log(nums_page);	
					if(nums_page<0 || nums_page==0)															//to make nums_page to initial
					{
						var nums_page=Math.ceil(tos/3);
					}

					console.log(tos);	
					console.log(nums_page);																				
					if(error)
					{
						console.log('c');
					}
					for (var i = 0; i < rows.length; i++) {													//to display all subjects in array
					var a=rows[i].subject;
					var z=a.split(",");
					rows[i].subject=z;
					};
					console.log('entered into dis looppp');
					console.log(rows);
					console.log('total_records'+tos);
					console.log('total_pages'+nums_page);
					var data = {
						 			data: rows,
						 			current_page:Math.floor(p),
						 			total_pages: nums_page,
						 			total_records: tos,
						 			per_page:Math.floor(count)  			 			
						 		}
				    console.log('set1');
					response.end(JSON.stringify(data));
					});
				});
				}
					else if(nexts.indexOf('[')!='-1'&& nextsh.length!=3 && nextsh.length!=7 && nextsh.length!=10 && nextsh.length!=13 && nextsh.length!=14){
					var t=nexts.split("\"");
					var a=[];
					for(var i=0;i<t.length;i++){	
					var o=t[i].replace(/[^a-zA-Z0-9]/g,'-')	;
					console.log(o+'-------************>>>>>>>>>>>')
					if(o.indexOf('-')!=-1)
					{
						console.log('invalid entry');
					}
					else 
					{
						a.push('\''+t[i]+'\'');
					}
					}
					console.log(a);
					a.length=6;
					for(var i=0;i<a.length;i++){
						if(a[i]==undefined)
						{
							console.log(a[i]);
							a[i]='\''+'\'';
						}
					}
			
				var sqlu="SELECT group_concat(id separator ',')  as id from Student_Subj where id in (select id from Student_Subj where subject="+a[0]+" and id in(select id from Student_Subj where subject="+a[1]+")) or (select id from Student_Subj where subject="+a[2]+"or subject="+a[3]+"or subject="+a[4]+" or subject="+a[5]+");";
				console.log(sqlu);
				var dt=connection.query( sqlu,function(err,se)							      
				{
				console.log(se);
				if(rec<0)
					{
						rec=0;
					}
				if(se==undefined)
				{
					var r=0;
				}
				else{
					var r=se[0].id;
					var g='\''+se[0].id+'\'';
					var tos=Math.ceil(g.split(',').length/2);
				}				
				var sqlu="select Student_Manage.id,Student_Manage.first_name,Student_Manage.middle_name,Student_Manage.last_name,Student_Manage.year,Student_Manage.branch,Student_Manage.date_created,Student_Manage.date_updated, group_concat(subject separator ',' ) as subject from Student_Subj join Student_Manage on Student_Manage.id=Student_Subj.id  where  Student_Subj.id  IN("+r+")  group by Student_Subj.id ORDER BY Student_Manage.date_created DESC limit "+rec+","+count+" ;";
				console.log(sqlu);
				connection.query(sqlu, function(error, rows)
				{
				console.log(rows);
				console.log('defined rows here');
					if(p<0 || p==0 )
					{
						p=1;
					}
					console.log(p);
					var nums_page=Math.ceil(tos/count);	
					console.log(nums_page);
					if(nums_page<0 || nums_page==0)
					{
						var nums_page=Math.ceil(tos/3);
					}
					if(p>nums_page)
					{
						p=1;
					}
				console.log(nums_page);																											
				if(error)
				{
					console.log('c');
				}
				console.log('peaksss');
				console.log(rows.length);
				for (var i = 0; i < rows.length; i++) {
				var a=rows[i].subject;
				var z=a.split(",");
				rows[i].subject=z;
				};				
				console.log(rows);
				var data = {
					 			data: rows,
					 			current_page: Math.floor(p),
					 			total_pages: nums_page,
					 			total_records: tos,
					 			per_page:Math.floor(count)  			 			
					 		}
				
			    console.log('set1');
				response.end(JSON.stringify(data));
				});			
				//});
				});						       
				}

				
				else if	((next=='' && nexts.split(" ").length - 1==1 && nexts.split(",").length - 1==1 )||(next=='' && nexts.split(null).length - 1==0 && nexts.split(",").length - 1==1)||(next=='' && nexts.split(" ").length - 1==0 && nexts.split(",").length - 1==0 )||(next='')||nextsh.length==14|| nextsh.length==3 || nextsh.length==7 || nextsh.length==10 || nextsh.length==13 )																			//subject
				{
					console.log('nexts');
					console.log(nexts.split(",").length);
					console.log(nexts.split(null).length);
					if(nexts.indexOf('[')!='-1'){
						console.log('subject is '+nexts);
						var nexts = nexts.replace(/[^a-zA-Z]/g,'');
						console.log(nexts);
						console.log(nexts.length);
						console.log('subject after removing odrss characters' + nextsh);
					}
				console.log('oks');
				console.log(nexts);
				var dtd="select  count(*) as count from Student_Subj join Student_Manage on Student_Manage.id=Student_Subj.id  where  Student_Subj.subject = "+'\''+nexts+'\''+"  group by Student_Subj.id";
				console.log(dtd);
				var dt=connection.query( dtd,function(err,se)							      
				{
				if(rec<0)
					{
						rec=0;
					}
						
				console.log(se);
				console.log('define se here');
				var tos=se.length;
				console.log(tos);
				console.log(nexts);
				var sqlu=" select group_concat(id separator ',')  as id from Student_Subj where Student_Subj.subject= "+'\''+nexts+'\''+" ;";
				connection.query(sqlu, function(error, rows)
				{
				var r=rows[0].id;
				console.log(r);
				var sqlu="select Student_Manage.id,Student_Manage.first_name,Student_Manage.middle_name,Student_Manage.last_name,Student_Manage.year,Student_Manage.branch,Student_Manage.date_created,Student_Manage.date_updated, group_concat(subject separator ',' ) as subject from Student_Subj join Student_Manage on Student_Manage.id=Student_Subj.id  where  Student_Subj.id  IN("+r+")  group by Student_Subj.id ORDER BY Student_Manage.date_created DESC limit "+rec+","+count+";";
				console.log(sqlu);
				connection.query(sqlu, function(error, rows)
				{
				console.log(rows);
				console.log('defined rows here');
					if(p<0 || p==0 )
					{
						p=1;
					}
					console.log(p);
					var nums_page=Math.ceil(tos/count);	
					if(nums_page<0 || nums_page==0)
					{
						var nums_page=Math.ceil(tos/3);
					}
					if(p>nums_page)
					{
						p=1;
					}
				console.log(nums_page);																											
				if(error)
				{
					console.log('c');
				}
				console.log('peaksss');
				console.log(rows.length);
				for (var i = 0; i < rows.length; i++) {
				var a=rows[i].subject;
				var z=a.split(",");
				rows[i].subject=z;
				};
				console.log(rows);
				var data = {
					 			data: rows,
					 			current_page: Math.floor(p),
					 			total_pages: nums_page,
					 			total_records: tos,
					 			per_page:Math.floor(count)  			 			
					 		}

			    console.log('set1');
				response.end(JSON.stringify(data));
				});			
				});
				});			
		  		}
				
		  		
		  		else									//both
		  		{
		  		if(p<0||p==0)
					{
						p=1;
					}	
		  		console.log('jhwvecj');	  			
			  	var dtd="select  count(*) as count from Student_Subj join Student_Manage on Student_Manage.id=Student_Subj.id  where Student_Manage.first_name LIKE "+'\''+'%'+next+'%'+'\''+"  OR Student_Manage.last_name LIKE "+'\''+'%'+next+'%'+'\''+"   group by Student_Subj.id";
				var dt=connection.query( dtd,function(err,t)							        
				{						
				console.log(t.length);				//for random string
				if(t.length==0)						//if value of rows is 0
				{
					console.log(t);
					var data = {
					 			data: t,
					 			current_page: Math.floor(p),
					 			total_pages:0,
					 			total_records: 0,
					 			per_page:Math.floor(count)  			 			
					 		}
			    
						response.end(JSON.stringify(data));
				}
				else
				{
					var sqlu=" select group_concat(id separator ',')  as id from Student_Manage where Student_Manage.first_name LIKE "+'\''+'%'+next+'%'+'\''+"  OR Student_Manage.last_name LIKE "+'\''+'%'+next+'%'+'\''+";";
					console.log(sqlu);
					connection.query(sqlu, function(error, rows)
					{
					var det=rows[0].id;
					console.log(det);
					var sqlu=" select count(*) as count ,group_concat(id separator ',')  as id from Student_Subj where  Student_Subj.id  IN("+det+") AND Student_Subj.subject= "+'\''+nexts+'\''+";";
					console.log(sqlu);
					connection.query(sqlu, function(error, rows)
					{
					var deg=rows[0].id;
					console.log(deg);
					var tosd=rows[0].count;
					if(cou<0)
					{
						cou=3;
					}
					var nums_page=Math.ceil(tosd/cou);	
					console.log('here');
					console.log(tosd);	
					console.log(nums_page);
					console.log('here');
					if(rec<0)
					{
						rec=0;
					}
					
					var sqlu="select Student_Manage.id,Student_Manage.first_name,Student_Manage.middle_name,Student_Manage.last_name,Student_Manage.year,Student_Manage.branch,Student_Manage.date_created,Student_Manage.date_updated, group_concat(subject separator ',' ) as subject from Student_Subj join Student_Manage on Student_Manage.id=Student_Subj.id  where  Student_Subj.id  IN("+deg+")  group by Student_Subj.id ORDER BY Student_Manage.date_created DESC limit "+rec+","+count+";";
					console.log(sqlu);
					connection.query(sqlu, function(error, rows)
					{
						console.log(rows.length);
						var t=rows.length;
						for (var i = 0; i < rows.length; i++) {
						var a=rows[i].subject;
						var z=a.split(",");
						rows[i].subject=z;
						};
						 
						var data = {
					 			data: rows,
					 			current_page: Math.floor(p),
					 			total_pages: nums_page,
					 			total_records: tosd,
					 			per_page:Math.floor(count)  			 			
					 		}
			    
						response.end(JSON.stringify(data));
					});
					});
					});
				}
			});
		  	}

			});
		}

		else if(request.method=='POST' && paras.pathname=='/student')
		{
			var data='';
			var f=request.headers['content-type'];
			console.log(f);	
			if(request.headers['content-type']=='text/plain;charset=UTF-8')
		    {
			    request.on('data', function(d){
				var post=JSON.parse(d);
				console.log(post);
				part(post);
		    });
			}
			else if(request.headers['content-type']=='application/x-www-form-urlencoded')
			{
			  //var form = new multiparty.Form();
			var form = new formidable.IncomingForm();
			form.parse(request, function(err, post,files) {
				console.log('post is herree');
				console.log(post);
				console.log(files);
			  part(post);
			});	
			}
			else
			{
				var form = new multiparty.Form();
			  	form.parse(request, function(err, post) {
			  	part(post);
	
			 });
			}
			response.writeHead(200,{"Content-Type": "application/json"});
		}

		else if(request.method=='PUT' && n1=='student')
		{
		console.log(request.method);	
		console.log('exe');
		console.log(n);
			if(request.headers['content-type']=='text/plain;charset=UTF-8')
		    {
			    request.on('data', function(d){
				var post=JSON.parse(d);
				console.log(post);
				parts(post);

		     });
			 }
			else if(request.headers['content-type']=='application/x-www-form-urlencoded')
			{
			console.log(90);
			//var form = new multiparty.Form();
			  var form = new formidable.IncomingForm();
			  form.parse(request, function(err, post) {
			  parts(post);
				});	
			}
			else
			{
					var form = new multiparty.Form();
			  		form.parse(request, function(err, post) {
			  		parts(post);

			  	});
			}

		}

		else if(request.method=='DELETE' && n1=='student')
		{
		console.log(n);
		partss(n);
		}

		else
		{				
			console.log('first');		
			console.log(paras.pathname);
			var f=paras.pathname.split('/');
			var n1=f[1];
			console.log(n1);
			//var n=f[2];
			//console.log(n);
			fs.readFile(n1, function(err,data){
            if(err){
            	response.writeHead(404,{"Content-Type": "application/json"});
            	response.end('Page Not Found');
                console.log(err);
            }
            else{	
            	response.writeHead(200,{"Content-Type": "application/json"});            	
                response.end(data,'UTF-8');
            }
       		});
		}


function first(rec,count,t,p,num_page){
	//console.log(num);
	console.log('down');
	console.log(count);
	if(rec<0)
	{
		rec=0;
	}
		var sql="select Student_Manage.id,Student_Manage.first_name,Student_Manage.middle_name,Student_Manage.last_name,Student_Manage.year,Student_Manage.branch,Student_Manage.date_created,Student_Manage.date_updated, group_concat(subject separator ',' ) as subject from Student_Subj join Student_Manage on Student_Manage.id=Student_Subj.id group by Student_Subj.id ORDER BY Student_Manage.date_created DESC limit "+rec+","+count+";";
				console.log(sql);
				connection.query(sql, function(error, rows)
				{	
				console.log('here');
				console.log(rows);
				console.log('here');
				if(error)
				{
					console.log('cnvop');
				}
				for (var i = 0; i < rows.length; i++) {
				var a=rows[i].subject;
				var z=a.split(",");
				rows[i].subject=z;
				};
				if(p<0 || p==0)
				{
					p=1;
				}
				var data = {
					 			data: rows,
					 			current_page: Math.floor(p),
					 			total_pages: num_page,
					 			total_records: t,
					 			per_page:Math.floor(count)  			 			
					 		}
				console.log(data.total_records);
			    console.log('set1');
				response.end(JSON.stringify(data));

				});
	}

function part(post)
{
console.log('lengh');
console.log(post);
console.log('++++++++++--------++++++++++');
console.log(post.file);
	console.log(post.subject);
 				if(post.first_name==""||post.last_name==""||post.branch==""||post.subject==""||post.subject==undefined||post.first_name==undefined)
		        {
		        		console.log(post.first_name);
		        		console.log('Enter proper data'+post.first_name);
		        		response.writeHead(422);
		        		var t='Enter data properly';
		        		var error={
		        			error_message:t
		        		}
		        		response.end(JSON.stringify(error));

		        }
		        else
		        {
		        	console.log('iiiii');
		        	var sql='insert into Student_Manage set ?';
			        connection.query(sql,{"first_name":post.first_name,"middle_name":post.middle_name,"last_name":post.last_name,"year":post.year,"branch":post.branch}, function(error, rows)
			        {
			        	if(error)
			        		{
			        			console.log(error);
			        			console.log('error');
			        			var tu='Enter msg';
				        		var error={
				        			error_message:tu
				        		}
				        		response.end(JSON.stringify(error));					        					        			
							}
						else
							{
								var u=rows.insertId;
							   		console.log(u);
							   		var branch=post.branch;
							   		console.log(branch);
							   		var t=post.subject.length;
							   		console.log(t);		
				        			console.log(post.subject[0]);
				        												
									var b=[];
									if(request.headers['content-type']=='application/x-www-form-urlencoded')
							   		{
							   			console.log('url');
							   			check(b,branch,post,t,u);
							   		}
				        			else{
							       	for(var i=0;i<post.subject.length;i++)
							       	{	
							       		console.log('here');
							       		console.log(b);
							       	b.push([post.subject[i], u]);					
							       	}
							       }
							       	console.log(b);
							       	console.log('get subjects here'+b);
							       	
							       	var sql='insert into Student_Subj (subject,id) VALUES ?;';
							       
							   connection.query(sql,[b],function(error, rows)
							   {	
							   		if(error)
						        		{
						        			console.log(error);
						        			var t='Enter msg';
							        		var error={
							        			error_message:t
							        		}
							        		response.end(JSON.stringify(error));								        								        			
										}
							   		var sald="select Student_Manage.id,Student_Manage.first_name,Student_Manage.middle_name,Student_Manage.last_name,Student_Manage.year,Student_Manage.branch,Student_Manage.date_created,Student_Manage.date_updated, group_concat(subject separator ' ,') as subject from Student_Subj  join Student_Manage on Student_Manage.id=Student_Subj.id where Student_Manage.id="+u+";";
							   		connection.query(sald, function(error, rows)
							   		{	if(error)
						        		{
						        			console.log(error);
						        			var t='Enter msg';
							        		var error={
							        			error_message:t
							        		}
							        		response.end(JSON.stringify(error));								        								        			
										}
										console.log(rows);
										console.log(rows[0].subject);
										var a=rows[0].subject;
										console.log(a);
										console.log('Error starts here');
										if(a==null)
										{
												console.log('error');
										}
										else{									
										var z=a.split(",");
										rows[0].subject=z;					
										console.log(z);
										//}
							   			var data={
							   				data:rows
							   			}
							   		response.end(JSON.stringify(data));
									}
							   		});
							   });
							}
					});
		        }
		    	
}
function parts(post)
{
console.log(n);
var a=[];

			console.log('got');
			console.log(post.first_name);
			console.log('hereeee');
			if(post.first_name==""||post.last_name==""||post.branch==""||post.subject==""||post.subject==undefined||post.first_name==undefined)
		        {
		        		console.log('Enter proper data');
		        		response.writeHead(422);
		        		var t='Enter data properly';
		        		var error={
		        			error_message:t
		        		}
		        		response.end(JSON.stringify(error));
		        }
		    	else
		    	{					
			        console.log('reached here');
			        var sql='UPDATE Student_Manage SET ? WHERE id = ?';
			        connection.query(sql,[{"first_name":post.first_name,"middle_name":post.middle_name,"last_name":post.last_name,"year":post.year,"branch":post.branch}, n],function(error, rows)
			        {
			        	if(error)
			        		{
			        			console.log(error);
			        			console.log('error');
			        			var t='Enter msg';
				        		var error={
				        			error_message:t
				        		}
				        		response.end(JSON.stringify(error));					        					        			
							}
						else
							{
				        			console.log('dis1');
				        			console.log(post.subject.length);
				        			console.log(post.subject);
				        			var sql='DELETE from Student_Subj WHERE id='+n+'';																		
							   connection.query(sql,function(error, rows)
							   {	if(error)
							   	{
							   		console.log(error);
							   	}
							       	console.log(rows);
							       	console.log('name ');
							       	console.log(post.subject.first_name);
							       	var t=post.subject.length;
							       console.log(t);
							       	var b=[];
							       	if(request.headers['content-type']=='application/x-www-form-urlencoded')
							   		{
							   			console.log('url');
							   			console.log(t);
							   			var branch=post.branch;
							   				console.log(branch);
							   			check(b,branch,post,t,n);
							   		
							   		}
				        			else{
							       	for(var i=0;i<post.subject.length;i++)
							       	{
							       	b.push([post.subject[i], n]);					
							       	}
							       }
							       	
							       	console.log(n);
							       		var sqlw='insert into Student_Subj (subject,id) VALUES ?;';
							    connection.query(sqlw, [b],function(error, rows)
							   {
							   		var sald="select Student_Manage.id,Student_Manage.first_name,Student_Manage.middle_name,Student_Manage.last_name,Student_Manage.year,Student_Manage.branch,Student_Manage.date_created,Student_Manage.date_updated, group_concat(subject separator ' ,') as subject from Student_Subj  join Student_Manage on Student_Manage.id=Student_Subj.id where Student_Manage.id="+n+";";
							   		connection.query(sald, function(error, rows)
							   		{	if(error)
						        		{
						        			console.log(error);
						        			var t='Enter msg';
							        		var error={
							        			error_message:t
							        		}
							        		response.end(JSON.stringify(error));								        						        			
										}
										console.log('dowm');
										console.log(rows);
										console.log(rows[0].id);
										if(rows[0].id==null)
										{
											response.writeHead(200,{"Content-Type": "application/json"});
											response.end(JSON.stringify({
												msg: "Subject does not exist"
											}));
										}
										else{
										console.log(rows);
										console.log(rows[0].subject);
										var a=rows[0].subject;
										if(a==null)
										{
												console.log('error');
										}
										else{
										var z=a.split(",");
										rows[0].subject=z;
										console.log(z);
							   			var data={
							   				data:rows
							   			}
							   		}
							   		response.end(JSON.stringify(data));
							   	}

							   		});
							   	});


							  });
							}
					});
			    }			   
}
function partss(n)
{
	if(isNaN(n)==true)
	{
		console.log('enter id correctly');
	
		response.writeHead(200,{"Content-Type": "application/json"});
		response.end(JSON.stringify({
			msg: "Id should be a number"
		}));
	}
	else
	{
	var sqlt='SET foreign_key_checks = 0;';
	connection.query(sqlt,function(error, rows)
	{
	var sqli='delete Student_Manage,Student_Subj from Student_Manage,Student_Subj where Student_Manage.id=Student_Subj.id and Student_Subj.id='+n+';';
	connection.query(sqli,function(error, rows)
	{
		if(error)
		{
		console.log(error);
		}
		else{
		console.log('deleted');
	
		response.writeHead(200,{"Content-Type": "application/json"});
		response.end(JSON.stringify({
			msg: "Subject deleted successfully"
		}));
		}
	});
	});
}
}
function check(b,branch,post,t,u)
{
	
	if(t==3||t==7||t==10||t==13||t==14)
							   			{
							   				var tu='Enter msg';
											var error={
											error_message:tu
											}
							   				console.log('reach');
							   				console.log(branch);
							   				var branch=post.branch;
							   				console.log(branch);
							   				console.log(post.subject);
							   				console.log('length is'+post.subject.length);
							   				//if(t<3){
							   					console.log('name is below');
							   					console.log(post.first_name);
							   				if((branch=='EXTC'&& ((post.subject=='NeuralNetworks')||(post.subject=='Sensors')))||
							   					(branch=='CMPN'&& ((post.subject=='HCI')||(post.subject=='PCT')))||
							   					(branch=='IT'&& ((post.subject=='DataWarehouse')||(post.subject=='DataMining')))){
							   					console.log('ok');
							   					b.push([post.subject, u]);	
							   				}
							   				else{							   					
							   					console.log('subj problem');
							   					response.writeHead(422);
							   					response.end(JSON.stringify(error));
							   				}	
							   			}
							   			else
							   			{
							   				var tu='Enter msg';
											var error={
											error_message:tu
											}
							   				if(t==2)
							   				{
							   					console.log('innnsside last loop');
							   				for(var i=0;i<post.subject.length;i++)
									       	{
									       	console.log('reach');
							   				console.log(branch);
							   				console.log(post.subject);
							   				if((branch=='EXTC'&& (((post.subject[0]=='NeuralNetworks')||(post.subject[1]=='NeuralNetworks'))&&((post.subject[0]=='Sensors')||(post.subject[1]=='Sensors'))))||
							   					(branch=='CMPN'&& (((post.subject[0]=='HCI')||(post.subject[1]=='HCI'))&&((post.subject[0]=='PCT')||(post.subject[1]=='PCT'))))||
							   					(branch=='IT'&& (((post.subject[0]=='DataWarehouse')||(post.subject[1]=='DataWarehouse'))&&((post.subject[0]=='DataMining')||(post.subject[1]=='DataMining')))))
									       	{b.push([post.subject[i], u]);	}
									       	else{
									       		console.log('subj problem');
									       		response.writeHead(422);
							   					response.end(JSON.stringify(error));
							   				}				
									       	}
									       }
									       else{
									       		console.log('subj problem');
									       		response.writeHead(422);
							   					response.end(JSON.stringify(error));
							   				}
									   	}
}
response.writeHead(200,{"Content-Type": "application/json"});	
});
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});




