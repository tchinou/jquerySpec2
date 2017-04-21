	var jsonObject = {persons:[ ]};
	var testId=true;
	var testName=true;
	var testFirstName=true;
	var testAge=true;
	$(document).ready(function(){
		$("#identifierDescendant").hide();
		$("#idNameDescendant").hide();
		$("#idFirstNameDescendant").hide();
		$("#idAgeDescendant").hide();
		$("#idFirstNameAscendant").hide();
		$("#idNameAscendant").hide();
		$("#idAgeAscendant").hide();
		$("#person").css("postion", "relative");
		$("#person").css("left", "10px");
		$("#person").css("top", "10px");
		$("#person").css("borderColor", "red");
		$("#person").css("borderStyle", "solid");
		$("#table").css("borderCollapse", "collapse");
		var line=$("#idTr");
		var column=$("#id");
		column.css("borderWidth", "1px");
		column.css("borderStyle", "solid");
		column.css("borderColor", "black");
		var columnOne=$("#main");
		columnOne.css("borderWidth", "1px");
		columnOne.css("borderStyle", "solid");
		columnOne.css("borderColor", "black");
		var columnTwo=$("#firstName");
		columnTwo.css("borderWidth", "1px");
		columnTwo.css("borderStyle", "solid");
		columnTwo.css("borderColor", "black");
		var columnThree=$("#tableAge");
		columnThree.css("borderColor", "black");
		columnThree.css("borderWidth", "1px");
		columnThree.css("borderStyle", "solid");
		var columnModif=$("#modify");
		columnModif.css("borderColor", "black");
		columnModif.css("borderWidth", "1px");
		columnModif.css("borderStyle", "solid");
		var elmtSequence=0;
		var editPersonDialog;
		
	function modifyPersonOnJson(v1, v2, v3, val){
		var valueOfIdToEdit=value;
		nameToMdify, firstNameToModify, ageToModify
		var nameToMdify=v1;
		var firstNameToModify=v2;
		var ageToModify=v3;
			
		$.each(jsonObject, function(){
			$.each(this, function(index, value){
				if(!value){
					return;
				}
				else {
					var idToModify=jsonObject.persons[index].id;
					if(idToModify == valueOfIdToEdit){
						jsonObject.persons[index].firstName=nameToMdify;
						jsonObject.persons[index].name=firstNameToModify;
						jsonObject.persons[index].age=ageToModify;
					}
				}
				});
		});
		return jsonObject;
	}
	function deletePerson(id){
		var idToDelete=id;
		$.each(jsonObject, function(){
			$.each(this, function(index, value){
				if(!value){
					return;
				}
				else {
					var idToRemove=jsonObject.persons[index].id;
					if(idToRemove == idToDelete){
						delete jsonObject.persons[index];
					};
				};
			});
		});
		return jsonObject;
	}
	function displayTableFromJson(){
		$(".replace").remove();
		$.each(jsonObject, function() {
			$.each(this, function(index, value){
				if(!value){
					return;
				}
				else {
					var tdTagId=$('<td></td>');
					var tdTagName=$('<td></td>');
					var tdTagFirstName=$('<td></td>');
					var tdTagAge=$('<td></td>');
					var tdModif=$('<button id="mod" type="button"></button>').text("Modify");
					var tdDelete=$('<button id="del" type="button"></button>').text("delete");
					console.log(jsonObject.persons[index]);
					var id=jsonObject.persons[index].id;
					var firstName=jsonObject.persons[index].firstName;
					var lastName=jsonObject.persons[index].name;
					var age=jsonObject.persons[index].age;
					var trTag=$('<tr class="replace"></tr>');
					trTag.attr("id", id);
					tdDelete.attr("title", id);
					tdModif.attr("title", id);
					tdTagId.text(id);
					tdTagName.text(lastName);
					tdTagFirstName.text(firstName);
					tdTagAge.text(age);
					trTag.append(tdTagId);
					trTag.append(tdTagName);
					trTag.append(tdTagFirstName);
					trTag.append(tdTagAge);
					trTag.append(tdModif);
					trTag.append(tdDelete);
					var titleMod=$(this).attr("title");
					
					(tdModif).click (function (){
						var titleMod=$(this).attr("title");
						editPersonDialog.data("id", titleMod).dialog("open");
					});
					$(tdDelete).click(function (){
						var idDel = $(this).attr("title");
						deletePerson(idDel);
						displayTableFromJson();
					});
					$("#table").append(trTag);
				};
			});
		});
		return jsonObject;
	}
	function editPerson(valueOfIdToEdit){
		var valueOfIdToEdit=valueOfIdToEdit;
		var nameToMdify=$("#nameMod").val();
		var firstNameToModify=$("#firstNameMod").val();
		var ageToModify=$("#ageMod").val();
		var jsonObject=modifyPersonOnJson(nameToMdify, firstNameToModify, ageToModify, valueOfIdToEdit);
		displayTableFromJson();
	}
	function fillObjectJson(element){
		var element =$("#person");
		elmtSequence++;
		element.each(function(){
		record={};
		record ["id"]= elmtSequence,
		record ["name"] = $("#name").val(),
		record ["firstName"]= $("#firstname").val(),
		record ["age"]=$("#age").val()
		jsonObject.persons.push(record);
		});
		return jsonObject;
	}
	function createPersonOnJson(){
		fillObjectJson();
		displayTableFromJson();
		return jsonObject;	
	}
	function sortResults(prop, asc) {
		var obj=JSON.stringify(jsonObject);
		var asc=asc;
	    jsonObject.persons.sort(function(a, b) {
	    	if(!$.isNumeric(a[prop])){
	    		a[prop]=a[prop].toLowerCase();
		    	b[prop]=b[prop].toLowerCase();
		    	if (asc == "asc") {
		    		if(a[prop] > b[prop]) return 1;
		    		else return -1;
		    	}
		    	
		        else {
		        	if (b[prop] > a[prop]) return 1;
		        	else return -1;
		        }
	    	}
	    	else {
	    		if (asc == "asc") return (a[prop] - b[prop]);
		        else return (b[prop] - a[prop]);
	    	}
	    
	    });
		displayTableFromJson();
	    return jsonObject;
	}
	editPersonDialog = $("#formEdit").dialog({
		 autoOpen: false,
		 height: 400,
		 width: 350,
		 modal: true,
		 buttons: {
		    "Valider Modif": function(){
			    var editVal=$(this).data('id');
			    editPerson(editVal);
		        editPersonDialog.dialog( "close" ); 
			},
		    Annuler: function() {
			   editPersonDialog.dialog( "close" );
			}
		},
		    close: function() {
		    }
     });
	$("#ok").click(function (){
		createPersonOnJson();
	})
	$("#id").click(function(){
		if(testId){
			$("#identifierDescendant").show();
			$("#identifierAscendant").hide();
			$("#idNameDescendant").hide();
			$("#idNameAscendant").hide();
			$("#idFirstNameAscendant").hide();
			$("#idFirstNameDescendant").hide();
			$("#idAgeAscendant").hide();
			$("#idAgeDescendant").hide();
			var prop="id";
		    var asc="desc";
		    sortResults(prop, asc);
		    testId=false;
		}
		else {
			$("#identifierAscendant").show();
			$("#identifierDescendant").hide();
			$("#idFirstNameAscendant").hide();
			$("#idFirstNameDescendant").hide();
			$("#idNameDescendant").hide();
			$("#idNameAscendant").hide();
			$("#idAgeAscendant").hide();
			$("#idAgeDescendant").hide();
			var prop="id";
			var desc="asc";
			sortResults(prop, desc);
			testId=true;
		}
	});
	$("#main").click(function(){
		console.log("inside name");
		if(testName){
			$("#idNameDescendant").show();
			$("#idNameAscendant").hide();
			$("#identifierDescendant").hide();
			$("#identifierAscendant").hide();
			$("#idFirstNameAscendant").hide();
			$("#idFirstNameDescendant").hide();
			$("#idAgeAscendant").hide();
			$("#idAgeDescendant").hide();
			var prop="name";
			var asc="desc";
			sortResults(prop, asc);
			testName=false;
		}
		else{
			$("#idNameAscendant").show();
			$("#idNameDescendant").hide();
			$("#identifierDescendant").hide();
			$("#identifierAscendant").hide();
			$("#idFirstNameAscendant").hide();
			$("#idFirstNameDescendant").hide();
			$("#idAgeAscendant").hide();
			$("#idAgeDescendant").hide();
			var prop="name";
			var desc="asc";
			sortResults(prop, desc);
			testName=true;
		}
	});
	$("#firstName").click(function(){
		if(testFirstName){
			$("#idFirstNameDescendant").show();
			$("#idFirstNameAscendant").hide();
			$("#identifierDescendant").hide();
			$("#identifierAscendant").hide();
			$("#idNameAscendant").hide();
			$("#idNameDescendant").hide();
			$("#idAgeAscendant").hide();
			$("#idAgeDescendant").hide();
			var prop="firstName";
			var desc="desc";
			sortResults(prop, desc);
			testFirstName=false;
		}
		else {
			$("#idFirstNameAscendant").show();
			$("#idFirstNameDescendant").hide();
			$("#identifierDescendant").hide();
			$("#identifierAscendant").hide();
			$("#idNameAscendant").hide();
			$("#idNameDescendant").hide();
			$("#idAgeAscendant").hide();
			$("#idAgeDescendant").hide();
			var prop="firstName";
			var desc="asc";
			sortResults(prop, desc);
			testFirstName=true;
		}
		
	});
	$("#tableAge").click(function(){
		console.log("inside age");
		if(testAge){
			$("#idAgeAscendant").show();
			$("#idAgeDescendant").hide();
			$("#idFirstNameAscendant").hide();
			$("#idFirstNameDescendant").hide();
			$("#identifierDescendant").hide();
			$("#identifierAscendant").hide();
			$("#idNameAscendant").hide();
			$("#idNameDescendant").hide();
			var prop="age";
			var desc="asc";
			sortResults(prop, desc);
			testAge=false;
		}
		else {
			$("#idAgeDescendant").show();
			$("#idAgeAscendant").hide();
			$("#idFirstNameAscendant").hide();
			$("#idFirstNameDescendant").hide();
			$("#identifierDescendant").hide();
			$("#identifierAscendant").hide();
			$("#idNameAscendant").hide();
			$("#idNameDescendant").hide();
			var prop="age";
			var desc="desc";
			sortResults(prop, desc);
			testAge=true;
		}
	});
	var form =$("#formEdit");
});