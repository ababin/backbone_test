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
//=============================================================================================================


// TASKLIST collection ====================================================================================================
var Tasks = Backbone.Collection.extend({
	url: '/store/tasks',
		
	initalize: function(){
		this.model.bind('change', this.render, this);
	}
});
var tasks = new Tasks();


//task List view
/*
var TasksView = Backbone.View.extend({

	el: '#right_content',
		
	initialize: function(){},

	render: function(){
		this.$el.html('');
		tasks.each(function(task){
			var view = new TaskView({ model: task });
			this.$el.append(view.render().el);
			
		}, this);
		
		return this;
	},
	
	onReset: function(){
		this.render();
	},
	
});

var tasksView;
*/
//=============================================================================================================




