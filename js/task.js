// TASK ================================================================================================================

var Task = Backbone.Model.extend({
	
	url: '/store/task',
	
	defaults: {
		id: 0,
		title: '',
		desc: ''
	}
	
});

var TaskView = Backbone.View.extend({
	
	tagName: 'p',
					
	render: function(){
		this.$el.html(this.model.get('title') + ' ----' + this.model.get('desc') + ' (ID=' + this.model.get('id') + ')');
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





