import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit,Inject } from '@angular/core';
import { CartasService } from 'src/app/services/cartas.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<ModalDeleteComponent>,
    private cartaService: CartasService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }
/** Metódo para Deletar Carta Selecionada*/
  deleteCard(){
    this.cartaService.deleteCard(this.data).subscribe(()=>{
      this._snackBar.open('Carta excluída com sucesso','X')
      this.dialogRef.close()
      location.reload()
    })
  }

}
