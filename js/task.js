// ========= TASKS =======================================================

// Task 
var Task = Backbone.Model.extend({

	defaults : {
		id : 0,
		title : 'Some task',
		desc : 'Task description',
	}

});

var TaskView = Backbone.View.extend({
	
	model: Task,
	
	tagName: 'p',
					
	initialize: function(){
	},
	
	render: function(){
		this.$el.html(this.model.get('title') + ' ----' + this.model.get('desc') + ' (ID=' + this.model.get('id') + ')');
		return this;
	},
									
});




// TASKLIST collection
var TaskList = Backbone.Collection.extend({
	model: Task,
	url: '/store/tasks.json',
		
	initalize: function(){
		this.model.bind('change', this.render, this);
	},
		
	
});
var tasks = new TaskList();

//task List view
var TasksView = Backbone.View.extend({

	el: '#tasks',
		
	initialize: function(){},

	render: function(){
		this.$el.html('');
		tasks.each(function(task){
			var view = new TaskView({ model: task });
			this.$el.append(view.render().el);
			
		}, this);
		
		return this;
	}
	
});

var tasksView;





