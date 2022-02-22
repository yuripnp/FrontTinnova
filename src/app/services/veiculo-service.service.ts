import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CorType, MarcaType, Veiculo } from '../model/Veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculoServiceService {

  constructor(private httpCliente: HttpClient) { }

  getOne(veiculoId?: number) {
    return this.httpCliente.get(`${environment.baseUrl}/veiculos/${veiculoId}`);
  }

  findAll(veiculo: string, marca: MarcaType, cor: CorType) {
    return this.httpCliente.get(`${environment.baseUrl}/veiculos?veiculo=${veiculo}&marca=${veiculo}&cor=${cor}`);
  }

  post(veiculo: Veiculo) {
    return this.httpCliente.post(`${environment.baseUrl}/veiculos`, veiculo);
  }

  getAll() {
    return this.httpCliente.get<Array<Veiculo>>(`${environment.baseUrl}/veiculos`);
  }

  put(veiculoId?: number, veiculo?: Veiculo) {
    return this.httpCliente.put(`${environment.baseUrl}/veiculos/${veiculoId}`, veiculo);
  }

  patch(veiculoId: number, veiculo: any) {
    return this.httpCliente.patch(`${environment.baseUrl}/veiculos/${veiculoId}`, veiculo);
  }

  delete(veiculoId?: number) {
    return this.httpCliente.delete(`${environment.baseUrl}/veiculos/${veiculoId}`);
  }

  getAllVeiculosNaoVendidos() {
    return this.httpCliente.get<{quantidade: number}>(`${environment.baseUrl}/veiculos/qnt-veiculos-nao-vendidos`);
  }

  getVeiculosAgrupadosPorDecada() {
    return this.httpCliente.get(`${environment.baseUrl}/veiculos/veiculos-agrupados-por-decadas`);
  }

  getVeiculosAgrupadosPorMarca() {
    return this.httpCliente.get(`${environment.baseUrl}/veiculos/veiculos-agrupados-por-marca`);
  }

  getVeiculosByLastWeek() {
    return this.httpCliente.get<Array<Veiculo>>(`${environment.baseUrl}/veiculos/veiculos-last-week`);
  }


}
