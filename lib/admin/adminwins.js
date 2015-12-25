Admin.window = {};

Admin.window.ViewController = function(){
                
    /* список модальных окон */  
    this.wins = new Array();
};

/* ========================================================================================================================================== */
Admin.window.ViewController.prototype.closeWindow = function(){
    // соответствующее окно
    var dw = this.wins[this.wins.length-1];
    // 1. close window
    dw.close();
    // 2. remove window from array
    this.wins.splice(this.wins.length-1, 1);
    // 3. show or not gray wall
    
};

/* ========================================================================================================================================== */
Admin.window.ViewController.prototype.showWindow = function(_window){
    _window.initRec();
    // 2. add to array
    this.wins[this.wins.length] = _window;
    // 3. show wall 
    this.wall();
    // 4. show window
    _window.show();
};

Admin.window.ViewController.prototype.windowGoOnPage = function(_page){
    var controller = this.wins[this.wins.length - 1];
    controller.
    
    log.warn('Запрошена страница ' + _page);
};

/* ========================================================================================================================================== */
/*
 * Показать запись
 * 
 * параметры: 
 * _className - имя класса сущности, для которой производится операция
 * _id - идентификатор сущности
 * _mode - режим открытия окна: 'R' - для чтения, 'C' - для создания, 'U' - для модификации
 * _needResetRecord - нужно ли сбрасывать запись в контроллере
 */
Admin.window.ViewController.prototype.showRecord = function(_className, _id,_mode, _needResetRecord){
    var controller = controllerManager.getController(_className);
    // 1. create new window
    var dw = new Admin.RecordDataWindow(controller, _id, _mode , this.wins.length);
    if(_needResetRecord === true){
        dw.controller.resetAdaptedRec();
    }
    this.showWindow(dw);
};

/* ========================================================================================================================================== */            
/* показать данные в основном диве
 * 
 */
Admin.window.ViewController.prototype.showMainDatas = function(_className){
    _controller = controllerManager.getController(_className);
    this.mainWindow = new Admin.MainDataWindow(_controller);
    this.mainWindow.show();
};

/* ========================================================================================================================================== */
/*
 * Отобразить указанную страницу для текущего модального окна
 */
Admin.window.ViewController.prototype.showPage = function(_pageNum){
    var needWin = null;
    if(this.wins.length > 0){
        needWin = this.wins[this.wins.length-1];
    }else{
        needWin = this.mainWindow;
    }
    needWin.show(_pageNum);
};


/* ========================================================================================================================================== */            
/* вызывается при попытке добавления значений из коллекции справочника в нужный класс.
 * Например: при добавлении жанров в Btv-канал
 * 
 */
Admin.window.ViewController.prototype.modifyCollectionFor = function(_forClassName, _fieldName){
    var controllerFor = controllerManager.getController(_forClassName); 
    
    // создаем новое окно
    var nw = new Admin.TableDataWindow(controllerFor , _fieldName , null, 'M' , this.wins.length);
    nw.parentWindow = this.wins[this.wins.length-1];
    
    this.showWindow(nw);
    
    
};


/* ========================================================================================================================================== */            
/* вызывается при попытке добавления значений из коллекции справочника в нужный класс.
 * Например: при добавлении жанров в Btv-канал
 * 
 */
Admin.window.ViewController.prototype.save = function(){
    var win = this.wins[this.wins.length-1];
    if(win.save() === true){
        this.closeWindow();
    };
};

/* ========================================================================================================================================== */            
/* вызывается при попытке добавления значений из коллекции справочника в нужный класс.
 * Например: при добавлении жанров в Btv-канал
 * 
 */
Admin.window.ViewController.prototype.goToEditMode = function(){
    var win = this.wins[this.wins.length-1];
    win.show('U');
};

/* ========================================================================================================================================== */            
/* Нажата кнопка ОТМЕНА в окне
 * 
 */
Admin.window.ViewController.prototype.cancel = function(){
    var win = this.wins[this.wins.length-1];
    if(win.mode == 'U'){
        win.show('R');
    };
};

/* ==============================================================================================================================================
 * ==============================================================================================================================================
 * ============================================================================================================================================== 
 * ============================================================================================================================================== 
 * ============================================================================================================================================== 
 */
/*
 * Базовый класс для всех информационных окон. Включает в себя соответсвующий контроллер данных. Это может быть
 * табличный контроллер (TableController) или контроллер записи (RecordController)
 */
Admin.window.BaseWindow = function(_index, _bbModel){
    // backbone model or collection
    this.bbModel = _bbModel;
    // window index. Used for modalID prepare 
    this.index = _index;
    
    var winPrefix = '#modalWindow_';
    
    this.tpl = 
    	'<div class="modal-dialog">' + 
    	'  <div class="modal-content">'+
		'    <div class="modal-header"><%=header%></div>'+
        '    <div class="modal-body"><%=body%></div>'+
        '    <div class="modal-footer"><%=footer%></div>'+
	    '  </div>'+
        '</div>';
    
    
};

Admin.window.BaseWindow.prototype.show = function(){
    this.showHandle();
};

Admin.window.BaseWindow.prototype.showHandle = function(){
	$(winPrefix + this.index).modal({backdrop: 'static'});
};

Admin.window.BaseWindow.prototype.close = function(){
    this.closeHandle();
};

Admin.window.BaseWindow.prototype.closeHandle = function(){
    // get DIV object:
    var div = $(winPrefix + this.level);
    div.html('');
    div.hide();
};


/* ==============================================================================================================================================
 * ==============================================================================================================================================
 * ============================================================================================================================================== 
 * ============================================================================================================================================== 
 * ============================================================================================================================================== 
 */
/*
 * Реализация для окна, представляющая данные по конкретной строке таблицы
 */
Admin.window.RecordWindow = function(_index, _bbModel){
    Admin.window.BaseWindow.call(this, _index, _bbModel);
};
Admin.window.RecordWindow.prototype = new Admin.window.BaseWindow();





