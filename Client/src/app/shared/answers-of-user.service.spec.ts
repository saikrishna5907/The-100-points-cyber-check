import { TestBed } from '@angular/core/testing';

import { AnswersOfUserService } from './answers-of-user.service';

describe('AnswersOfUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnswersOfUserService = TestBed.get(AnswersOfUserService);
    expect(service).toBeTruthy();
  });
});
