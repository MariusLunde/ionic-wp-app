import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import {ServiceProvider} from "../../providers/service/service";
import {AuthenticationService} from "../../providers/authentication-service/authentication-service";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    login_form: FormGroup;
    error_message: string;


    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public formBuilder: FormBuilder,
        public service: ServiceProvider,
        public authenticationService: AuthenticationService,
    ) {}

    ionViewWillLoad() {
        this.login_form = this.formBuilder.group({
            username: new FormControl('', Validators.compose([
                Validators.required
            ])),
            password: new FormControl('', Validators.required)
        });
    }

    login(value){
        let loading = this.loadingCtrl.create();
        loading.present();

        this.authenticationService.doLogin(value.username, value.password)
            .subscribe(res => {
                console.log('foo');
                    this.authenticationService.setUser({
                        token: value.token,
                        username: value.username,
                        displayname: value.user_display_name,
                        email: value.user_email
                    });

                    loading.dismiss();
                    this.navCtrl.setRoot(HomePage);
                },
                err => {
                    loading.dismiss();
                    this.error_message = "Invalid credentials. Try with username 'aa' password 'aa'.";
                    console.log(err);
                })
    }

    skipLogin(){
        this.navCtrl.setRoot(HomePage);
    }
    //
    // goToRegister(){
    //     this.navCtrl.push('RegisterPage');
    // }

}