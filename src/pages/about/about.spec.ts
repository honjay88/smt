import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { AboutPage } from './about';
 
let fixture: ComponentFixture<AboutPage> = null;
let instance: any = null;

describe('AboutPage', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([AboutPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    //instance.clicker = new ClickerMock();
  })));
 
 
  afterEach(() => {
    fixture.destroy();
  });

  it('should create About', () => {
    expect(fixture).toBeTruthy();
    expect(instance).toBeTruthy();
    expect(instance).not.toBeNull();
  });

  
});

 if (navigator.userAgent.match(/firefox/i)) {
  describe('Firefox tests', function() {
    it('this would only be reported when printFirstSuccess is true', function() {
      console.log('firefox test');
    });
  });
}
 
describe('Other tests', function() {
  it('this should be always reported', function() {
    console.log('hello world');
  });
});