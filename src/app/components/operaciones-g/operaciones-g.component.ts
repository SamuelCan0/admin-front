import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Gallery } from 'src/app/models/gallery';
import { Project } from 'src/app/models/project';
import { GalleryService } from 'src/app/services/gallery.service';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ToastrService } from 'ngx-toastr';
import { UploadGService } from 'src/app/services/upload-g.service';

@Component({
  selector: 'app-operaciones-g',
  templateUrl: './operaciones-g.component.html',
  styleUrls: ['./operaciones-g.component.css'],
  template:`<notifier-container></notifier-container>`,
})
export class OperacionesGComponent implements OnInit {

  public gallerys:Gallery[]=[];
  gallery=new Gallery("","","","",0);
  public fotoG:File[]=[];
  public b:boolean=false;
  public id:String;
  public load:boolean=false;
  public data =new FormData();

  constructor(private toastr: ToastrService,private gs:GalleryService, private route:ActivatedRoute, public router: Router, private ug:UploadGService) {
    this.id=this.route.snapshot.params['id'];
  }

  ngOnInit(): void {

    if (this.id==null) {
      this.b=false;
      this.gallery=new Gallery("","","","",0);
    } else {
      this.b=true;
      this.getGallery();
    }
  }

  onSelect(event:any){
    console.log(event);
    this.fotoG.push(...event.addedFiles);
  }


  onRemove(event:any) {
    console.log(event);
    this.fotoG.splice(this.fotoG.indexOf(event), 1);
  }



  clearG(){
    this.gallery._id="";
    this.gallery.descrip="";
    this.gallery.imagen="";
    this.gallery.titulo="";
  }

  saveG(){
    if (this.gallery.descrip=="" || this.gallery.titulo=="" || !this.fotoG[0]) {
      this.toastr.error('Se encontraron campos vacios', 'Error', {
        timeOut: 3000,
      });
    } else {
      if (this.fotoG.length>1) {
        this.toastr.warning('Solo puedes subir una imagen', 'Advertencia', {
          timeOut: 3000,
        });
      } else {
        this.load=true;
        this.data.append('file',this.fotoG[0]);
        this.data.append('upload_preset','gallery');
        this.subirImg();
        setTimeout(() => {
          this.gs.addGallery(this.gallery).subscribe((res)=>{
            this.clearG();
            this.toastr.success('Se guardo exitosamente', 'Exito', {
              timeOut: 3000,
            });
            this.router.navigate(['/inicio']);
          },(err)=>{
            this.toastr.error('Error al guardar, intentalo de nuevo', 'Error', {
              timeOut: 3000,
            });
            this.load=false;
          })
        }, 10000);
      }
    }
  }

  getGallery(){
    this.gs.getGallery(this.id).subscribe(data =>{
      this.gallery._id=data._id;
      this.gallery.titulo=data.titulo;
      this.gallery.descrip=data.descrip;
      this.gallery.imagen=data.imagen;
    })
  }

  updateG(){
    this.load=true;
    this.data.append('file',this.fotoG[0]);
    this.data.append('upload_preset','gallery');
    this.subirImg();
    setTimeout(() => {
      this.gs.updateGallery(this.gallery).subscribe((res)=>{
        this.clearG();
        this.toastr.success('Se guardo exitosamente', 'Exito', {
          timeOut: 3000,
        });
        this.router.navigate(['/inicio']);
      },(err)=>{
        this.toastr.error('Error Al Guardar', 'Error', {
          timeOut: 3000,
        });
        this.load=false;
      })
    }, 10000);
  }

  deleteG(){
    this.load=true;
    this.gs.deleteGallery(this.gallery._id).subscribe((res)=>{
      this.clearG();
      this.toastr.success('Se elimino exitosamente', 'Exito', {
        timeOut: 3000,
      });
      this.router.navigate(['/inicio']);
    },(err)=>{
      this.toastr.error('Error al eliminar', 'Error', {
        timeOut: 3000,
      });
      this.load=false;
    })
  }


  subirImg(){
      this.ug.uploadImage(this.data).subscribe(res=>{
        this.gallery.imagen=res.url;
      });
  }








}
