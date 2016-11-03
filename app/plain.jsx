//简单的写法
import $ from 'jquery';

let data = {
	inputVal:0,
	minVal : 0,
	maxVal : 1000
};

const updateData = function(state,type){
	switch(type){
		case "increase" : 
			data[state]=increaseVal(data[state],1);
			updateInputVal();
			break;
		case "decrease" : 
			data[state]=decreaseVal(data[state],1);
			updateInputVal();
			break;
		default : 
			break;
	}
}


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
	updateData("inputVal",thisT)
}


$("#example").delegate("a","click",function(){
	action.apply($(this));
});

updateInputVal();