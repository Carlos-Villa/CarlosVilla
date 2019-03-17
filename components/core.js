let Codesign = class Codesign{

	add(element){

		customElements.define(

			element.name,
			element.instance

		);

	}

	load_file(path){
		return fetch(path).then((res)=> {
			return res.text();
		});
	}

}

export {Codesign};