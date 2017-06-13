function radio(){

	  var val1=document.getElementsByName("oradio");
	  var val2=document.getElementById("id1");
	  for (var i=0; i < val1.length; i++)
	  {
	    if (val1[i].checked){
	    	
	    	cacher("texte1");
	    	return true;
	  }
//	    	alert("selectionnez votre sexe");
	  		afficher("texte1");
	  		return false;
	 
	}
	}

	function reinit(oForm){
		var elemt=oForm.elements;
		oForm.reset();
		for(i=0; i<elemt.length; i++){
		
		if(elemt[i].value!="valider" && elemt[i].value!="reinitialiser"){
			elemt[i].value="";
			
		
		}
		}
		for(i=1; i<=4; i++){
			cacher("texte"+i);
		}


	}

	function surligne(champ, erreur)
	{
		
	   if(erreur){
		   	champ.style.borderColor = "red";
	    	champ.style.borderSize="2px";
	    	
	    	
	   }
	   else{
	        champ.style.borderColor = "green";
	     	champ.style.borderSize="2px";}

	}
	function afficher(id){
		
		{
		    if(document.getElementById(id).style.display=="none")
		    {
		        document.getElementById(id).style.display="inline";
		    }
		  
		    return true;
		}
	}

	function cacher(id){
		
		
		    if(document.getElementById(id).style.display=="inline")
		    {
		        document.getElementById(id).style.display="none";
		       // document.getElementById(id).innerHTML='Cacher le texte';
		    }
		    
		    return true;
		
	}
	function verifNom(){
		
		   var val2=document.getElementById("id2");
		   
		   if(val2.value.length <2 || val2.value.length > 20 ){
			   surligne(val2, true);
			   afficher("texte2");
			
			   return false;
		   }
		   else {
			   surligne(val2, false);
			   cacher("texte2");

			   return true;
		   }
	}
	function verifPrenom(){
		
		   var val3=document.getElementById("id3");
		   
		   if(val3.value.length < 2 || val3.value.length > 20 ){
			   surligne(val3, true);
			   afficher("texte3");
			   return false;
		   }
		   else {
			   surligne(val3, false);
			   cacher("texte3");

			   return true;
		   }
	}
	function verifAge(){
		
			
		   var val4=document.getElementById("id4");
		   
		   if(val4.value <10 || val4.value > 100 ){
			   surligne(val4, true);
			   afficher("texte4");
			   return false;
		   }
		   else {
			   surligne(val4, false);
			   cacher("texte4");
			   return true;
		   }
	}

	function validate(){
		var val1=document.getElementsByName("oradio");
		var ageOk=verifAge();
		var verifPrenomOk=verifPrenom();
		var verifNomOk=verifNom();
		var radioOk=radio();
		if(ageOk==true && verifPrenomOk==true && verifNomOk==true && radioOk==true){
			return true;
			
		}
		else {
			
			alert("renseignez tous les champs svp");
			return false;
		}

	}