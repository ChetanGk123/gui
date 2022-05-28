import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { ApiService } from './auth/api.service';
//import * as MenuData from 'src/assets/data/data.json'
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	roles: string[];
	children?: Menu[];
}
export interface custonMenu {
	active?: boolean,
	badgeType?:string,
	badgeValue?: string,
	bookmark?: boolean,
	children?: custonMenu[],
	icon?: string,
	module_id?: string,
	path?: string,
	permissions?: string,
	title?: string,
	type?: string,
	roles?: string[],
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false 
	public fullScreen = false;

	constructor(public http: HttpClient,public apiService: ApiService) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
		
		//this.fetchData()
	}

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	 items1:custonMenu[] =[];
	 list:Menu;
	async fetchData(){
		var d:custonMenu[] = await this.apiService.getTypeRequest('gui_options').toPromise().then((result:any) => {
		this.items1 = result.data.modules;
		return this.items1
		})
		return d;
	}

	
	addDataToList(iteems:any[]){
		iteems.map(x => {
		this.list.path = ""
	})
	}

	MENUITEMS: Menu[] = [
		{
			path: '/dashboard', title: 'Dashboard', icon: 'home', type: 'link',roles:['Admin','ADMISSION OFFICER','su_user']
		},
		{
			path: '/profile', title: 'Profile', icon: 'user', type: 'link',roles:['su_user']
		},
		// {
		// 	title: 'General Settings', icon: 'settings', type: 'sub', active: false,roles:['Admin'] , children: [
		// 		{ path: '/general_Settings/instituteProfile', icon: 'settings', title: 'Institute Profile', type: 'link',roles:['Admin'] },
		// 		{ path: '/general_Settings/rulesNRegulations', icon: 'settings', title: 'Rules & Regulations', type: 'link',roles:['Admin'] },
		// 		{ path: '/general_Settings/marksGrading', icon: 'settings', title: 'Marks Grading', type: 'link',roles:['Admin'] },
		// 	]
		// },
		{
			title: 'Misc', icon: 'aperture', type: 'sub', active: false,roles:['Admin','ADMISSION OFFICER'] , children: [
				{ path: '/misc/addNew', title: 'AddNew',icon: 'aperture', type: 'link',roles:['Admin','ADMISSION OFFICER'] },
				
			]
		},
		{
			path: '/calender', title: 'Calender', icon: 'calendar', type: 'link', roles:['Admin','ADMISSION OFFICER','su_user']
		},
		{
			title: 'System Settings', icon: 'aperture', type: 'sub', active: false,roles:['su_user'] , children: [
				{ path: '/system-settings/role', title: 'Role',icon: 'aperture', type: 'link',roles:['su_user'] },
				{ path: '/system-settings/registerModule', title: 'Register Module',icon: 'aperture', type: 'link',roles:['su_user'] },
				{ path: '/system-settings/registerPage', title: 'Register Pages',icon: 'aperture', type: 'link',roles:['su_user'] },
				{ path: '/system-settings/registerSubPage', title: 'Register Sub Pages',icon: 'aperture', type: 'link',roles:['su_user'] },
				
			]
		},
		{
			title: 'Fees', icon: 'dollar-sign', type: 'sub', active: false,roles:['Admin'] , children: [
				{ path: '/fees/feeGroup', title: 'Fee Groups',icon: 'dollar-sign', type: 'link',roles:['Admin'] },
				{ path: '/fees/feeComponents', title: 'Fee Components',icon: 'dollar-sign', type: 'link',roles:['Admin'] },
				{ path: '/fees/assignFees', title: 'Assign Fees',icon: 'dollar-sign', type: 'link',roles:['Admin'] },
				{ path: '/fees/dueFees', title: 'Due Fees',icon: 'dollar-sign', type: 'link',roles:['Admin'] },
				{ path: '/fees/collectFees', title: 'Collect Fees',icon: 'dollar-sign', type: 'link',roles:['Admin'] },
				
			]
		},
		{
			title: 'Accounts', icon: 'command', type: 'sub', active: false,roles:['Admin'] , children: [
				{ path: '/accounts/addAccountHeads', title: 'Add Account Heads',icon: 'command', type: 'link',roles:['Admin'] },
				{ path: '/accounts/accountHeads', title: 'Account Heads',icon: 'command', type: 'link',roles:['Admin'] },
				
			]
		},
		{
			title: 'Student', icon: 'user', type: 'sub', active: false,roles:['Admin','ADMISSION OFFICER'], children: [
				{ path: '/student/allStudents', icon: 'users', title: 'All Students', type: 'link',roles:['Admin','ADMISSION OFFICER'] },
				{ path: '/student/addNew', icon: 'user-plus', title: 'Add New Student', type: 'link',roles:['Admin','ADMISSION OFFICER'] },
				{ path: '/student/promote', icon: 'user-plus', title: 'Promote Students', type: 'link',roles:['Admin','ADMISSION OFFICER'] },
				{ path: '/student/assignTc', icon: 'user-plus', title: 'Assign TC', type: 'link',roles:['Admin','ADMISSION OFFICER'] },
				{ path: '/student/assignedTc', icon: 'user-plus', title: 'Assigned TC', type: 'link',roles:['Admin','ADMISSION OFFICER'] },
			]
		},
		{
			title: 'Teacher', icon: 'users', type: 'sub', active: false,roles:['Admin','ADMISSION OFFICER'], children: [
				{ path: '/teacher/allTeachers', title: 'All Teachers', type: 'link',roles:['Admin','ADMISSION OFFICER'] },
				{ path: '/teacher/addNew', title: 'Add New Teacher', type: 'link',roles:['Admin','ADMISSION OFFICER'] },
			]
		},
		{
			title: 'Reports', icon: 'folder', type: 'sub', active: false,roles:['Admin','ADMISSION OFFICER'], children: [
				{ path: '/teacher/allTeachers', title: 'All Teachers', type: 'link',roles:['Admin','ADMISSION OFFICER'] },
				{ path: '/teacher/addNew', title: 'Add New Teacher', type: 'link',roles:['Admin','ADMISSION OFFICER'] },
			]
		},
		{
			title: 'Institute', icon: 'user', type: 'sub', active: false,roles:['su_user'], children: [
				{ path: '/institute/allInstitutes', icon: 'users', title: 'All Institutes', type: 'link',roles:['su_user'] },
				{ path: '/institute/addNew', icon: 'user-plus', title: 'Add New Institute', type: 'link',roles:['su_user'] },
			]
		},
		
	]
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	//ListItems = new BehaviorSubject<custonMenu[]>(this.items1)
	
}
