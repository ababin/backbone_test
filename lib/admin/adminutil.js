Admin = Admin ? Admin : {};
Admin.util = {};
Admin.util.getLocaleMes = function(_name,_locale){
	if(!_locale){
		_locale = settings.locale;
	}
	var v = ref.MSGS_MODEL[_name + '.' + _locale] || ref.MSGS_MODEL[_name + '.' + settings.locale] || ref.MSGS_MODEL[_name + '.' + settings.def.locale] || ref.MSGS_MODEL[_name] || ref.MSGS[_name + '.' + _locale] || ref.MSGS[_name + '.' + settings.locale] || ref.MSGS[_name + '.' + settings.def.locale] || ref.MSGS[_name];
	if(v){
		return v;
	}else{
		return _name + '.' + _locale;
	}
};

Admin.util.getEntityNameByClassName = function(_class){
	if (typeof _class !== "undefined") {
		return _class.slice(0, 1).toLowerCase() + _class.slice(1);
	}else{
		return 'UNDEFINED';
	}
};

Admin.util.getObjectByPriority = function(){
	for(var i= arguments.length-1 ; i>=0 ; i--){
		try{
			return eval(arguments[i]);
		}catch(e){}
	}
	var str  = '';
	for(var i = 0; i < arguments.length; i++){
		if(str.length == 0){
			str += arguments[i];
		}else{
			str += ', ' + arguments[i];
		}
	}
	log.warn("Не удалось получить валидное значение ни для одного из предоставленных значений: "+ str);
};


Admin.util.prepareControllerName = function(_className){
	return  'Controller' + _className;
};

Admin.util.isEmpty = function(_ob){
	for(var v in _ob){
		return false;
	}
	return true;
};


Admin.util.isEmptyString = function(_str){
	if(_str == undefined || _str == null || _str.trim().length == 0){
		return true;
	}
	return false;
};

Admin.util.calcEvalForObject = function(_ob, _evalString){
	var str = _evalString;
	try{
		str = eval(str);
	}catch(e){}
	return str;
};

Admin.util.copyObject = function(_ob){
	if(_ob == null){
		return null;
	}
	var copy = null;
	switch(typeof _ob){
	case 'string' : 
	case 'number' :
	case 'boolean' : 	copy = _ob;
						return copy;
						
	case 'object' : if(Object.prototype.toString.call(_ob) == "[object Array]"){
						copy = new Array();
						for(var i in _ob){
							copy[i] = Admin.util.copyObject(_ob[i]);
						}
						return copy;
					}else{
						copy = {};
						for(var i in _ob){
							copy[i] = Admin.util.copyObject(_ob[i]);
						}
						return copy;
					}
	
	}
	return copy;
};

Admin.util.objectToString = function(_ob){
	if(_ob == null){
		return 'NULL';
	}
	switch(typeof _ob){
	case 'string' : return "'" + _ob + "'";
	case 'number' : return _ob;
	case 'boolean' : return _ob ? 'TRUE' : 'FALSE';
						
	case 'object' : var res = '';
					if(Object.prototype.toString.call(_ob) == "[object Array]"){
						res += '=[';
						var first = true;
						for(var i in _ob){
							if(first){
								first = false;
							}else{
								res += ', ';
							}
							res += Admin.util.objectToString(_ob[i]);
						}
						res += ']';
					}else{
						res += '={';
						var first = true;
						for(var i in _ob){
							if(first){
								first = false;
							}else{
								res += ', ';
							}
							res += i + ':' + Admin.util.objectToString(_ob[i]);
						}
						res += '}';
					}
					return res;
					
	default : return '??default??';
	}
};


Admin.util.prepareDivIdForVtObject = function(_windowLevel,_entityClass, _fieldName){
	return 'div_' + _windowLevel + '_' + _entityClass + '_' + _fieldName;
};


Admin.util.echoString = function(_str){
	if(_str == undefined || _str == null){
		return _str.toString();
	}
	return _str.toString().replace(/</g,"&lt;").replace(/>/g,"&gt;");
};

/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* === SERVICE FUNCTIONS FOR MODEL =========================================================================================================================== */

if(Admin.util.model == undefined)Admin.util.model = {};

Admin.util.model.defaultPagedLoading = true;
Admin.util.model.defaultIsComposition = false;
Admin.util.model.defaultIsIdentifier = false;
Admin.util.model.defaultIsNullable = true;
Admin.util.model.defaultIsDetached = false;
Admin.util.model.defaultMaxSize = 100000;
Admin.util.model.defaultMinSize = 0;
Admin.util.model.defaultMax = 99999999999999999999;
Admin.util.model.defaultMin = -99999999999999999999;


