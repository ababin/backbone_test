var GlobalRouter = Backbone.Router.extend({
	
	routes: {
		'm1': 'menu_m1',
		'm2': 'menu_m2',
		'm3': 'menu_m3',
		'm4': 'menu_m4',
		'm5': 'menu_m5',
		'm6': 'menu_m6',
		'm7': 'menu_m7',
		'*actions': 'globalRoute',
    },
    	    	    
    globalRoute: function(action){
    	alert('global route: ' + action);
    },
    	    	    
    menu_m1: function(){
    	this.refreshMenu('m1');
    },
    
    menu_m2: function(action){
    	this.refreshMenu('m2');
    },
    
    menu_m3: function(action){
    	this.refreshMenu('m3');
    },
    
    menu_m4: function(action){
    	this.refreshMenu('m4');
    },
    
    menu_m5: function(action){
    	this.refreshMenu('m5');
    },
    
    menu_m6: function(action){
    	this.refreshMenu('m6');
    },
    
    menu_m7: function(action){
    	this.refreshMenu('m7');
    	    	
    	tasks.fetch();
    	tasksView.render();
    	
    },
    
    
    refreshMenu: function(action){
    	leftMenu.each(function(menuItem){
			menuItem.set({'selected': action == menuItem.get('link')});
		}
		, this);
    },
    	    
});