import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CityServiceProxy, CityDto, CityCreateDto, ListResultDtoOfPermissionDto, CountryDto, PagedResultDtoOfEstateDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { CountryServiceProxy, PagedResultDtoOfCountryDto, EstateServiceProxy, PagedResultDtoOfCityDto } from '../../../shared/service-proxies/service-proxies';
import { EstateDto } from 'shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent extends AppComponentBase implements OnInit {

  @ViewChild('editModal') modal: ModalDirective;
  @ViewChild('modalContent') modalContent: ElementRef;

  active: boolean = false;
  saving: boolean = false;

  item: CityCreateDto = null;
  countryId: string = "";

  countries: CountryDto[] = [];
  estates: EstateDto[] = [];


  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(
      injector: Injector,
      private _service: CityServiceProxy,
      private _countryService :CountryServiceProxy,
      private _estateService: EstateServiceProxy
  ) {
      super(injector);
  }

  ngOnInit(): void {
    this._countryService.getAll("",undefined,0,10000)
    .subscribe((result: PagedResultDtoOfCountryDto ) =>{
        this.countries = result.items;
    });
  }

  show(id: string): void {
      this._service.get(id)
          .finally(() => {
              this.active = true;
              this.modal.show();
              this.getContry(this.item.estateId);
          })
          .subscribe((result: CityDto) => {
            this.item = new CityCreateDto();
            this.item.id = result.id;
            this.item.abreviation = result.abreviation;
            this.item.estateId = result.estateId;
            this.item.isActive = result.isActive;
            this.item.name = result.name;
          });
  }

  onShown(): void {
      $.AdminBSB.input.activate($(this.modalContent.nativeElement));
  }

  save(): void {
      this.saving = true;
      this._service.update(this.item) 
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

  getContry(estateId: string){
      this._estateService.get(estateId)
          .finally(()=>{
            this.populateEstates();
          })
          .subscribe((result)=>{
              this.countryId = result.countryId;
          });
  }

}
