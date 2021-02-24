import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  listProductos: Producto[] = [];

  // tslint:disable-next-line:variable-name
  constructor(private _productoService: ProductoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  // tslint:disable-next-line:typedef
  obtenerProductos(){
    this._productoService.getProductos().subscribe(data => {
      console.table(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  eliminarProducto(id: any){
    this._productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.error('El producto fue elminado correctamente', 'Producto Eliminado');
      this.obtenerProductos();
    }, error => {
      this.toastr.error('El producto no se eliminó', error);
    });
  }

}
