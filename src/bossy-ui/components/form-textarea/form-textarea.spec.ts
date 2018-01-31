/*
import {async} from '@angular/core/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {BossyFormTextareaComponent} from './form-textarea.component';
import {BossyFormTextareaConfig} from './form-textarea.config';

let textArea: BossyFormTextareaComponent;
let fixture: ComponentFixture<BossyFormTextareaComponent>;
let de: DebugElement;
let el: HTMLElement;
let tael: HTMLTextAreaElement;
let superConfig: BossyFormTextareaConfig;

describe('Unit tests for textArea component: ', () => {
  describe('the text area component', () => {
      const textIsolatedArea = new BossyFormTextareaComponent();
      it('should set default status to None', () => {
          expect(textIsolatedArea.status).toEqual('none');
      });
  });
  describe('Testbed to check proper assignment of config values to template', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [BossyFormTextareaComponent],
      })
        .compileComponents(); // compile template and css
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(BossyFormTextareaComponent);
      textArea = fixture.componentInstance;
      superConfig = new BossyFormTextareaConfig({
        name: 'testName',
        label: 'Comments',
        rows: 5,
        cols: 2,
        placeholder: 'Put your comment here'
      });
      textArea.config = superConfig;
      textArea.ngOnInit();
      fixture.detectChanges();
    });

    it('Label', () => {
      de = fixture.debugElement.query(By.css('label'));
      el = de.nativeElement;
      expect(el.innerHTML).toContain('Comments');
    });
    it('Name', () => {
      de = fixture.debugElement.query(By.css('textarea'));
      tael = de.nativeElement;
      expect(tael.name).toEqual('testName');
    });
    it('Placeholder', () => {
      de = fixture.debugElement.query(By.css('textarea'));
      tael = de.nativeElement;
      expect(tael.placeholder).toEqual('Put your comment here');
    });
    it('Rows', () => {
      de = fixture.debugElement.query(By.css('textarea'));
      tael = de.nativeElement;
      expect(tael.rows).toEqual(5);
    });
    it('Cols', () => {
      de = fixture.debugElement.query(By.css('textarea'));
      tael = de.nativeElement;
      expect(tael.cols).toEqual(2);
    });
  });
});
*/
