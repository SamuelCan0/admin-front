import { Component, OnInit } from '@angular/core';
import { Gallery } from 'src/app/models/gallery';
import { Project } from 'src/app/models/project';
import { GalleryService } from 'src/app/services/gallery.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  ver:boolean=true;
  public projects:Project[]=[];
  public gallerys:Gallery[]=[];
  project=new Project("","","","");
  gallery=new Gallery("","","","",0);
  public fotoG:File[]=[];
  public fotoP:File[]=[];
  constructor(private ps: ProjectService, private gs:GalleryService) { }

  ngOnInit(): void {
    this.getG();
    this.getP();
  }

  getG(){
    this.gs.getGallerys().subscribe((g:Gallery[])=>{
      this.gallerys=g;
    });
  }

  getP(){
    this.ps.getProjects().subscribe((p:Project[])=>{
      this.projects=p;
    })
  }

}
