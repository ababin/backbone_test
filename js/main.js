$(function(){
	
	// создаем левое меню
	new LeftMenuView();
	
	tasksView = new TasksView();
	
	// создаем роутер	
	new GlobalRouter();
		
	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();
	
	
	
});