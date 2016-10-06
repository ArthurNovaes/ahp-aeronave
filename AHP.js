
var criterios = new Array();
var alternativas = new Array();

var alternativasSomatorios=new Array();
var criteriosSomatorios=new Array();

var criteriosSomatoriosComp = new Array();

var mediasMatrizPreferencia = new Array();
var mediaCrit = new Array();
var resultado = new Array();
function InsereCriterio(){
	criterios.push(document.getElementById('criterioId').value);
	var obj = document.getElementById("criterios");
	var inserir="";
	for(i=0;i<criterios.length;i++){
		inserir+='<tr><td>Critério '+(i+1)+'</td><td>'+criterios[i]+'</td></tr>';
	}
	
	obj.innerHTML = inserir;
	document.getElementById('criterioId').value = '';
	document.getElementById('criterioId').focus();
	
}

function mostrar(id){
	document.getElementById(id).style.display="block";
	document.getElementById("proximo1").style.display="none";
	
}
function mostrarDados(){
	if(criterios.length==0){
		alert("insira ao menos 1 critério");
		return;
	}
	if(alternativas.length <= 1){
		alert("insira ao menos 2 alternativas");
		return;
	}
	document.getElementById("dados_complementares").style.display="block";
	document.getElementById("proximo1").style.display="none";
	document.getElementById("ini").style.display="none";
	document.getElementById("btnMatPrefs").style.display="block";
	var dados = document.getElementById("dados_comp");
	var th="<tr><th>Critérios</th>";
	for(i=0;i<alternativas.length;i++){
		th+='<th>'+alternativas[i]+'</th>'
	}
	th+='</tr>';
	var tr='';
	for(i=0;i<criterios.length;i++){
		tr+= '<tr>';
		tr+= '<td>C'+(i+1)+' - '+criterios[i]+'</td>';
		for(j=0;j<alternativas.length;j++){
			tr+='<td><input type="text" /></td>';
		}
		tr+= '</tr>';
	}
	
	var inserir='';
	inserir = th+tr;
	dados.innerHTML = inserir;
	
}

function InserirAlternativa(){
	alternativas.push(document.getElementById('alternativaId').value);
	var obj = document.getElementById("listaAlternativas");
	var inserir="";
	for(i=0;i<alternativas.length;i++){
		inserir+='<tr><td>Alternativa '+(i+1)+'</td><td>'+alternativas[i]+'</td></tr>';
	}
	obj.innerHTML = inserir;
	document.getElementById('alternativaId').value = '';
	document.getElementById('alternativaId').focus();
}

