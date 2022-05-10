import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Restaurant } from './restaurant.model';
declare var window: any;

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  allRestaurantData: any;

  constructor(private formBuilder: FormBuilder, private api:ApiService,private router:Router) { }
  formModal: any;
  formValue!: FormGroup;
  showAdd!:boolean;
  showEdit!:boolean;

  restaurantObj:Restaurant = new Restaurant; 

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("addRestaurantModal")
    );

    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })

    this.getAllRestaurant();
  }

  clickAddRestaurant()
  {
    this.showAdd=true;
    this.showEdit=false;
    this.openModal();
  } 
  addRestaurant()
  {
    this.restaurantObj.name= this.formValue.value.name;
    this.restaurantObj.email= this.formValue.value.email;
    this.restaurantObj.mobile= this.formValue.value.mobile;
    this.restaurantObj.address= this.formValue.value.address;
    this.restaurantObj.services= this.formValue.value.services;
    this.api.postRestaurant(this.restaurantObj).subscribe(res=>{
      this.formValue.reset();
      alert("Restaurant data added");
      this.getAllRestaurant();
      this.closeModal();
  });
  }

  getAllRestaurant(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData=res;
      //console.log(this.allRestaurantData);
  });
  }

  deleteRestaurant(data:any)
  {
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      this.getAllRestaurant();
      alert("Record deleted successfully");
  });
  }

  onEditRestaurant(data:any)
  {
    this.showAdd=false;
    this.showEdit=true;
    this.openModal();
    this.restaurantObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateRestaurant()
  {
    this.restaurantObj.name= this.formValue.value.name;
    this.restaurantObj.email= this.formValue.value.email;
    this.restaurantObj.mobile= this.formValue.value.mobile;
    this.restaurantObj.address= this.formValue.value.address;
    this.restaurantObj.services= this.formValue.value.services;
    this.api.updateRestaurant(this.restaurantObj,this.restaurantObj.id).subscribe(res=>{
      alert("Restaurant data updated");
      this.getAllRestaurant();
      this.closeModal();
  });
  }

  openModal() {
    this.formModal.show();
  }

  closeModal() {
    this.formModal.hide();
  }

  logout()
  {
    this.router.navigate(['login']);
  }

}
