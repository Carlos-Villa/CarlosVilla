/**
 * @version 1.0.1
 * @package main
 * @author CarlosVilla
 * @since 2018-12-27
 * @see 2018-12-27
 */
import {App} from './app.js';

(() => {

	'use strict';

	window.onerror = (msg, url, lineNo, columnNo, error) =>{
		
		let err = {message:msg,url:url,line:lineNo,column: columnNo,object:error};

		console.log(err);
		return true;
	};

})();