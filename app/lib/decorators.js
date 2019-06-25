let ReadOnly = class ReadOnly{

	constructor(target,key,descriptor){
		descriptor.writable = false;
		return descriptor;
	}

};

const Component = ({kind}) =>{
	console.log('TEST DECORATORS');
};

export {ReadOnly, Component};