

//LEFTMENUITEM ======================================================================== 
var LeftMenuItem = Backbone.Model.extend({});

var LeftMenuItemView = Backbone.View.extend({
	
	tagName: 'a',
					
	initialize: function(){
		this.model.bind('change', this.render, this);
	},
	
	render: function(){
		this.$el.html(this.model.get('linkTitle'));
		this.$el.attr('href','#'+this.model.get('link'));
		if(this.model.get('selected')){
			this.$el.attr('class','selected');
			$('#right_title').html(this.model.get('title'));
		}else{
			this.$el.attr('class','');
		}
		return this;
	},
									
});

// =============================================================================================================

//MENU collection ================================================================================================
var LeftMenu = Backbone.Collection.extend({});

var leftMenu = new LeftMenu([
	new LeftMenuItem({ linkTitle: 'Menu item 1', link: 'm1' , title: 'menu item 1111111'}),
	new LeftMenuItem({ linkTitle: 'Menu item 2', link: 'm2' , title: 'menu item 2222222'}),
	new LeftMenuItem({ linkTitle: 'Menu item 3', link: 'm3' , title: 'menu item 3333333333'}),
	new LeftMenuItem({ linkTitle: 'Menu item 4', link: 'm4' , title: 'menu item 4444444444'}),
	new LeftMenuItem({ linkTitle: 'Menu item 5', link: 'm5' , title: 'menu item 5555555555'}),
	new LeftMenuItem({ linkTitle: 'New Task', link: 'newTask' , title: 'New task !!!'}),
	new LeftMenuItem({ linkTitle: 'Load tasks',  link: 'loadTasks' , title: 'TASKS'})
]);

var LeftMenuView = Backbone.View.extend({

	el: '#menu',
		
	initialize: function(){
		
		leftMenu.each(function(menuItem){
			var view = new LeftMenuItemView({ model: menuItem });
			this.$el.append(view.render().el);
		}, 
		this);	
	},
	
	refreshMenu: function(action){
    	$('#right_title').html('');
    	$('#right_content').html('');    	
    	leftMenu.each(function(menuItem){
			menuItem.set({'selected': action == menuItem.get('link')});
		}, 
		this);
    },
	
});

var leftMenuView;

//=============================================================================================================