/*
 * определяет, является ли данная сущность загружаемой постранично или нет
 */
Admin.util.model.pagedLoading = function(_entityClass){
	if(model.CLASSES[_entityClass] == undefined){
		log.error('Не задана модель для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + ')');
		return this.defaultPagedLoading;
	}
	if(model.CLASSES[_entityClass].params == undefined){
		log.error('Не заданы параметры модели для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.params)');
		return this.defaultPagedLoading;
	}
	if(model.CLASSES[_entityClass].params.pagedLoading == undefined){
		log.error('Не заданы параметры модели для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.params)');
		return this.defaultPagedLoading;
	}
	return model.CLASSES[_entityClass].params.pagedLoading;
};

/*
 * определяет, является композиционной данная зависимость
 * _fDesc - дескриптор поля
 */
Admin.util.model.isComposition = function(_entityClass, _fieldName){
	if(model.CLASSES[_entityClass] == undefined){
		log.error('Не задана модель для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + ')');
		return this.defaultIsComposition;
	}
	if(model.CLASSES[_entityClass].fields == undefined){
		log.error('Не заданы поля для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields)');
		return this.defaultIsComposition;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName] == undefined){
		log.error('Не найдено поле ' + _fieldName + ' для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields.' + _fieldName + ')');
		return this.defaultIsComposition;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName].isComposition == undefined){
		return this.defaultIsComposition;
	}
	return model.CLASSES[_entityClass].fields[_fieldName].isComposition;
};
/*
 * определяет, хранятся ли данные в видеидентификаторов
 * _entityClass - имя класса сущности
 * _fieldName - название поля, для которого определяется значение параметра
 */
Admin.util.model.isIdentifier = function(_entityClass, _fieldName){
	if(model.CLASSES[_entityClass] == undefined){
		log.error('Не задана модель для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + ')');
		return this.defaultIsIdentifier;
	}
	if(model.CLASSES[_entityClass].fields == undefined){
		log.error('Не заданы поля для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields)');
		return this.defaultIsIdentifier;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName] == undefined){
		log.error('Не найдено поле ' + _fieldName + ' для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields.' + _fieldName + ')');
		return this.defaultIsIdentifier;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName].isIdentifier == undefined){
		return this.defaultIsIdentifier;
	}
	return model.CLASSES[_entityClass].fields[_fieldName].isIdentifier;
};

/*
 * определяет, поддерживает ли значение пустое значение
 * _entityClass - имя класса сущности
 * _fieldName - название поля, для которого определяется значение параметра
 */
Admin.util.model.isNullable = function(_entityClass, _fieldName){
	if(model.CLASSES[_entityClass] == undefined){
		log.error('Не задана модель для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + ')');
		return this.defaultIsNullable;
	}
	if(model.CLASSES[_entityClass].fields == undefined){
		log.error('Не заданы поля для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields)');
		return this.defaultIsNullable;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName] == undefined){
		log.error('Не найдено поле ' + _fieldName + ' для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields.' + _fieldName + ')');
		return this.defaultIsNullable;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName].isNullable == undefined){
		return this.defaultIsNullable;
	}
	return model.CLASSES[_entityClass].fields[_fieldName].isNullable;
};


/*
 * определяет, поддерживает ли значение пустое значение
 * _entityClass - имя класса сущности
 * _fieldName - название поля, для которого определяется значение параметра
 */
Admin.util.model.isDetached = function(_entityClass, _fieldName){
	if(model.CLASSES[_entityClass] == undefined){
		log.error('Не задана модель для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + ')');
		return this.defaultIsDetached;
	}
	if(model.CLASSES[_entityClass].fields == undefined){
		log.error('Не заданы поля для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields)');
		return this.defaultIsDetached;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName] == undefined){
		log.error('Не найдено поле ' + _fieldName + ' для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields.' + _fieldName + ')');
		return this.defaultIsDetached;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName].isDetached == undefined){
		return this.defaultIsDetached;
	}
	return model.CLASSES[_entityClass].fields[_fieldName].isDetached;
};


/*
 * определяет, поддерживает ли значение пустое значение
 * _entityClass - имя класса сущности
 * _fieldName - название поля, для которого определяется значение параметра
 */
