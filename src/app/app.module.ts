import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ReccomendationsComponent } from './reccomendations/reccomendations.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ScrollHistory } from './models/scrollhistory.model';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    ExperienceComponent,
    ProjectsComponent,
    PlaylistComponent,
    CertificatesComponent,
    ReccomendationsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ScrollHistory],
  bootstrap: [AppComponent]
})
export class AppModule { }

