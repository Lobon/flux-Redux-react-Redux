//flux实现
import $ from 'jquery';

var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

let data = {
	inputVal:0,
	minVal : 0,
	maxVal : 1000
};

AppDispatcher.register(function (action) {
  switch(action.type){
		case "increase" : 
			data[action.state]=increaseVal(data[action.state],1);
			updateInputVal();
			break;
		case "decrease" : 
			data[action.state]=decreaseVal(data[action.state],1);
			updateInputVal();
			break;
		default : 
			break;
	}
})

const increaseVal = function(val,step){
	return val+step > data.maxVal ? data.maxVal : val+step;
}

const decreaseVal = function(val,step){
	return val-step < data.minVal ? data.minVal : val-step;
}

const updateInputVal = function(){
	$("#example").children('input').val(data.inputVal);
}

const action = function(){
	var thisT = this.attr("data-t");
	AppDispatcher.dispatch({
      type: thisT,
      state : "inputVal"
    });
}

$("#example").delegate("a","click",function(){
	action.apply($(this));
});

updateInputVal();