import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  formVeiculo = new FormGroup({
    nomeVeiculo: new FormControl(''),
    marcaVeiculo: new FormControl(''),
    anoVeiculo: new FormControl(''),
    corVeiculo: new FormControl(''),
    situacaoVeiculo: new FormControl(''),
    descricaoVeiculo: new FormControl(''),
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  async cadastrarVeiculo(){
    console.log(this.formVeiculo.value);
  }

}
