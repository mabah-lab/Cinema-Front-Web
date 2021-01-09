import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CinemaService} from '../services/cinema.service';

@Component({
  selector: 'app-cimema',
  templateUrl: './cimema.component.html',
  styleUrls: ['./cimema.component.css']
})
export class CimemaComponent implements OnInit {
  public villes: any ;
  public cinemas: any;
  public currentVille: any;
  public currentCinema: any;
  public salles: any;
  public currentProjection: any;
  private selectedTickets: any;
  constructor(private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getVilles()
      .subscribe(data=>{
        this.villes=data;
      },err => {
        console.log(err);
      })
  }

  onGetCinemas(v:any) {
    this.salles=undefined;
    this.currentVille=v;
    this.cinemaService.getCinemas(v)
      .subscribe(data=>{
        this.cinemas=data;
      },err=>{
        console.log(err);
      })
  }

  onGetSalles(c: any) {
    this.currentCinema=c;
    this.cinemaService.getSalles(c)
      .subscribe(data=>{
        this.salles=data;
        this.salles._embedded.salles.forEach(salle  =>{
          this.cinemaService.getProjections(salle)
            .subscribe(data=>{
              salle.projections=data;
            },err=>{
              console.log(err);
            })
        })
      },error=>{
        console.log(error);
      })
  }
  public  urlImage: string= this.cinemaService.host+'/imageFilm/';

  onGetTicketsPlaces(p: any) {
    this.currentProjection=p;
    this.cinemaService.getTicketsPlaces(p)
      .subscribe(data=>{
        this.currentProjection.tickets=data;
        this.selectedTickets=[];
      },err=>{
        console.log(err);
      })
  }

  onSelectTicket(t: any) {
    if(!t.selected){
      t.selected=true;
      this.selectedTickets.push(t);
    }else {
      t.selected=false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t),1);
    }

  }

  onGetTicketClass(t: any) {
    let str="ticketPlace btn btn-";
    if(t.reserve)
        str+= "danger";
    else if (t.selected)
      str+="warning";
    else
      str+="success";
    return str;
  }

  onPayTickets(dataPayement) {
   let tickets= [];
   this.selectedTickets.forEach(t=>{
     tickets.push(t.id);
   });
   dataPayement.tickets=tickets;
    this.cinemaService.payerTickets(dataPayement)
      .subscribe(data=>{
        alert("tickets réservés avec succès");
        this.onGetTicketsPlaces(this.currentProjection);
      },err=>{
        console.log(err);
      });
  }

}
