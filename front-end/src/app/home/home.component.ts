import { ModalDeleteComponent } from './../componentes/modal-delete/modal-delete.component';
import { ModalEditComponent } from './../componentes/modal-edit/modal-edit.component';
import { CartasService } from './../services/cartas.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../componentes/modal/modal.component';
import { Carta } from '../models/carta.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  dados!:Carta
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort

  public displayedColumns: string[] = ['id', 'nome', 'desc','ataque','defesa','tipo', 'classe','action'];
  public dataSource: any;

  constructor(
    private cartaService: CartasService,
    private dialog: MatDialog
    ){}

  ngOnInit(){
    if(typeof(localStorage.getItem('status_usuario')) !== 'undefined'){
       localStorage.setItem('status_usuario','logado')
      }

      this.loadDados()

  }

  /** Metódo que Carrega os Dados*/
 async loadDados(){
    await this.cartaService.getAllCards().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      console.log(this.dataSource);
    })
  }

  /** Metódo de Filtro */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()

  }

  /** Metódo para abrir Modal de Inserir Novas Cartas*/
  openModalInsertCard(){
    const dialogRef = this.dialog.open(ModalComponent,{
      height: '600px',
      width: '400px'
    })
  }

 /** Metódo para abrir Modal de Editar Cartas*/
  openModalEditCard(id: number){

    this.cartaService.getCardById(id).subscribe(data => {
      this.dados = data
      console.log(data);
      const dialogRef = this.dialog.open(ModalEditComponent,{
        height: '600px',
        width: '600px',
        data: this.dados
      })

    })

  }

 /** Metódo para abrir Modal de Deletar Cartas*/
  openModalDeleteCard(id: number){
    const dialogRef = this.dialog.open(ModalDeleteComponent,{
      width: '400px',
      data: id
    })
  }
}
