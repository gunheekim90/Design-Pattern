

function CarMaker(){};

CarMaker.prototype.drive = function() {
	return "Vroom, I have " + this.doors + " doors!";
};
CarMaker.factory = function(type){
	var constr = type,
	newcar;

	if(typeof CarMaker[constr] !== "function"){
		throw{
			name : "Error",
			message : constr + " doesn't exit"
		};
	}

	//생성자를 확인했으니 부모를 상속하고 그 상속은 한번만 일어나기 위해 전에 drive 프로토 함수를 상속했는지 체크
	if(typeof CarMaker[constr].prototype.drive !== "function"){
		CarMaker[constr].prototype = new CarMaker();
	}

	newcar = new CarMaker[constr]();

	return newcar;

};

CarMaker.Compact = function(){
	this.doors = 4;
}

CarMaker.Convertible = function(){
	this.doors = 2;
}

CarMaker.SUV = function(){
	this.doors = 6;
}

var corolla = CarMaker.factory('Compact');
var solstice = CarMaker.factory('Convertible');
var cherokee = CarMaker.factory('SUV');
corolla.drive();
solstice.drive();
cherokee.drive();