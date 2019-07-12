var budgetController = (function(){
	var x = 23;

	var add = function(a) {
		return x + a;
	}

	return {
		publicTest: function(b) {
			return add(b);
		}
	}
})();

var UIController = (function() {

	//
	//
})();


var controller = (function (budgetCtrl, UICtrl) {

	var y = budgetCtrl.publicTest(5);

	return {
		anotherPublic: function() {
			console.log(y);
		}
	}

})(budgetController, UIController);