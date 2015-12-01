$(function(){

	// MENUITEM model
	var MenuItem = Backbone.Model.extend({
		
		defaults:{
			title: 'menu item',
			link : '/href/..'
		}
		
	});

	// MENU collection
	var Menu = Backbone.Collection.extend({
		// Will hold objects of the Task model
		//model: Task
	
	});
	
	// Prefill the collection with a number of services.
	var menu = new Menu([
		new MenuItem({ title: 'menu item 1', link: '/href/1'}),
		new MenuItem({ title: 'menu item 2', link: '/href/2'}),
		new MenuItem({ title: 'menu item 3', link: '/href/3'}),
		new MenuItem({ title: 'menu item 4', link: '/href/4'}),
		new MenuItem({ title: 'menu item 5', link: '/href/5'})
	]);

	
	// This view turns a Service model into HTML
	var MenuItemView = Backbone.View.extend({
						
		menuSelected: $('#menu_selected'),
		
		tagName: 'a',
						
		events:{
			'click': 'clickMenuItem',
			'mouseover': 'mouseOverMenuItem',
			'mouseout': 'mouseOutMenuItem'
				
		},

		initialize: function(){
		},

		render: function(){
			this.$el.html(this.model.get('title') + " --> " + this.model.get('link'));
			this.$el.attr('href','#'+this.model.get('link'));
			return this;
		},

		clickMenuItem: function(){
		},
		
		mouseOverMenuItem: function(){
			this.$el.css('background-color', 'gray');
			//this.menuSelected.html(this.model.get('link'));
		},
		mouseOutMenuItem: function(){
			this.$el.css('background-color', 'white');
			//this.menuSelected.html('');
		}
				
		
	});
	

	// The main view of the application
	var MenuView = Backbone.View.extend({

		// Base the view on an existing element
		el: $('#menu'),

		initialize: function(){
			
			
			//this.list = $('#div_1');
			
			// Listen for the change event on the collection.
			// This is equivalent to listening on every one of the 
			// service objects in the collection.
			this.listenTo(menu, 'change', this.render);

			
			// Create views for every one of the services in the
			// collection and add them to the page

			menu.each(function(menuItem){

				var view = new MenuItemView({ model: menuItem });
				this.$el.append(view.render().el);
				//this.list.append(view.render().el);

			}, this);	// "this" is the context in the callback
		},

		render: function(){
			return this;

		}

	});

	new MenuView();
	
	
});