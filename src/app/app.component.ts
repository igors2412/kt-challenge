import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { toControlDefinitions } from './extensions';
import { IControlDefinition } from './models';
import * as TestObjects from './test-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    form: FormGroup;
    controlDefinitions: IControlDefinition[];

    ngOnInit(): void {
        this.controlDefinitions = toControlDefinitions(TestObjects.T7);
        this.form = new FormGroup(this.generateControls(this.controlDefinitions));
    }

    private generateControls(controlDefinitions: IControlDefinition[]): { [key: string]: AbstractControl } {
        return controlDefinitions.reduce((acc, cd) => {
            acc[cd.id] = new FormControl(cd.value);
            return acc;
        }, {});
    }

    isBoolean(def: IControlDefinition): boolean {
        return def.type === 'boolean';
    }

    isText(def: IControlDefinition): boolean {
        return def.type === 'string';
    }

    isNumber(def: IControlDefinition): boolean {
        return def.type === 'number' || def.type === 'bigint';
    }
}
