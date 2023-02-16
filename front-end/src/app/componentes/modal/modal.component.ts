import { CartasService } from './../../services/cartas.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  form!: FormGroup
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    public cartaService: CartasService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.initialForm()
  }
   /** Metódo para Inicializar Formulário */
  initialForm(){
    this.form =  new FormGroup({
      nome:      new FormControl(null,[Validators.required]),
      descricao: new FormControl(null,[Validators.required]),
      url:       new FormControl(null),
      ataque:    new FormControl(null,[Validators.required]),
      defesa:    new FormControl(null,[Validators.required]),
      tipo:      new FormControl(null,[Validators.required]),
      classe:    new FormControl(null,[Validators.required])
    })
  }

  /** Metódo para Recarregar a Página*/
  load(){
    location.reload()
  }

  /** Metódo para fechar Modal */
  closeModal(){
    this.dialogRef.close()
  }

  /** Metódo para Submeter Dados do Fomulário */
  submitForm(){

    if(this.form.valid){
        let dados = this.form.value
        this.cartaService.insertCards(dados).subscribe(() => {
          this._snackBar.open('Inserido com sucesso','X')
          this.dialogRef.close()
          this.load()
        })

      } else {

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
