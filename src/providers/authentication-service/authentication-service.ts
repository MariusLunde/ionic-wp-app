import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthenticationService {

    constructor(
        public http: Http
    ){}

}
