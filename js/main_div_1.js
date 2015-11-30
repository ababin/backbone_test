$(function(){

	// TASK model
	var Task = Backbone.Model.extend({
		
		defaults:{
			title: 'My task',
			description : 'Task description'
		}
		
	});


	// TASKLIST collection
	var TaskList = Backbone.Collection.extend({
		// Will hold objects of the Task model
		model: Task
	
	});
	
	
	// Prefill the collection with a number of services.
	var tasks = new TaskList([
		new Task({ title: 'task1', description: 'task1 description'}),
		new Task({ title: 'task2', description: 'task2 description'}),
		new Task({ title: 'task3', description: 'task3 description'}),
		new Task({ title: 'task4', description: 'task4 description'}),
		new Task({ title: 'task5', description: 'task5 description'})
	]);

	
	// This view turns a Service model into HTML
	var TaskView = Backbone.View.extend({
		tagName: 'p',
		
		elCurrent: $('#div_current'),
		
		events:{
			'click': 'clickTask',
			'mouseover': 'mouseOverTask',
			'mouseout': 'mouseOutTask'
		},

		initialize: function(){
		},

		render: function(){

			// Create the HTML

			this.$el.html(this.model.get('title') + " - " + this.model.get('description'));
			
			//alert(this.$el);
			//alert(this.el);
			
			
			// Returning the object is a good practice
			// that makes chaining possible
			return this;
		},

		clickTask: function(){
			//alert(this.model.get('title'));
		},
		
		mouseOverTask: function(){
			this.elCurrent.html(this.model.get('title'));
		},
		
		mouseOutTask: function(){
			this.elCurrent.html('');
		}
		
	});
	

	// The main view of the application
	var AppTask = Backbone.View.extend({

		// Base the view on an existing element
		el: $('#div_1'),

		initialize: function(){
			
			
			//this.list = $('#div_1');
			
			// Listen for the change event on the collection.
			// This is equivalent to listening on every one of the 
			// service objects in the collection.
			this.listenTo(tasks, 'change', this.render);

			
			// Create views for every one of the services in the
			// collection and add them to the page

			tasks.each(function(task){

				var view = new TaskView({ model: task });
				this.$el.append(view.render().el);
				//this.list.append(view.render().el);

			}, this);	// "this" is the context in the callback
		},

		render: function(){
			return this;

		}

	});

	new AppTask();
	
	
});