import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/service/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  
  constructor(private _empleadoService: EmpleadoService,
    private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data =>{
      this.empleados = [];
      data.forEach((element:any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      console.log(this.empleados);
    });
  }
    eliminarEmpleado(id: string){
      this._empleadoService.eliminarEmpleado(id).then(() => {
        console.log('empleado eliminado con éxito');
        this.toastr.error('Registro eliminado', 'El empleado fue eliminado con éxito', {
          positionClass: 'toast-bottom-right'
        })
      }).catch(error =>{
        console.log(error);
      })
    }
}
