import { Injectable } from '@angular/core';
import * as Config from '../../config';


import {Settings} from "../../shared/providers/settings/settings";
import {HttpClient} from "@angular/common/http";



@Injectable()
export class AuthenticationService {

    constructor(
        public settings: Settings,
        public http: HttpClient,
    ){}


    setUser(user){
        return this.settings.set('User', user);
    }

    getUser(){
        return this.settings.get('User');
    }


    logOut(){
        return this.settings.set('User', undefined);
    }

    doLogin(username, password){
        return this.http.post(Config.WORDPRESS_URL + '/wp-json/aam/v1/authenticate',{
            username: username,
            password: password
        })
    }

    doRegister(user_data, token){
        return this.http.post(Config.WORDPRESS_REST_API_URL + 'users?token=' + token, user_data);
    }

    validateAuthToken(token){
        let header : Headers = new Headers();

        // header.append('Content-Type',  'application/json');

        header.append('Authorization','Basic ' + token);

        console.log(header);

        return this.http.post(Config.WORDPRESS_URL + '/wp-json/jwt-auth/v1/token/validate',
            { header: header }, { responseType: 'text' });
    }
}