Admin.util.model.maxSize = function(_entityClass, _fieldName){
	if(model.CLASSES[_entityClass] == undefined){
		log.error('Не задана модель для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + ')');
		return this.defaultMaxSize;
	}
	if(model.CLASSES[_entityClass].fields == undefined){
		log.error('Не заданы поля для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields)');
		return this.defaultMaxSize;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName] == undefined){
		log.error('Не найдено поле ' + _fieldName + ' для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields.' + _fieldName + ')');
		return this.defaultMaxSize;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName].maxSize == undefined){
		return this.defaultMaxSize;
	}
	return model.CLASSES[_entityClass].fields[_fieldName].maxSize;
};

/*
 * определяет, поддерживает ли значение пустое значение
 * _entityClass - имя класса сущности
 * _fieldName - название поля, для которого определяется значение параметра
 */
Admin.util.model.minSize = function(_entityClass, _fieldName){
	if(model.CLASSES[_entityClass] == undefined){
		log.error('Не задана модель для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + ')');
		return this.defaultMinSize;
	}
	if(model.CLASSES[_entityClass].fields == undefined){
		log.error('Не заданы поля для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields)');
		return this.defaultMinSize;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName] == undefined){
		log.error('Не найдено поле ' + _fieldName + ' для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields.' + _fieldName + ')');
		return this.defaultMinSize;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName].minSize == undefined){
		return this.defaultMinSize;
	}
	return model.CLASSES[_entityClass].fields[_fieldName].minSize;
};


/*
 * определяет максимальное значение для целого значения 
 * _entityClass - имя класса сущности
 * _fieldName - название поля, для которого определяется значение параметра
 */
Admin.util.model.max = function(_entityClass, _fieldName){
	if(model.CLASSES[_entityClass] == undefined){
		log.error('Не задана модель для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + ')');
		return this.defaultMax;
	}
	if(model.CLASSES[_entityClass].fields == undefined){
		log.error('Не заданы поля для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields)');
		return this.defaultMax;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName] == undefined){
		log.error('Не найдено поле ' + _fieldName + ' для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields.' + _fieldName + ')');
		return this.defaultMax;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName].max == undefined){
		return this.defaultMax;
	}
	return model.CLASSES[_entityClass].fields[_fieldName].max;
};

/*
 * определяет минимальное значение для целого значения 
 * _entityClass - имя класса сущности
 * _fieldName - название поля, для которого определяется значение параметра
 */
Admin.util.model.min = function(_entityClass, _fieldName){
	if(model.CLASSES[_entityClass] == undefined){
		log.error('Не задана модель для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + ')');
		return this.defaultMin;
	}
	if(model.CLASSES[_entityClass].fields == undefined){
		log.error('Не заданы поля для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields)');
		return this.defaultMin;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName] == undefined){
		log.error('Не найдено поле ' + _fieldName + ' для класса ' + _entityClass + ' (model.CLASSES.' + _entityClass + '.fields.' + _fieldName + ')');
		return this.defaultMin;
	}
	if(model.CLASSES[_entityClass].fields[_fieldName].min == undefined){
		return this.defaultMin;
	}
	return model.CLASSES[_entityClass].fields[_fieldName].min;
};


/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* =========================================================================================================================================================== */
/* === L O G G E R  ========================================================================================================================================== */

log = {};
log.trace = function(){
	if(log.level < log.TRACE){
		return;
	}
	console.trace();
};
log.debug = function(_str,_objs){
	if(log.level < log.DEBUG){
		return;
	}
	if(_objs != undefined){
		console.debug(_str + ': ' + Admin.util.objectToString(_objs));
	}else{
		console.debug(_str);
	}
};
log.info = function(str){
	if(log.level < log.INFO){
		return;
	}
	console.info(str);
};
log.warn = function(str){
	if(log.level < log.WARN){
		return;
	}
	console.warn(str);
};
log.error = function(str){
	if(log.level < log.ERROR){
		return;
	}
	console.error(str);
};
log.TRACE = 6;
log.DEBUG = 5;
log.INFO = 4;
log.WARN = 3;
log.ERROR = 2;
log.FATAL = 1;

log.level = log.WARN;






Admin.util.getMulticast = function(_ob){
	if(!Admin.util.isEmpty(_ob.mediaSources)){
		for(var i in _ob.mediaSources){
			var ms = _ob.mediaSources[i];
			if(ms.c == 'MulticastChannel'){
				return 'igmp://' + ms.mcastAddress + ':' + ms.mcastPortNumber;
			}
		}
	}
	return '';
};




