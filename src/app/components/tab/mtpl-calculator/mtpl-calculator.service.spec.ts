import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MtplCalculatorService } from './mtpl-calculator.service';

describe('MtplCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: MtplCalculatorService = TestBed.get(MtplCalculatorService);
    expect(service).toBeTruthy();
  });
});
