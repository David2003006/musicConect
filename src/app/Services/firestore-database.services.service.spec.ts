import { TestBed } from '@angular/core/testing';

import { FirestoreDatabaseService } from './firestore-database.services';

describe('FirestoreDatabaseServicesService', () => {
  let service: FirestoreDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
