import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CityServiceProxy, ListResultDtoOfPermissionDto, AuthenticateResultModel, CityDto, CityCreateDto, ExternalLoginProviderInfoModel, EstateServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { CountryDto, PagedResultDtoOfCountryDto, PagedResultDtoOfEstateDto } from '../../../shared/service-proxies/service-proxies';
import { CountryServiceProxy, EstateDto } from 'shared/service-proxies/service-proxies';


@Component({
  selector: 'create-city-modal',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.css']
})
export class CreateCityComponent extends AppComponentBase implements OnInit {

  @ViewChild('createModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  active: boolean = false;
  saving: boolean = false;

  item: CityCreateDto = null;
  countryId:string = "";

  countries: CountryDto[] = [];
  estates: EstateDto[] = []; 


  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(
      injector: Injector,
      private _service: CityServiceProxy,
      private _countryService : CountryServiceProxy,
      private _estateService : EstateServiceProxy
  ) {
      super(injector);
  }

  ngOnInit(): void {
      this._countryService.getAll("",undefined,0,10000)
          .subscribe((result: PagedResultDtoOfCountryDto) =>{
              this.countries = result.items;
          });
        this.estates = [];
    }

  show(): void {
      this.active = true;
      this.item = new CityCreateDto();
      this.item.init({ isStatic: false, isActive:true, estateId:"" });
      this.countryId = "";
      this.modal.show();
  }

  onShown(): void {
      $.AdminBSB.input.activate($(this.modalContent.nativeElement));
  }

  save(): void {

      this.saving = true;
      this._service.create(this.item)
          .finally(() => { this.saving = false; })
          .subscribe(() => {
              this.notify.info(this.l('SavedSuccessfully'));
              this.close();
              this.modalSave.emit(null);
          });
  }

  close(): void {
      this.active = false;
      this.modal.hide();
  }

  populateEstates(){
    this._estateService.getAll("",undefined, this.countryId,0,10000)
        .subscribe((result : PagedResultDtoOfEstateDto)=>{
            this.estates = result.items;
        });
  }

}