import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup;
  titulo =  'Crear Producto';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              // tslint:disable-next-line:variable-name
              private _productoService: ProductoService,
              private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  // tslint:disable-next-line:typedef
  agregarProducto(){
    console.log(this.productoForm);

    console.log(this.productoForm.get('nombre')?.value);

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('nombre')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    };

    if (this.id != null){
      // Editamos Producto
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.info('Producto actualizado correctamente', 'Producto Actualizado');
        this.router.navigate(['/']);
      }, error => {
        this.toastr.error('No se pudo guardar el producto', error);
        this.productoForm.reset();
      });
    }else{
      // Agregamos el Producto
      console.table(PRODUCTO);

      this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('Producto registrdo con éxito!', 'Producto Registrado');
        this.router.navigate(['/']);
      }, error => {
        this.toastr.error('No se pudo guardar el producto', error);
        this.productoForm.reset();
      });
    }
  }

  // tslint:disable-next-line:typedef
  esEditar(){

    if (this.id != null){
      this.titulo = 'Editar Producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          nombre: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        });
      });
    }
  }

}