function gerarPreferencias(){
	document.getElementById("btnMatPrefs").style.display="none";
	document.getElementById("btnNormalizar").style.display="block";
	document.getElementById("contMatPref").style.display="block";
	var local = document.getElementById("matprefs");
	var conteudo = "";
	
	for(i=0;i<criterios.length;i++){
		conteudo+='\
		<div id="'+criterios[i]+'"> \
		<h4>Preferência por '+criterios[i]+'</h4>\
		<table id="tab'+criterios[i]+'" border="1">\
		<tr><td>C'+(i+1)+'</td>';
		for(j=0;j<alternativas.length;j++){
			conteudo+= '<td>'+alternativas[j]+'</td>';
			if(j==alternativas.lenght-1){
				conteudo+='</tr>'
			}
		}
		for(j=0;j<alternativas.length;j++){
			conteudo+= '<tr><td>'+alternativas[j]+'</td>';
			for(k=0;k<alternativas.length;k++){
				if(k==j){
					conteudo+='<td><select disabled id="c'+i+'a'+j+''+k+'">';
				}
				else
					conteudo+='<td><select id="c'+i+'a'+j+''+k+'" onchange="validarOpcao(\'c'+i+'a'+j+''+k+'\')">';
				for(x=1;x<10;x++){
					conteudo+='<option value="'+x+'" >'+x+'</option>';
				}
				for(x=2;x<10;x++){
					conteudo+='<option value="'+(1/x)+'">1/'+x+'</option>';
				}
				conteudo+='</select></td>';
			}
			conteudo+='</tr>';
		}
		conteudo+='</table>\
		</div>';
	}
	local.innerHTML = conteudo;
	
	
}
function validarOpcao(id){
	var idId = document.getElementById(id).id;
	var idSplit = idId.split("");
	var col = idSplit[4];
	var lin = idSplit[3];
	var valElement = document.getElementById(id).value;
	var elementoSelecionadoTexto;
	for(i=0;i<document.getElementById(id).getElementsByTagName("OPTION").length;i++){
		if(document.getElementById(id).getElementsByTagName("OPTION")[i].selected == true){
			elementoSelecionadoTexto = document.getElementById(id).getElementsByTagName("OPTION")[i].textContent;
		}
	}
	if(valElement == 1){
		document.getElementById('c'+idSplit[1]+'a'+col+''+lin).getElementsByTagName("OPTION")[0].selected = true;
	}
	else if( valElement > 1){
		document.getElementById('c'+idSplit[1]+'a'+col+''+lin).getElementsByTagName("OPTION")[parseInt(valElement)+7].selected = true;
	}
	else{
		document.getElementById('c'+idSplit[1]+'a'+col+''+lin).getElementsByTagName("OPTION")[
		parseInt( elementoSelecionadoTexto.split("")[2] ) - 1].selected = true;
		
	}
}
function validarOpcaocmc(id){
	var idId = document.getElementById(id).id;
	var idSplit = idId.split("");
	var col = idSplit[2];
	var lin = idSplit[1];
	var valElement = document.getElementById(id).value;
	var elementoSelecionadoTexto;
	for(i=0;i<document.getElementById(id).getElementsByTagName("OPTION").length;i++){
		if(document.getElementById(id).getElementsByTagName("OPTION")[i].selected == true){
			elementoSelecionadoTexto = document.getElementById(id).getElementsByTagName("OPTION")[i].textContent;
		}
	}
	if(valElement == 1){
		document.getElementById('c'+col+''+lin).getElementsByTagName("OPTION")[0].selected = true;
	}
	else if( valElement > 1){
		document.getElementById('c'+col+''+lin).getElementsByTagName("OPTION")[parseInt(valElement)+7].selected = true;
	}
	else{
		document.getElementById('c'+col+''+lin).getElementsByTagName("OPTION")[
		parseInt( elementoSelecionadoTexto.split("")[2] ) - 1].selected = true;
		
	}
}
function normalizarPreferencias(){
	document.getElementById("btnNormalizar").style.display="none";
	var loc = document.getElementById("mats");
	document.getElementById("matprefs").style.display="none";
	
	var total1=0;
	
	for(i=0;i<criterios.length;i++){
		alternativasSomatorios = new Array();
		for(j=0;j<alternativas.length;j++){
			total1=0;
			for(k=0;k<alternativas.length;k++){
				 total1 += parseFloat( document.getElementById('c'+i+'a'+k+''+j+'').value);
				 
			}
			console.log(total1);
			alternativasSomatorios[j] = total1;
		}
		criteriosSomatorios[i] = alternativasSomatorios;
	}
	
	var conteudo = "";
	
	for(i=0;i<criterios.length;i++){
		conteudo+='\
		<div id="mats'+criterios[i]+'"> \
		<h4>Preferência por'+criterios[i]+'</h4>\
		<table id="tab'+criterios[i]+'_2" border="1">\
		<tr><td><strong>C'+(i+1)+'</strong></td>';
		for(j=0;j<alternativas.length;j++){
			conteudo+= '<td>'+alternativas[j]+'</td>';
			if(j==alternativas.lenght-1){
				conteudo+='</tr>'
			}
		}
		for(j=0;j<alternativas.length;j++){
			conteudo+= '<tr><td>'+alternativas[j]+'</td>';
			for(k=0;k<alternativas.length;k++){
				conteudo+='<td>';
				//
				conteudo+=document.getElementById('c'+i+'a'+j+''+k+'').value;
				conteudo+= '/'+criteriosSomatorios[i][k];
				//
				//
				//
				conteudo+='</td>';
			}
			conteudo+='</tr>';
		}
		conteudo+='</table>\
		</div>';
	}
	loc.innerHTML += conteudo;
	
	gerarMatrizDePreferencias();
	
	
	
}

function gerarMatrizDePreferencias(){
	document.getElementById("btnNormalizar").style.display="none";
	document.getElementById("contCompCrit").style.display="block";
	var loc = document.getElementById("mpa");
	document.getElementById("matprefs").style.display="none";
	
	var total1=0;
	
	for(i=0;i<criterios.length;i++){
		alternativasSomatorios = new Array();
		for(j=0;j<alternativas.length;j++){
			total1=0;
			for(k=0;k<alternativas.length;k++){
				 total1 += parseFloat( document.getElementById('c'+i+'a'+k+''+j+'').value);
				 
			}
			alternativasSomatorios[j] = total1;
		}
		criteriosSomatorios[i] = alternativasSomatorios;
	}
	
	var conteudo = "";
	
	
	conteudo+='\
	<table border="1">\
	<tr><td></td>';
	for(j=0;j<criterios.length;j++){
		conteudo+= '<td>C'+(j+1)+'</td>';
		if(j==criterios.lenght-1){
			conteudo+='</tr>'
		}
	}
	
	for(j=0;j<alternativas.length;j++){
		mediasMatrizPreferencia[j] = new Array();
		conteudo+= '<tr><td>'+alternativas[j]+'</td>';
		for(k=0;k<criterios.length;k++){
			conteudo+='<td>';
			
			mediasMatrizPreferencia[j][k] = (parseFloat(document.getElementById('c'+k+'a'+j+''+j+'').value) / criteriosSomatorios[k][j]).toFixed(3);
			conteudo+= mediasMatrizPreferencia[j][k];
			conteudo+='</td>';
		}
		conteudo+='</tr>';
	}
	conteudo+='</table>';
	
	loc.innerHTML += conteudo;
	
	
	construirMatrizDeCompEntreCriterios();
	
}

