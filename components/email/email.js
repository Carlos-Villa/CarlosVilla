import * as gmail from 'https://apis.google.com/js/client.js';
import { Codesign,Storage, Html, F, Platform } from '../../app/lib/core.js';
import { NormalButton, LinkButton } from '../buttons/buttons.js'; 
import { NormalModal } from '../modals/modals.js'; 

let codesign = new Codesign();

let Email = class Email extends Html {

	constructor(){
		super();
		this.platform = Storage.get('platform');
		this.gapi = gapi;
		this.client_id = '968154215002-1f40mjehe5lq8vn1pc8jt17u7hs6dg0i.apps.googleusercontent.com';
		this.api_key = 'AIzaSyC44o3BcBnobjl4Wz1XTpOHfUYryyqdTNk';
		this.scopes = 'https://www.googleapis.com/auth/gmail.send';

	}

	async connectedCallback(){

		const template = await codesign.load_file('./components/email/email.html');
		const shadowRoot = this.attachShadow({mode: 'open'});
		let parser = new DOMParser();
		let doc = parser.parseFromString(template, "text/html");
		const templ = doc.querySelector('#gmail-compose');
		const instance = templ.content.cloneNode(true);
		shadowRoot.appendChild(instance);
		//codesign.check_load('app-gmail');
		
		Platform.ready().then((platform)=>{
			if(platform.ready){
				this.init();
			}
		});

	}

	check_auth(self){
		
		let t = self.gapi.auth.authorize(
			{

				client_id: self.client_id,
				scope: self.scopes,
				immediate: true

			},
			(auth_result)=>{
				self.handle_auth_result(auth_result,self)
			}
        );

	}

	handle_auth_click(self) {
		self.gapi.auth.authorize(
			{
				client_id: self.client_id,
				scope: self.scopes,
				immediate: false
			},
			(auth_result) =>{
				self.handle_auth_result(auth_result,self)
			}
		);
		return false;
	}

	handle_auth_result(auth_result,self) {
		
		if(auth_result && !auth_result.error) {
			//loadGmailApi();
			//$('#authorize-button').remove();
			//$('.table-inbox').removeClass("hidden");
			//$('#compose-button').removeClass("hidden");
		} else {
			//$('#authorize-button').removeClass("hidden");
			//$('#authorize-button').on('click', () => {
			//	self.handle_auth_click(self);
			//});
		}
	}

	init(){
		let self = this;
		let interval = false;
		
		interval = setInterval(function(){

			if(this.gapi.client)
			{
				clearInterval(interval);
				self.gapi.client.load('gmail', 'v1', ()=>{});
		        self.gapi.client.setApiKey(self.api_key);
		        window.setTimeout(self.check_auth(self), 1);
		        let m = self.shadowRoot.children[1].shadowRoot.querySelector('#compose-modal form');
		        
		        self.shadowRoot.children[1].shadowRoot.querySelector('#compose-modal form').addEventListener('submit',(e)=>{

		        	e.preventDefault();
		        	self.send_email(self);
		        });
			}
		},1000);
		
	}

	send_email(self)
	{
		codesign.$('#send-button').classList.add('disabled');

		let res = self.send_message(
			{
				'To': codesign.$('#compose-to').value,
				'Subject': codesign.$('#compose-subject').value
			},
			codesign.$('#compose-message').value,
			self.compose_tidy,
			self
		);
		console.log(res);
		return false;
	}

	compose_tidy()
	{
		//codesign.$('#compose-modal').modal('hide');
		//$('#compose-to').val('');
		//$('#compose-subject').val('');
		//$('#compose-message').val('');
		//$('#send-button').removeClass('disabled');
	}

	send_message(headers_obj, message, callback,self)
	{
		let email = '';

		for(let header in headers_obj)
			email += header += ": "+headers_obj[header]+"\r\n";
		
		email += "\r\n" + message;
		console.log(self,self.gapi.client);
		let send_request = self.gapi.client.gmail.users.messages.send(
			{
				'userId': 'me',
				'resource': {
					'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
				}
			}
		);

		return send_request.execute(callback);
	}
}

codesign.add({

	name:'app-gmail',
	instance:Email,
	preload:false

});

export { Email };