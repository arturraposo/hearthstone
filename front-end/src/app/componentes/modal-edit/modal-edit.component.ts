import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartasService } from './../../services/cartas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {
  form!: FormGroup
  constructor(
    private dialogRef: MatDialogRef<ModalEditComponent>,
    private cartaService: CartasService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {

    this.initialForm()
  }
  /** Metódo para Inicializar Formulário com Dados da Carta a ser editada*/
  initialForm(){
    this.form = new FormGroup({
      nome:      new FormControl(this.data.nome,[Validators.required]),
      descricao: new FormControl(this.data.descricao,[Validators.required]),
      url:       new FormControl(this.data.url),
      ataque:    new FormControl(this.data.ataque,[Validators.required]),
      defesa:    new FormControl(this.data.defesa,[Validators.required]),
      tipo:      new FormControl(this.data.tipo,[Validators.required]),
      classe:    new FormControl(this.data.classe,[Validators.required])
    })
  }

  /** Metódo para recarregar página*/
  load(){
    location.reload()
  }
/** Metódo para Fechar Modal*/
  closeModal(){
    this.dialogRef.close()
  }

/** Metódo para Submeter Dados do Formulário a serem Atualizados*/
  submitUpdate(){
    if(this.form.valid){

      let id = this.data.id
      let dados = this.form.value
      console.log(dados);
      this.cartaService.updateCard(id,dados).subscribe(result => {
        console.log(result)
        this._snackBar.open('Sua carta foi editada com sucesso','X')

        this.dialogRef.close()
          this.load()
      })
    } else{
        if(this.form.value['nome'] === null){
          this._snackBar.open('Preencha o nome da Carta','X')
        }

        if(this.form.value['descricao'] === null){
          this._snackBar.open('Preencha a Descrição da Carta','X')
        }

        if(this.form.value['ataque'] === null){
          this._snackBar.open('Preencha o ataque da Carta','X')
        }

        if(this.form.value['defesa'] === null){
          this._snackBar.open('Preencha a defesa da Carta','X')
        }

        if(this.form.value['tipo'] === null){
          this._snackBar.open('Preencha o tipo da Carta','X')
        }

        if(this.form.value['classe'] === null){
          this._snackBar.open('Preencha a classe da Carta','X')
        }
        if(this.form.value['ataque'] > 10 ){
          this._snackBar.open('O ataque não pode ser maior do que 10','X')

        }

        if(this.form.value['defesa'] > 10 ){
          this._snackBar.open('A defesa  não pode ser maior do que 10','X')
        }
    }
  }
}
