//======================================================================================================================
// ======= ADMIN TYPES ==================================================================================================
// ======================================================================================================================
Admin.tpls = {};
Admin.tpls.card = {};
Admin.tpls.card.R = {};
Admin.tpls.card.R.Identifier = '<div class="row"><div class="field"><%=field%></div><div class="data id"><%=data%></div></div>';
Admin.tpls.card.R.String =     '<div class="row"><div class="field"><%=field%></div><div class="data"><%=data%></div></div>';
Admin.tpls.card.R.Text =       '<div class="row"><div class="field"><%=field%></div><div class="data"><%=data%></div></div>';
	
Admin.tpls.card.C = {}; 
Admin.tpls.card.C.Identifier = '<div class="row"><div class="field"><%=field%></div><div class="data id">&nbsp;</div></div>';
Admin.tpls.card.C.String =     '<div class="row"><div class="field"><%=field%></div><div class="data"><input type="text" value="<%=data%>" /></div></div>';
Admin.tpls.card.C.Text =       '<div class="row"><div class="field"><%=field%></div><div class="data"><textarea><%=data%></textarea></div></div>';



