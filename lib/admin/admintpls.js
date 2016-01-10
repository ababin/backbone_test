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
Admin.tpls.card.C.String =     '<div class="row"><div class="field"><%=field%></div><div class="data"><input id="<%=id%>" type="text" value="<%=data%>" /></div></div>';
Admin.tpls.card.C.Text =       '<div class="row"><div class="field"><%=field%></div><div class="data"><textarea id="<%=id%>"><%=data%></textarea></div></div>';

Admin.tpls.card.U = {}; 
Admin.tpls.card.U.Identifier = '<div class="row"><div class="field"><%=field%></div><div class="data id"><%=data%></div></div>';
Admin.tpls.card.U.String =     '<div class="row"><div class="field"><%=field%></div><div class="data"><input id="<%=id%>" type="text" value="<%=data%>" /></div></div>';
Admin.tpls.card.U.Text =       '<div class="row"><div class="field"><%=field%></div><div class="data"><textarea id="<%=id%>"><%=data%></textarea></div></div>';



