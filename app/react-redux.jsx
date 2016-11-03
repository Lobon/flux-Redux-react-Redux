//react-Redux 实现
import React from "react";
import ReactDom from "react-dom";
import {createStore} from 'redux'
import {connect,Provider} from 'react-redux';

let data = {
	inputVal:0,
	minVal : 0,
	maxVal : 1000
};


//ui组件部分
const Increase = React.createClass({
	render : function(){
		return (<a href="javascript:void(0);" onClick={this.props.increaseVal}>+</a>);
	}
});


const Decrease = React.createClass({
	render : function(){
		return (<a href="javascript:void(0);" onClick={this.props.decreaseVal}>-</a>);
	}
});

const Input = React.createClass({
	render : function(){
		return (<input type="text" disabled value={this.props.inputVal}/>);
	}
});
//ui组件部分结束

//组件容器
const IncreaseConnect = connect(function(state,props){
	return state;
},function(dispatch,props){
	return {
		increaseVal : function(){
			dispatch({
				type:"increase",
				state : "inputVal"
			})
		}
	}
},function(stateProps, dispatchProps, parentProps){
	return Object.assign({},parentProps,stateProps,dispatchProps);
	withRef : true
})(Increase);

const DecreaseConnect = connect(function(state){
	return state;
},function(dispatch,props){
	return {
		decreaseVal : function(){
			dispatch({
				type:"decrease",
				state : "inputVal"
			})
		}
	}
})(Decrease);

const InputConnect = connect(function(state){
	return state;
})(Input);
//组件容器结束


//功能函数
const increaseVal = function(val,step){
	return val+step > data.maxVal ? data.maxVal : val+step;
}

const decreaseVal = function(val,step){
	return val-step < data.minVal ? data.minVal : val-step;
}
//功能函数结束

//Reducer
const updateData = function(state,action){
	var newState = Object.assign({},state)
	switch(action.type){
		case "increase" : 
			newState[action.state]=increaseVal(newState[action.state],1);
			return newState;
		case "decrease" : 
			newState[action.state]=decreaseVal(newState[action.state],1);
			return newState;
		default : 
			return newState;
	}
}

const store = createStore(updateData,data);

ReactDom.render(
	(<Provider store={store}>
		<div>
			<IncreaseConnect/>
			<InputConnect />
			<DecreaseConnect />
		</div>
	</Provider>),
	document.getElementById("example")
);