function construirMatrizDeCompEntreCriterios(){
	document.getElementById("btnCalcCompCrit").style.display="block";
	var local = document.getElementById("matCompCrit");
	var conteudo = "";
	
	
		conteudo+='\
		<div id="'+criterios[i]+'"> \
		<h4>Comparação entre criterios</h4>\
		<table id="tabmatCompCrit" border="1">\
		<tr><td></td>';
		for(j=0;j<criterios.length;j++){
			conteudo+= '<td>C'+(j+1)+'</td>';
			if(j==criterios.lenght-1){
				conteudo+='</tr>'
			}
		}
		for(j=0;j<criterios.length;j++){
			conteudo+= '<tr><td>C'+(j+1)+' - '+criterios[j]+'</td>';
			for(k=0;k<criterios.length;k++){
				if(k==j){
					conteudo+='<td><select disabled id="c'+j+''+k+'">';
				}
				else
					conteudo+='<td><select id="c'+j+''+k+'" onchange="validarOpcaocmc(\'c'+j+''+k+'\')">';
				for(x=1;x<10;x++){
					conteudo+='<option value="'+x+'" >'+x+'</option>';
				}
				for(x=2;x<10;x++){
					conteudo+='<option value="'+(1/x)+'">1/'+x+'</option>';
				}
				conteudo+='</select></td>';
			}
			conteudo+='</tr>';
		}
		conteudo+='</table>\
		</div>';
	
	local.innerHTML = conteudo;
}

function calcularCompCrit(){
	document.getElementById("btnCalcCompCrit").style.display="none";
	document.getElementById("matCompCrit").style.display="none";
	document.getElementById("contResultado").style.display="block";
	document.getElementById("btnObterResultado").style.display="block";
	
	var loc = document.getElementById("mediaCompCrit");
	
	var total1=0;
	var total2=0;
	var mx = new Array();
	var matrix = new Array();
	
	for(i=0;i<criterios.length;i++){
		total1=0;
		for(j=0;j<criterios.length;j++){
			mx[j] = parseFloat(document.getElementById('c'+i+''+j+'').value);
			total1 += parseFloat( document.getElementById('c'+j+''+i+'').value);
		}
		matrix[i] = mx;
		mx=new Array();
		criteriosSomatoriosComp[i] = total1;
		
	}
	for(i=0;i<criterios.length;i++){
		total2=0;
		for(j=0;j<criterios.length;j++){
			var normal = 0.0;
			normal = (parseFloat(matrix[i][j]) / parseFloat(criteriosSomatoriosComp[j]));
			
			total2 += parseFloat(normal.toFixed(3));
		}
		mediaCrit[i] = (total2/criterios.length).toFixed(3);;
	}
	
	var conteudo = "";
	
	var conteudo = "";
	conteudo+='<table>\
	<tr><td></td><td>Média</td></tr>';
	for(i=0;i<criterios.length;i++){
		conteudo+='<tr><td>C'+(i+1)+'</td>'
		conteudo+='<td>';
		conteudo+= mediaCrit[i];
		conteudo+='</td>';
		conteudo+='</tr>';
	}
	conteudo+='</table>';
	loc.innerHTML += conteudo;
}

function calcularResultado(){
	for(i=0;i<alternativas.length;i++){
		resultado[i] = 0.0;
		for(j=0;j<criterios.length;j++){
			resultado[i] += (mediaCrit[j]*mediasMatrizPreferencia[i][j]);
			console.log((mediaCrit[j]*mediasMatrizPreferencia[i][j]));
		}	
	}
}

function mostraResultado(){
	document.getElementById("btnObterResultado").style.display="none";
	calcularResultado();
	var loc = document.getElementById("tabResultado");
	var conteudo="";
	conteudo+= '<table>';
	for(i=0;i<alternativas.length;i++){
		conteudo+= '<tr><td>C'+(i+1)+'-'+alternativas[i]+'</td><td>'+formatarResultado(resultado[i])+'%</td></tr>';
	}
	conteudo+='</table>';
	loc.innerHTML = conteudo;
}

function formatarResultado(res){
	return res.toFixed()*100;
}