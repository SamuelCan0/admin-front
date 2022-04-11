import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gallery } from 'src/app/models/gallery';
import { Project } from 'src/app/models/project';
import { GalleryService } from 'src/app/services/gallery.service';
import { ProjectService } from 'src/app/services/project.service';
import { UploadPService } from 'src/app/services/upload-p.service';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {

  public projects:Project[]=[];
  project=new Project("","","","");
  public fotoP:File[]=[];
  public b:boolean=false;
  public id:String;
  public data =new FormData();
  public load:boolean=false;

  constructor(private toastr: ToastrService,private ps:ProjectService, private route:ActivatedRoute, public router: Router, private up:UploadPService) {
    this.id=this.route.snapshot.params['id'];
  }

  ngOnInit(): void {

    if (this.id==null) {
      this.b=false;
      this.project=new Project("","","","");
    } else {
      this.b=true;
      this.getProject();
    }
  }

  onSelect(event:any){
    console.log(event);
    this.fotoP.push(...event.addedFiles);
  }


  onRemove(event:any) {
    console.log(event);
    this.fotoP.splice(this.fotoP.indexOf(event), 1);
  }



  clearP(){
    this.project._id="";
    this.project.descrip="";
    this.project.image="";
    this.project.titulo="";
  }

  saveP(){
    this.load=true;
    if (this.project.descrip=="" || this.project.titulo=="" || !this.fotoP[0]) {
      this.toastr.error('Se encontraron campos vacios', 'Error', {
        timeOut: 3000,
      });
      this.load=false;
    } else {
      if (this.fotoP.length>1) {
        this.toastr.warning('Solo puedes subir una imagen', 'Advertencia', {
          timeOut: 3000,
        });
        this.load=false;
      } else {

        this.data.append('file',this.fotoP[0]);
        this.data.append('upload_preset','project');
        this.subirImg();
        setTimeout(() => {
          this.ps.addProject(this.project).subscribe((res)=>{
            this.clearP();
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

  getProject(){
    this.ps.getProject(this.id).subscribe(data =>{
      this.project._id=data._id;
      this.project.titulo=data.titulo;
      this.project.descrip=data.descrip;
      this.project.image=data.image;
    })
  }

  updateP(){
    this.load=true;
    this.data.append('file',this.fotoP[0]);
    this.data.append('upload_preset','gallery');
    this.subirImg();
    setTimeout(() => {
      this.ps.updateProject(this.project).subscribe((res)=>{
        this.clearP();
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

  deleteP(){
    this.load=true;
    this.ps.deleteProject(this.project._id).subscribe((res)=>{
      this.clearP();
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
      this.up.uploadImage(this.data).subscribe(res=>{
        this.project.image=res.url;
      });
  }


}
