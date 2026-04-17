export interface ImportationRequest {
  weightKg: number;
  productValue: number; // FOB
  isVip: boolean;
  monthlyVolume: number; // Para determinar si baja de $12 a $9.5
}

export interface ImportationResult {
  flete: number;
  impuestos: number;
  totalPagar: number;
}