import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/User.model';
import * as firebase from 'firebase';
import { Social } from '../util/Social';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private storage: AngularFireStorage,
        private fbAuth: AngularFireAuth,
        private fbDatabase: AngularFireDatabase) { }

    public getUser(idUser: string): Promise<User> {
        return new Promise((resolve) => {
            this.fbDatabase.object(`/usuarios/${idUser}`).valueChanges().subscribe((user: User) => resolve(user));
        });
    }

    public savePhoto(photo: string, idUser: string) {
        return this.storage.ref(`/profile_photo/${idUser}`).putString(photo, "data_url");
    }

    public createUser(user: User): Promise<User> {
        return this.fbAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(data => {
            user.id = data.user.uid;
            this.fbDatabase.database.ref(`/usuarios/${user.id}`).set(user);
            return user;
        });
    }

    public getPhoto(idUser: string): Promise<string> {
        const storageRef = this.storage.storage.ref().child(`/profile_photo/${idUser}`);
        return storageRef.getDownloadURL().then(url => url).catch(error => "");
    }

    public doLogin(correo: string, password: string): Promise<User> {
        return this.fbAuth.auth.signInWithEmailAndPassword(correo, password).then(data => {
            let user = new User();
            user.id = data.user.uid;
            user.email = data.user.email;

            const promiseToken = data.user.getIdToken().then(r => {
                user.token = r;
            });

            const promisePhoto = this.getPhoto(user.id).then(url => {
                user.foto = url
            }).catch(() => {
                user.foto = "";
            });

            const promiseUser = this.getUser(user.id).then((userBD: User) => {
                user.nombre = `${userBD.nombre} ${userBD.apellido}`;
            });

            return Promise.all([promisePhoto, promiseUser, promiseToken]).then(() => {
                return user;
            });
        });
    }

    public signOut(): Promise<any> {
        return this.fbAuth.auth.signOut();
    }

    loginWithFacebook(): Promise<User> {

        return new Promise((resolve, reject) => {
            this.fbAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(userFB => {
                let user = new User();

                return this.fbAuth.auth.signInAndRetrieveDataWithCredential(userFB.credential).then(data => {
                    user.id = data.user.uid;
                    user.nombre = data.user.displayName;
                    user.foto = data.user.photoURL;
                    user.email = data.user.email;
                    user.social = Social.FACEBOOK;

                    this.getUser(user.id).then(userBD => {
                        if (!userBD) {
                            this.fbDatabase.database.ref(`/usuarios/${user.id}`).set(user);
                            resolve(user);
                        }
                        else {
                            this.getPhoto(user.id).then(photo => {
                                user.foto = photo;
                                resolve(user);
                            });
                        }
                    });
                });
            });
        });
    }

    getAlltokens() {
        return this.fbDatabase.list("/fcmTokens").valueChanges();
    }


}
