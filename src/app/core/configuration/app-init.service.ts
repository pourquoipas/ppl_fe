import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor() { }
// TODO Verifica come inizializzare qui tutte le cose che ti servono (ad esempio ConfigService)
// Hint segui la strada di APP_INITIALIZER
  Init() {
 
        return new Promise<void>((resolve, reject) => {
            console.log("AppInitService.init() called");
            ////do your initialisation stuff here  
            setTimeout(() => {
                console.log('AppInitService Finished');
                resolve();
            }, 6000);
 
        });
    }
}
