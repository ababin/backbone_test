Admin       = {};
Admin.util   = {};
Admin.model = {};
Admin.types = {};






// =========================ADMIN VIEW ==========================================================================
Admin.view = {};
Admin.view.prepareTR = function(_recordIndex , _bbModel){
	var tableDesc = Admin.model[_bbModel.className].viewTable;
		
	var needShowRecordIndex = _recordIndex > 0;
	var html = '';
	var itemIndex = 0;
	
	// prepare data
	html += '<tr class="data" onclick="dialogManager.showDialogFor(' + this.component + ', ' + itemIndex + ', \'CRUD\')">';
	itemIndex++;
	if(needShowRecordIndex){
		html+= '<td class="index">' + recordIndex + '</td>';
	}
	recordIndex++;
	Admin.model[this.itemClass].viewTable.forEach(function(fieldDesc, index){
		html += '<td>' + item.attributes[fieldDesc.field] + '</td>';
	});
							
	html += '</tr>';
	
	
	
	if(this.fixHeight){
		var restRecords = this.collection.pageMeta.pageSize - this.collection.size();
		if(restRecords > 0){
			
			for(i=0; i<restRecords; i++){
				html += '<tr class="empty">'
					
				if(needShowRecordIndex){
					html+= '<td>E</td>';
				}
				
				Admin.model[this.itemClass].viewTable.forEach(function(fieldDesc, index){
					html += '<td></td>';
				});
				
				html += '</tr>';
			}
			
		}
	}
	
	return html;
	
		
		
};	


