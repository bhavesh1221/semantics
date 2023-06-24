import { Component,OnInit } from '@angular/core';
import { statesData } from './state.model';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  tableData:any = []
  jsonStates = statesData
  states: any = []
  stateCode:string = ""
  filteredStates:any = []

  constructor(private http: ApiService){}

  ngOnInit(): void {
  }

  onStateClick(stateName: string){
    this.http.getData().subscribe((data) => {
      this.showData(data,stateName)
    })
  }
  
  showData(data:any,stateName:string){
    this.tableData = []
    this.filteredStates = []
    this.jsonStates.filter((item:any)=>{
      if(stateName == item.name) {
        this.stateCode = item.code
      }
    })
    
    for(let key in data){
      if(this.stateCode == key){
        this.tableData.push(data[key])
      }
    }

    for(let key in this.tableData[0].districts){
      this.tableData[0].districts[key]["district_name"] = key
      this.filteredStates.push(this.tableData[0].districts[key])
    }
  }
}
