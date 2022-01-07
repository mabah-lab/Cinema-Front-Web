import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CinemaService} from '../services/cinema.service';
import {Villes} from '../model/salles.model';

@Component({
  selector: 'app-cimema',
  templateUrl: './cimema.component.html',
  styleUrls: ['./cimema.component.css']
})
export class CimemaComponent implements OnInit {
  constructor(private cinemaService: CinemaService) { }
  public villes: any | null= null;
  public cinemas: any;
  public currentVille: any;
  public currentCinema: any;
  public salles: any;
  public currentProjection: any;
  selectedTickets: any;
  public  urlImage: string = this.cinemaService.host + '/imageFilm/';

  ngOnInit(): void {

    this.cinemaService.getVilles()
      .subscribe(data => {
        this.villes = data;
        this.currentVille=this.villes._embedded.villes[0];
        this.currentCinema=this.onGetCinemas(this.currentVille);
      }, err => {
        console.log(err);
      });


  }

  onGetCinemas(v: any) {
    this.salles = undefined;
    this.currentVille = v;
    this.cinemaService.getCinemas(v)
      .subscribe(data => {
        this.cinemas = data;
        this.currentCinema=this.cinemas._embedded.cinemas[0];
        this.onGetSalles(this.currentCinema);
      }, err => {
        console.log(err);
      });
  }

  onGetSalles(c: any) {
    this.currentCinema = c;
    this.cinemaService.getSalles(c)
      .subscribe(data => {
        this.salles = data;
        this.salles._embedded.salles.forEach((salle:any)  => {
          this.cinemaService.getProjections(salle)
            .subscribe(datap => {
              salle.projections = datap;
            }, err => {
              console.log(err);
            });
        });
      }, error => {
        console.log(error);
      });
  }

  onGetTicketsPlaces(p: any) {
    this.currentProjection = p;
    this.cinemaService.getTicketsPlaces(p)
      .subscribe(data => {
        this.currentProjection.tickets = data;
        this.selectedTickets = [];
        //console.log(data);
      }, err => {
        console.log(err);
      });
  }

  onSelectTicket(t: any) {
    if (!t.selected){
      t.selected = true;
      this.selectedTickets.push(t);
    }else {
      t.selected = false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t), 1);
    }

  }

  onGetTicketClass(t: any) {
    let str = 'ticketPlace btn btn-';
    if (t.reserve) {
        str += 'danger';
    }
    else if (t.selected) {
      str += 'warning';
 }
    else {
      str += 'success';
 }
    return str;
  }

  onPayTickets(dataPayement:any) {
   const tickets: any[] = [];
   this.selectedTickets.forEach((t:any) => {
     tickets.push(t.id);
   });
   dataPayement.tickets = tickets;
   this.cinemaService.payerTickets(dataPayement)
      .subscribe(data => {
        alert('tickets réservés avec succès');
        //console.log(data);
        this.onGetTicketsPlaces(this.currentProjection);
      }, err => {
        console.log(err);
      });
  }

}
