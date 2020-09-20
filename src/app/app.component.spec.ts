import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EmptyComponent } from './empty/empty.component';
import { toControlDefinitions } from './extensions';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, EmptyComponent],
            imports: [FormsModule, ReactiveFormsModule],
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should generate a set of 7 test objects', () => {
        expect(component.samples.length).toBe(7);

        const areObjectsPresent = component.samples.every((o) => o !== undefined);
        expect(areObjectsPresent).toBeTrue();
    });

    it('should not render controls if there are no object values', () => {
        component.currentObject = {};
        fixture.detectChanges();
        expect(component.isEmpty).toBeTrue();

        const emptySvg = fixture.debugElement.query(By.css('app-empty'));
        expect(emptySvg).not.toBeNull();
    });

    it('should regenerate form controls when a new object gets selected', () => {
        spyOn(component, 'ngOnInit');
        const sample = { a: 5 };
        component.selectSampleObject(sample);
        fixture.detectChanges();

        expect(component.ngOnInit).toHaveBeenCalled();
        expect(component.currentObject).toEqual(sample);
        expect(component.form.get('a')).toBeDefined();
        expect(component.form.get('a').value).toBe(5);
    });

    it('should resolve a boolean type control', () => {
        const o = { a: true };
        const def = toControlDefinitions(o);
        expect(component.isBoolean(def[0])).toBeTrue();
    });

    it('should resolve a number type control', () => {
        const o = { a: 5 };
        const def = toControlDefinitions(o);
        expect(component.isNumber(def[0])).toBeTrue();
    });

    it('should resolve a text type control', () => {
        const o = { a: 'aaa' };
        const def = toControlDefinitions(o);
        expect(component.isText(def[0])).toBeTrue();
    });
});
