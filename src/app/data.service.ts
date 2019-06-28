import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  aboutFileName: string = 'about/';
  certificatesFileName: string = 'certificates/';
  experienceFileName: string = 'about/';
  playlistFileName: string = 'playlist/';
  projectsFileName: string = 'projects/';
  backendUrl: string = 'http://localhost:8000/';
  localJson = false;

  constructor(private httpClient: HttpClient) {
    this.localJson = true;
    if (this.localJson === true) {
      this.backendUrl = './../assets/json/';
      this.aboutFileName = 'about.json';
      this.certificatesFileName = 'certificates.json';
      this.experienceFileName = 'experience.json';
      this.playlistFileName = 'playlist.json';
      this.projectsFileName = 'projects.json';
    }
  }

  getAbout() {
    return this.httpClient.get(this.backendUrl + this.aboutFileName);
  }

  getCertificates() {
    return this.httpClient.get(this.backendUrl + this.certificatesFileName);
  }

  getExperience() {
    return this.httpClient.get(this.backendUrl + this.experienceFileName);
  }

  getPlaylist() {
    return this.httpClient.get(this.backendUrl + this.playlistFileName);
  }

  getProjects() {
    return this.httpClient.get(this.backendUrl + this.projectsFileName);
  }

}
