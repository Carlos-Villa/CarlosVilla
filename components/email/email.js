import * as gmail from 'https://apis.google.com/js/client.js';
import { Codesign,Storage, Html, F, Platform, Modals} from '../../app/lib/core.js';
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
		        let m = self.shadowRoot.children[1].shadowRoot.querySelector('#compose-modal');

		        let email_modal = F.$(m).modal({
					cancel: (e) =>{
						email_modal.hide();
					},
					confirm:(e) =>{

						self.send_email({
							to: F.$('#compose-to',m.querySelector('form-control').shadowRoot),
							subject: F.$('#compose-subject',m.querySelector('form-control').shadowRoot),
							message: F.$('#compose-message',m.querySelector('form-control').shadowRoot),
							btn: e.target,
							context: self
						});
					}
				});
		        Modals.email_modal = email_modal;
		        
			}
		},1000);
		
	}

	send_email({to,subject,message,btn,context})
	{

		btn.classList.add('disabled');

		let res = context.send_message(
			{
				'To': to.val(),
				'Subject': subject.val()
			},
			message.val(),
			context.compose_tidy(btn,subject,message,to),
			context
		);
		return false;
	}

	compose_tidy(btn,subject,message,to)
	{
		Modals.email_modal.hide();
		to.val('');
		subject.val('');
		message.val('');
		btn.classList.remove('disabled');
	}

	send_message(headers_obj, message, callback,context)
	{
		let email = '';

		for(let header in headers_obj)
			email += header += ": "+headers_obj[header]+"\r\n";
		
		email += "\r\n" + message;
		
		let send_request = context.gapi.client.gmail.users.messages.send(
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