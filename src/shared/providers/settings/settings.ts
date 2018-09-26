import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

/**
 * DigiSpace Settings Provider
 *
 * A simple settings/config class for storing key/value pairs with persistence.
 *
 * Author: Bjørn Danielsen <bjorn@digispace.no>
 * License: UNLICENCED (proprietary)
 *
 * Instructions:
 *
 * Add the export code below to your app.module.ts file, and include it in the "providers"
 * section like this:

  {provide: Settings, useFactory: provideSettings, deps: [Storage, Database]}

 *
 * Export code (placed before the @NgModule() in app.module.ts
 *

 export function provideSettings(storage: Storage) {
    //
    // The Settings provider takes a set of default settings for your app.
    //
    // You can modify default settings at any time. Once the settings are saved,
    // these values will not overwrite the saved values (this can be done manually if desired).
    //

    return new Settings(storage, defaultSettings);
 }

 *
 * To make the settings available to all subsequently loaded pages, it must be
 * imported in the app.compopnent.ts file and included in the constructor there
 * as _public_. (public storage: Storage)
 *
 * When you want to load the current settings call settings.load() (only once);
 *
 * You can use settings.ready().then() to ensure code is only run after
 * current settings has been successfully loaded.
 *
 */
@Injectable()
export class Settings {

    private SETTINGS_KEY: string = '_settings';

    private settings: any = null;
    private _defaults: any = null;

    public settingsLoaded: boolean = false;
    public ready: Promise<any> = null;

    /**
     * Settings constructor
     */
    constructor(public storage: Storage, defaults: any) {
        this._defaults = defaults ? defaults : {};

        this.ready = new Promise((resolve, reject) => {
            // Always load settings right away!
            this.load().then(() => {
                console.log("Settings: Loaded");
                this.settingsLoaded = true;
                resolve(true);
            }).catch((err) => {
                console.error("Settings: Failed to load settings!");
                console.dir(err);
                reject(err);
            });
        });

    }

    /**
     * Load current settings from storage
     */
    public load() {
        let thisInstance = this;
        return new Promise((resolve, reject) => {
            this.storage.get(this.SETTINGS_KEY).then((allSettings) => {
                // Check for saved settings
                if (allSettings) {
                    this.settings = allSettings;
                    this._mergeDefaults(this._defaults);
                } else {
                    // No stored settings found, load default settings
                    this.settings = this._defaults;
                    this.save();
                }
                resolve(this.settings);

            }).catch((err) => {
                // Something went wrong
                console.error("Failed to get settings from storage!");
                console.dir(err);
                reject(err);
            });
        });
    }

    /**
     * Merge two sets of settings
     *
     * @param defaults Object Default data.
     */
    private _mergeDefaults(defaults: any) {
        for (let k in defaults) {
            if (!(k in this.settings)) {
                this.settings[k] = defaults[k];
            }
        }
        return this.save();
    }

    /**
     * Merge supplied settings object with saved settings
     *
     * @param settings Object
     */
    public merge(settings: any) {
        for (let key in settings) {
            this.settings[key] = settings[key];
        }
        return this.save();
    }

    /**
     * Set or change a setting
     *
     * @param key string
     * @param value any
     */
    public set(key: string, value: any) {
        this.settings[key] = value;
        return this.save();
    }

    public delete(key: string) {
        delete this.settings[key];
        return this.save();
    }

    /**
     * Overwrite current settings with new set
     *
     * @param settings Object
     */
    public setAll(settings: any) {
        this.settings = settings;
        return this.save();
    }

    /**
     * Retrieve current value for a key/setting
     *
     * @param key string
     */
    public get(key: string) {
        return this.settings[key];
    }

    /**
     * Save current settings to storage
     *
     * This command is automatically run by the set and merge functions
     * TODO: Make this function private.
     */
    public save() {
        return this.storage.set(this.SETTINGS_KEY, this.settings);
    }

    /**
     * Retrieve all settings
     *
     * Returns a complete list of changes
     */
    public getAll() {
        return this.settings;
    }
}
