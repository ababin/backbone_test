
Admin.ViewController = function(){
                
    /* список модальных окон */  
    this.windows = new Array();
};

/* ========================================================================================================================================== */
Admin.ViewController.prototype.closeWindow = function(){
    // соответствующее окно
    var dw = this.windows[this.windows.length-1];
    // 1. close window
    dw.close();
    // 2. remove window from array
    this.windows.splice(this.windows.length-1, 1);
    // 3. show or not gray wall
    this.wall();
};

/* ========================================================================================================================================== */
Admin.ViewController.prototype.wall = function(){
    if(this.windows.length == 0){
        $('#wall').hide();
        return;
    }
    var win = this.windows[this.windows.length-1];
        
    $('#wall').css("z-index", win.zIndex - 1);
    $('#wall').show();
};

/* ========================================================================================================================================== */
/*
 * Показать запись
 * 
 * параметры: _controller - контроллер записи, например
 * btvChannelRecordController _index - индекс данных соответсвующего
 * table-контроллера
 */
Admin.ViewController.prototype.showDetachedRecord = function(_className, _id,_mode){
    var controller = controllerManager.getController(_className);
    // 1. create new window
    var dw = new Admin.DetachedRecordDataWindow(controller, _id, _mode , this.windows.length);
    try{
        this.showWindow(dw);
    }catch(e){
        log.warn("Ошибка при отображении DetachedRecordWindow: "  + e);
    }
};

/* ========================================================================================================================================== */
Admin.ViewController.prototype.showWindow = function(_window){
    _window.initRec();
    // 2. add to array
    this.windows[this.windows.length] = _window;
    // 3. show wall 
    this.wall();
    // 4. show window
    _window.show();
};

Admin.ViewController.prototype.windowGoOnPage = function(_page){
    var controller = this.windows[this.windows.length - 1];
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
Admin.ViewController.prototype.showRecord = function(_className, _id,_mode, _needResetRecord){
    var controller = controllerManager.getController(_className);
    // 1. create new window
    var dw = new Admin.RecordDataWindow(controller, _id, _mode , this.windows.length);
    if(_needResetRecord === true){
        dw.controller.resetAdaptedRec();
    }
    this.showWindow(dw);
};

/* ========================================================================================================================================== */            
/* показать данные в основном диве
 * 
 */
Admin.ViewController.prototype.showMainDatas = function(_className){
    _controller = controllerManager.getController(_className);
    this.mainWindow = new Admin.MainDataWindow(_controller);
    this.mainWindow.show();
};

/* ========================================================================================================================================== */
/*
 * Отобразить указанную страницу для текущего модального окна
 */
Admin.ViewController.prototype.showPage = function(_pageNum){
    var needWin = null;
    if(this.windows.length > 0){
        needWin = this.windows[this.windows.length-1];
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
Admin.ViewController.prototype.modifyCollectionFor = function(_forClassName, _fieldName){
    var controllerFor = controllerManager.getController(_forClassName); 
    
    // создаем новое окно
    var nw = new Admin.TableDataWindow(controllerFor , _fieldName , null, 'M' , this.windows.length);
    nw.parentWindow = this.windows[this.windows.length-1];
    
    this.showWindow(nw);
    
    
};


/* ========================================================================================================================================== */            
/* вызывается при попытке добавления значений из коллекции справочника в нужный класс.
 * Например: при добавлении жанров в Btv-канал
 * 
 */
Admin.ViewController.prototype.save = function(){
    var win = this.windows[this.windows.length-1];
    if(win.save() === true){
        this.closeWindow();
    };
};

/* ========================================================================================================================================== */            
/* вызывается при попытке добавления значений из коллекции справочника в нужный класс.
 * Например: при добавлении жанров в Btv-канал
 * 
 */
Admin.ViewController.prototype.goToEditMode = function(){
    var win = this.windows[this.windows.length-1];
    win.show('U');
};

/* ========================================================================================================================================== */            
/* Нажата кнопка ОТМЕНА в окне
 * 
 */
Admin.ViewController.prototype.cancel = function(){
    var win = this.windows[this.windows.length-1];
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
Admin.window = {};
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





