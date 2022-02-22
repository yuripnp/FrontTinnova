import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Veiculo } from '../model/Veiculo';
import { VeiculoServiceService } from '../services/veiculo-service.service';
import {map} from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  veiculosList: Veiculo[] = [];
  veiculosCadastradosLastWeekList: Veiculo[] = [];
  veiculosAgrupadosDecadaList: Array<{decada: number, quantidade: number}> = [];
  veiculosAgrupadosMarcaList: Array<{marca: string, quantidade: number}> = [];

  isEditing = false;

  qntVeiculosNaoVendidos = 0;

  formVeiculo = new FormGroup({
    id: new FormControl(0),
    veiculo: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    ano: new FormControl(0, [Validators.required]),
    cor: new FormControl('', [Validators.required]),
    vendido: new FormControl(false, [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
  });

  constructor(private veiculoService: VeiculoServiceService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.getVeiculos();

    const obs1 = this.veiculoService.getAllVeiculosNaoVendidos().pipe(
      map(res => {
        this.qntVeiculosNaoVendidos = res.quantidade;
        return res;
      })
    );

    const obs2 = this.veiculoService.getVeiculosAgrupadosPorDecada().pipe(
      map((res: any) => {
        const keys = Object.keys(res);
        for(const key of keys) {
          this.veiculosAgrupadosDecadaList.push({
            decada: Number(key),
            quantidade: Number(res[key])
          });    
        }
      })
    );

    const obs3 = this.veiculoService.getVeiculosAgrupadosPorMarca().pipe(
      map((res: any) => {
        const keys = Object.keys(res);
        for(const key of keys) {
          this.veiculosAgrupadosMarcaList.push({
            marca: key,
            quantidade: Number(res[key])
          });    
        }
      })
    );
    
    const obs4 = this.veiculoService.getVeiculosByLastWeek().pipe(
      map(res => {
        this.veiculosCadastradosLastWeekList = res;
        return res;
      })
    );


    forkJoin([obs1, obs2, obs3, obs4]).subscribe();
  }

  async cadastrarVeiculo() {
    if (this.formVeiculo.invalid) {
      alert('Campos incorretos ou invalidos!');
    } else {
      this.veiculoService.post(this.formVeiculo.value).subscribe(res => {
        alert('Veiculo inserido com sucesso!');
        this.formVeiculo.reset();
      });
    }
  }

  getVeiculos() {
    this.veiculoService.getAll().subscribe((result: Veiculo[]) => {
      this.veiculosList = result;
    })
  }

  deleteVeiculo(veiculo: Veiculo) {
    if (confirm('Deseja excluir esse veiculo? ID#' + veiculo.id)) {
      this.veiculoService.delete(veiculo.id)
      .subscribe(() => {
        alert('Veiculo excluido com sucesso!');
        this.getVeiculos();
      }, err => alert(err));
    }
  }

  editVeiculo(veiculo: Veiculo) {
    this.isEditing = true;
    this.veiculoService.getOne(veiculo.id).subscribe((veiculoRes: Veiculo) => {
      delete veiculoRes.created;
      delete veiculoRes.updated;
      this.formVeiculo.setValue(veiculoRes);
    });
  }

  cancelEdit() {
    this.isEditing = false;
    this.formVeiculo.reset();
  }

  atualizar() {
    const veiculo = this.formVeiculo.value as Veiculo;
    this.veiculoService.put(this.formVeiculo.get('id')?.value, veiculo).subscribe((veiculoRes: Veiculo) => {
      alert('Veiculo atualizado com sucesso!');
     this.loadData();
     this.cancelEdit();
    }, err => alert(err));
  }
}
