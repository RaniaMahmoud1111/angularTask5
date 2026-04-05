import { TestBed } from '@angular/core/testing';

import { StaticCategories } from './static-categories';

describe('StaticCategories', () => {
  let service: StaticCategories;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticCategories);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
