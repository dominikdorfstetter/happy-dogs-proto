import { MarkerService } from '@shared/services/marker.service';

describe('MarkerService', () => {
  let markerS: MarkerService;

  beforeEach(() => {
    markerS = new MarkerService();
  });

  it('should be defined', () => {
    expect(markerS).toBeDefined();
  });
});
