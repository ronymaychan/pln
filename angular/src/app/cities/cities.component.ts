import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { CityDto, PagedResultDtoOfCityDto, CountryServiceProxy, PagedResultDtoOfCountryDto, EstateDto } from 'shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CityServiceProxy, CountryDto } from '@shared/service-proxies/service-proxies';
import { CreateCityComponent } from './create-city/create-city.component';
import { EditCityComponent } from './edit-city/edit-city.component';
import { EstateServiceProxy, PagedResultDtoOfEstateDto } from '../../shared/service-proxies/service-proxies';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  animations: [appModuleAnimation()]
})
export class CitiesComponent extends PagedListingComponentBase<CityDto> implements OnInit  {

  @ViewChild('createModal') createModal: CreateCityComponent;
  @ViewChild('editModal') editModal: EditCityComponent;
 
 items: CityDto[] = [];
 countries : CountryDto [] = [];
 estates : EstateDto [] = [];

 countryId: string ="";
 estateId: string ="";
 filter: string = "";
 isActive: any;

 constructor(
   private injector:Injector,
   private service: CityServiceProxy,
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
   this.refresh();
 }

 list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
   this.service.getAll(this.filter, this.isActive, this.estateId, this.countryId, request.skipCount,request.maxResultCount)
     .finally( ()=> {
       finishedCallback();
     })
           .subscribe((result: PagedResultDtoOfCityDto)=>{
       this.items = result.items;
       this.showPaging(result, pageNumber);
   });
 }

 delete(item: CityDto): void {
   abp.message.confirm(
     this.l("DeleteMessageConfirmation"),
     this.l("DeleteTitleConfirmation"),
     (result:boolean) =>{
       if(result)
       {
         this.service.delete(item.id)
           .finally(() => {
             abp.notify.info(this.l("DeleteSuccessfully") + ": "+ item.name );
             this.refresh();
           })
           .subscribe(() => { });
       }
     }
   );
 }

 // Show Modals
 create(): void {
  this.createModal.show(); 
 }

 edit(item:CityDto): void {
  this.editModal.show(item.id);
 }

 search(): void{
   this.refresh();
 }

 populateEstates(){
  console.log("populateEstates", this.countryId);
  this.estates = [];
  this.estateId = "";
  if(this.countryId){
    this._estateService.getAll("",undefined, this.countryId,0,10000)
        .subscribe((result : PagedResultDtoOfEstateDto)=>{
            console.log(result.items);
            this.estates = result.items;
        });
  }
}

}
