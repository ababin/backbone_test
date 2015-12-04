

//MENUITEM model
var MenuItem = Backbone.Model.extend({
							
	defaults:{
		title: 'menu item',
		link : 'href/..',
		selected: false
	}
	
});

//MENU collection
var LeftMenu = Backbone.Collection.extend({
	model: MenuItem
});

// Prefill the collection with a number of services.
var leftMenu = new LeftMenu([
	new MenuItem({ linkTitle: 'Menu item 1', link: 'm1' , title: 'menu item 1111111'}),
	new MenuItem({ linkTitle: 'Menu item 2', link: 'm2' , title: 'menu item 2222222'}),
	new MenuItem({ linkTitle: 'Menu item 3', link: 'm3' , title: 'menu item 3333333333'}),
	new MenuItem({ linkTitle: 'Menu item 4', link: 'm4' , title: 'menu item 4444444444'}),
	new MenuItem({ linkTitle: 'Menu item 5', link: 'm5' , title: 'menu item 5555555555'}),
	new MenuItem({ linkTitle: 'Menu item 6', link: 'm6' , title: 'menu item 6666666666'}),
	new MenuItem({ linkTitle: 'Menu item 7', link: 'm7' , title: 'menu item 7777777777'})
]);

//This view turns a Service model into HTML
var LeftMenuItemView = Backbone.View.extend({
	
	model: MenuItem,
	
	tagName: 'a',
					
	initialize: function(){
		this.model.bind('change', this.render, this);
	},
	
	render: function(){
		this.$el.html(this.model.get('linkTitle'));
		this.$el.attr('href','#'+this.model.get('link'));
		if(this.model.get('selected')){
			this.$el.attr('class','selected');
		}else{
			this.$el.attr('class','');
		}
		return this;
	},
									
});


//Left menu
var LeftMenuView = Backbone.View.extend({

	el: '#menu',
		
	initialize: function(){
		
		leftMenu.each(function(menuItem){
			var view = new LeftMenuItemView({ model: menuItem });
			this.$el.append(view.render().el);
		}, 
		this);	// "this" is the context in the callback
		
	},

	render: function(){
		return this;
	}
	
});




