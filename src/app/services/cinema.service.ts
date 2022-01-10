import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Villes} from '../model/salles.model';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  public host = environment.baseURL;

  constructor(private  http: HttpClient) { }

  getVilles(){
    return this.http.get(this.host + '/villes');
  }

  getCinemas(v: any) {
    return  this.http.get(v._links.cinemas.href);
  }

  getSalles(c: any) {
    return this.http.get(c._links.salles.href);
  }
  getProjections(salle: any) {
    const url = salle._links.projections.href.replace('{?projection}', '');
    return this.http.get(url + '?projection=p1');
  }
  getTicketsPlaces(p: any) {
    const url = p._links.tickets.href.replace('{?projection}', '');
    return this.http.get(url + '?projection=ticketProj');
  }

  payerTickets(dataPayement: any) {
    return this.http.post(this.host + '/payerTickets', dataPayement);
  }
}
