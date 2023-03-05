import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCryptoSalesDetailsPage } from './list-crypto-sales-details.page';

describe('ListCryptoSalesDetailsPage', () => {
  let component: ListCryptoSalesDetailsPage;
  let fixture: ComponentFixture<ListCryptoSalesDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCryptoSalesDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCryptoSalesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
