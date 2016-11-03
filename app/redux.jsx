//Redux实现

import $ from 'jquery';
import {createStore} from 'redux';

let data = {
	inputVal:0,
	minVal : 0,
	maxVal : 1000
};


const updateData = function(state,action){
	switch(action.type){
		case "increase" : 
			state[action.state]=increaseVal(state[action.state],1);
			return state;
		case "decrease" : 
			state[action.state]=decreaseVal(state[action.state],1);
			return state;
		default : 
			return state;
	}
}

const store = createStore(updateData,data);

store.subscribe(function(action){
	updateInputVal(store.getState()['inputVal']);
});


const increaseVal = function(val,step){
	return val+step > data.maxVal ? data.maxVal : val+step;
}

const decreaseVal = function(val,step){
	return val-step < data.minVal ? data.minVal : val-step;
}

const updateInputVal = function(val){
	$("#example").children('input').val(val);
}

const action = function(){
	var thisT = this.attr("data-t");
	store.dispatch({
		type:thisT,
		state : "inputVal"
	})
}

$("#example").delegate("a","click",function(){
	action.apply($(this));
});

updateInputVal(data.inputVal);
