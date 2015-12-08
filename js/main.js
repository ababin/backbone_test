$(function(){
	
	// отключаем кэширование запросов
	$.ajaxSetup({ cache: false });
	
	// создаем левое меню
	leftMenuView = new LeftMenuView();
	
	// создаем роутер	
	new GlobalRouter();
	
	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();
	
	
});