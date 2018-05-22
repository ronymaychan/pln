import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { StateDto, PagedResultDtoOfStateDto, CountryServiceProxy, PagedResultDtoOfCountryDto } from "shared/service-proxies/service-proxies";
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateEstateComponent } from './create-estate/create-estate.component';
import { EditEstateComponent } from './edit-estate/edit-estate.component';
import { StateServiceProxy, CountryDto } from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  animations: [appModuleAnimation()]
})
export class EstatesComponent extends PagedListingComponentBase<StateDto> implements OnInit  {

   @ViewChild('createModal') createModal: CreateEstateComponent;
   @ViewChild('editModal') editModal: EditEstateComponent;
	
	items: StateDto[] = [];
	countries : CountryDto [] = [];
	countryId: string ="";
	filter: string = "";
	isActive: any;

	constructor(
		private injector:Injector,
		private service: StateServiceProxy,
		private _countryService :CountryServiceProxy
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
		this.service.getAll(this.filter, this.isActive, this.countryId, request.skipCount,request.maxResultCount)
			.finally( ()=> {
				finishedCallback();
			})
            .subscribe((result: PagedResultDtoOfStateDto)=>{
				this.items = result.items;
				console.log(this.items);
				this.showPaging(result, pageNumber);
		});
	}

	delete(item: StateDto): void {
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

	edit(item:StateDto): void {
		this.editModal.show(item.id);
	}

	search(): void{
		this.refresh();
	}
}
