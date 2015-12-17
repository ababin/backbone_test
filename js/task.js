// TASK ================================================================================================================

var Task = Backbone.Model.extend({
	
	url: '/store/task',
	
	defaults: {
		id: 0,
		title: '',
		desc: ''
	},
			
});

var ReadTaskView = Backbone.View.extend({
	
	tagName: 'div',
					
	render: function(){
		var html = '';
		for(var i = 0; i< dict.task.fields.length; i++){
			html += '<div class="row">';
			html += '<div class="fieldName">' + dict.task.fields[i].title + '</div> <div class="fieldData">' + this.model.get(dict.task.fields[i].name) + '</div>';
			html += '</div>';
		}
		
		this.$el.html(html);
		return this;
	},
									
});

var UpdateTaskView = Backbone.View.extend({
	
	tagName: 'div',
					
	render: function(){
		var html = '';
		for(var i = 0; i< dict.task.fields.length; i++){
			html += '<div class="row">';
			html += '<div class="fieldName">' + dict.task.fields[i].title + '</div>'; 
			switch(dict.task.fields[i].type){
			case 'id'		:		html += '<div class="fieldData">' + this.model.get(dict.task.fields[i].name) + '</div>'; break;
			case 'string'	:		html += '<div class="fieldData"><input type="text" value="' + this.model.get(dict.task.fields[i].name) + '"></input></div>'; break;
			case 'text'		:		html += '<div class="fieldData"><textarea>'+ this.model.get(dict.task.fields[i].name) + '</textarea></div>'; break;
			}
			
			
			'<div class="fieldData">' + this.model.get(dict.task.fields[i].name) + '</div>';
			html += '</div>';
		}
		
		this.$el.html(html);
		return this;
	},
									
});

//TASKLIST collection ====================================================================================================
var Tasks = Backbone.Collection.extend({
	url: '/store/tasks',
		
	initialize: function(){
		this.model.bind('change', this.render, this);
	}
});
var tasks = new Tasks();

//=============================================================================================================


PagedTasks = Backbone.Collection.extend({
	url: '/store/pagedTasks',
	
	pageMeta: {
		pageSize: 5,
		page:1,
		total:0
	},
	
	orderMeta: {
	},
	
	initialize: function(){
		this.model.bind('change', this.render, this);
	},

	parse: function(content){
		var pageParams = content.pageMeta;
		this.pageMeta.page = pageParams.page;
		this.pageMeta.total=pageParams.total;
		this.orderMeta = content.orderMeta;
		return content.data;
	}

});
var pagedTasks = new PagedTasks();






