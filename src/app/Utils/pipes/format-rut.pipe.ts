import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'myRut' })
export class FormatRutPipe implements PipeTransform {

  constructor() { }

  /**
   * Formats numeric string to dotted/dashed
   **/
  transform(value: number | string): string {
    const rut = this.rutClean(String(value));

    // validate
    if (rut.length <= 1) { return rut; }

    // add dots and dashes
    let result = `${rut.slice(-4, -1)}-${rut.substr(rut.length - 1)}`;
    for (let i = 4; i < rut.length; i += 3) {
      result = `${rut.slice(-3 - i, -i)}.${result}`;
    }

    return result;
  }

  /**
   * Cleaner Wrapper
   **/
  parse(value: string): string {
    return this.rutClean(value);
  }

  /**
   * Replace odd characters
   **/
  rutClean(value: string) {
    const noLeadZeros = value.replace(/^0+/, ''); // remove lead zeros
    return typeof value === 'string' ? noLeadZeros.replace(/[^0-9kK]+/g, '').toUpperCase() : '';
  }
  checkRut(rut:string): boolean {
    if (rut === '' || rut === undefined || rut === null) {
      return false;
    } else {
      // Despejar Puntos
      let valor = rut.replace('.', '');
      // Despejar Guión
      valor = valor.replace('-', '');
      if (valor.length < 7) {
        return false;
      }

      // Aislar Cuerpo y Dígito Verificador
      const cuerpo = valor.slice(0, -1);
      var dv = valor.slice(-1).toUpperCase();

      // Formatear RUN
      rut = cuerpo + '-' + dv;

      // Si no cumple con el mínimo ej. (n.nnn.nnn)
      if (cuerpo.length < 7) {
        return false;
      }

      // Calcular Dígito Verificador
      let suma = 0;
      let multiplo = 2;
      // Para cada dígito del Cuerpo
      for ( var i = 1; i <= cuerpo.length; i++) {

        // Obtener su Producto con el Múltiplo Correspondiente
        const index = multiplo * Number(valor.charAt(cuerpo.length - i));

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

      }

      // Calcular Dígito Verificador en base al Módulo 11
      const dvEsperado = 11 - (suma % 11);
      const dvesperadin = dvEsperado.toString();
      // Casos Especiales (0 y K)
      dv = (dv === 'K') ? "10" : dv;
      dv = (dv === '0') ? "11" : dv;
      if (dvesperadin.toString() !== dv.toString()) {
        console.log('RUT Inválido');
        return false;
      } else if (dvesperadin === '10' && dv.toString() === '10') {
        return true;

      } else if (dvesperadin === '11' && dv.toString() === '11') {
        return true;
      } else {
        return true;
      }
    }
  }
  validaFechas(fechaprimero:Date, fechasegunda:Date, tipo: string): number {

    const lte = (n1:number, n2:number) => {
      return n1 <= n2;
    }
    const not = (o1: boolean) => !o1;

    /**
     * Obtiene la diferencia en meses de 2 fechas
     */
    const diffBetweenMonths = (dateFrom:Date, dateTo:Date) => {
      if (not(dateFrom instanceof Date)) dateFrom = new Date(dateFrom);
      if (not(dateTo instanceof Date)) dateTo = new Date(dateTo);

      let months = 0;

      months = (dateFrom.getFullYear() - dateTo.getFullYear()) * 12;
      months -= dateTo.getMonth() + 1;
      months += dateFrom.getMonth() + 1;

      return months <= 0 ? 0 : months;
    };

    var fecha1 = fechaprimero;
    var fecha2 = fechasegunda;

    /*if (not(lte(diffBetweenMonths(fecha1, fecha2), 1))) {
      console.log('Fecha superior a 1 meses');

      return 1;
    }*/
    if (tipo === "suscripcion") {
      if (not(lte(diffBetweenMonths(fecha1, fecha2), 6)) && tipo === "suscripcion" || diffBetweenMonths(fecha1, fecha2) === 6 && new Date(fecha2).getDate() < new Date(fecha1).getDate()) {
        console.log('Fecha superior a 6 meses');

        return 1;
      }

      /*   if ((lte(diffBetweenMonths(fecha1, fecha2), 5)) && tipo === "suscripcion") {
           console.log('Fecha superior a 6 meses');
   
           return 1;
         }*/
    }
    if (tipo === "vencimiento") {
      if (not(lte(diffBetweenMonths(fecha1, fecha2), 1) && tipo === "vencimiento") || diffBetweenMonths(fecha1, fecha2) === 1 && new Date(fecha1).getDate() > new Date(fecha2).getDate()) {
        console.log('Fecha superior a 1 meses');
        return 1;
      }
    }
    if (tipo === "vencimiento2y") {
      if (not(lte(diffBetweenMonths(fecha1, fecha2), 24) && tipo === "vencimiento2y") || diffBetweenMonths(fecha1, fecha2) === 24 && new Date(fecha1).getDate() > new Date(fecha2).getDate()) {
        console.log('Fecha superior a 24 meses meses');
        return 1;
      }
    }
    return 0;
  }
  rutSinDigito(rut: string): number {
    const rutSinDigito = parseInt(rut.substr(0, rut.length - 1));

    return rutSinDigito;
  }

  devuelveDigito(rut:string): any {
    if (rut === '' || rut === undefined || rut === null) {
      return false;
    } else {
      // Despejar Puntos
      var valor = rut.replace('.', '');
      // Despejar Guión
      valor = valor.replace('-', '');
      if (valor.length < 7) {
        return false;
      }

      // Aislar Cuerpo y Dígito Verificador
      const cuerpo = valor.slice(0, -1);
      var dv = valor.slice(-1).toUpperCase();

      // Formatear RUN
      rut = cuerpo + '-' + dv;

      // Si no cumple con el mínimo ej. (n.nnn.nnn)
      if (cuerpo.length < 7) {
        return false;
      }

      // Calcular Dígito Verificador
      let suma = 0;
      let multiplo = 2;
      // Para cada dígito del Cuerpo
      for (var i = 1; i <= cuerpo.length; i++) {

        // Obtener su Producto con el Múltiplo Correspondiente
        const index = multiplo * Number(valor.charAt(cuerpo.length - i));

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

      }

      // Calcular Dígito Verificador en base al Módulo 11
      const dvEsperado = 11 - (suma % 11);
      const dvesperadin = dvEsperado.toString();
      // Casos Especiales (0 y K)
      dv = (dv === 'K') ? "10" : dv;
      dv = (dv === '0') ? "11" : dv;

      // Validar que el Cuerpo coincide con su Dígito Verificador
      if (dvesperadin.toString() !== dv.toString()) {
        console.log('RUT Inválido');
        return false;
      } else if (dvesperadin === '10' && dv.toString() === '10') {
        return 'K';

      } else if (dvesperadin === '11' && dv.toString() === '11') {
        return '0';
      } else {
        return dv;
      }
    }
  }
}
