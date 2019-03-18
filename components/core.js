let Codesign = class Codesign{

	add(element){

		customElements.define(

			element.name,
			element.instance

		);

	}

	load_file(path,type){
		return fetch(path).then((res)=> {
			return type == 'blob' ? res.blob() : ( type == 'json' ? res.json() : res.text());
		});
	}

	base64_to_blob(data,opts){

	    let raw = atob(data);
	    let rawLength = raw.length;
	    let array = new Uint8Array(rawLength);

	    for(let i = 0; i < rawLength; i++) {
	      array[i] = raw.charCodeAt(i);
	    }

	    let blob = new Blob([array], opts);
	    return URL.createObjectURL(blob);
	}

	utf8_blob(data,opts){
		console.log(data, data.length);
		
	    let rawLength = data.length;
	    let array = new Uint8Array(rawLength);

	    for(let i = 0; i < rawLength; i++) {
	      array[i] = data.charCodeAt(i);
	    }

	    let blob = new Blob([array], opts);
	    return URL.createObjectURL(blob);
	}
}

export {Codesign};