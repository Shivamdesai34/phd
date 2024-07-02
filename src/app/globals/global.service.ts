import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public customVariable = new BehaviorSubject<any>({
        Mobile: 0
    });
}
