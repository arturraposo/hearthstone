import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.initialForm()
  }

  initialForm(){
    this.form = new FormGroup({
      nome: new FormControl(null,[Validators.required])
    })
  }

  navigateHome(){
   let nome = this.form.value.nome
   localStorage.setItem('usuario Logado',nome)
   this.router.navigate(['home'])
  }

}
