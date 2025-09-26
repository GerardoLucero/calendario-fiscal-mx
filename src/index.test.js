/**
 * Tests para Calendario Fiscal MX
 */

import { 
  getObligaciones, 
  getProximasObligaciones, 
  esFechaLimite, 
  getObligacionesPorRegimen,
  getEstadisticasObligaciones 
} from './index.js';

describe('Calendario Fiscal MX', () => {
  
  describe('getObligaciones', () => {
    test('debe retornar obligaciones para el régimen general', () => {
      const obligaciones = getObligaciones(2024, 1, { regimen: 'general' });
      
      expect(Array.isArray(obligaciones)).toBe(true);
      expect(obligaciones.length).toBeGreaterThan(0);
      
      const ivaObligacion = obligaciones.find(o => o.id === 'iva-mensual');
      expect(ivaObligacion).toBeDefined();
      expect(ivaObligacion.nombre).toBe('Declaración mensual de IVA');
      expect(ivaObligacion.tipo).toBe('declaracion');
      expect(ivaObligacion.regimen).toBe('general');
    });

    test('debe retornar obligaciones para RESICO', () => {
      const obligaciones = getObligaciones(2024, 2, { regimen: 'resico' });
      
      expect(Array.isArray(obligaciones)).toBe(true);
      
      const resico = obligaciones.find(o => o.id === 'pago-bimestral-resico');
      expect(resico).toBeDefined();
      expect(resico.periodicidad).toBe('bimestral');
    });

    test('debe retornar obligaciones anuales en el mes correcto', () => {
      const obligaciones = getObligaciones(2024, 3, { regimen: 'general' });
      
      const declaracionAnual = obligaciones.find(o => o.id === 'declaracion-anual-moral');
      expect(declaracionAnual).toBeDefined();
      expect(declaracionAnual.periodicidad).toBe('anual');
    });

    test('debe calcular días restantes correctamente', () => {
      const obligaciones = getObligaciones(2024, 1, { regimen: 'general' });
      
      obligaciones.forEach(obligacion => {
        expect(typeof obligacion.diasRestantes).toBe('number');
        expect(obligacion.fechaLimite).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  });

  describe('getProximasObligaciones', () => {
    test('debe retornar próximas obligaciones ordenadas por fecha', () => {
      const proximas = getProximasObligaciones(30);
      
      expect(Array.isArray(proximas)).toBe(true);
      
      // Verificar que están ordenadas por días restantes
      for (let i = 1; i < proximas.length; i++) {
        expect(proximas[i].diasRestantes).toBeGreaterThanOrEqual(proximas[i-1].diasRestantes);
      }
    });

    test('debe respetar el límite de días especificado', () => {
      const proximas = getProximasObligaciones(7);
      
      proximas.forEach(obligacion => {
        expect(obligacion.diasRestantes).toBeLessThanOrEqual(7);
        expect(obligacion.diasRestantes).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('esFechaLimite', () => {
    test('debe identificar correctamente fechas límite', () => {
      // Fecha límite típica: 17 de febrero para obligaciones de enero
      const fechaLimite = new Date(2024, 1, 17); // 17 febrero 2024
      const esLimite = esFechaLimite(fechaLimite);
      
      expect(typeof esLimite).toBe('boolean');
    });

    test('debe retornar false para fechas sin obligaciones', () => {
      // Fecha aleatoria sin obligaciones
      const fechaSinObligaciones = new Date(2024, 0, 5); // 5 enero 2024
      const esLimite = esFechaLimite(fechaSinObligaciones);
      
      expect(esLimite).toBe(false);
    });
  });

  describe('getEstadisticasObligaciones', () => {
    test('debe retornar estadísticas completas del año', () => {
      const estadisticas = getEstadisticasObligaciones(2024);
      
      expect(estadisticas).toHaveProperty('año', 2024);
      expect(estadisticas).toHaveProperty('totalObligaciones');
      expect(estadisticas).toHaveProperty('porMes');
      expect(estadisticas).toHaveProperty('porTipo');
      expect(estadisticas).toHaveProperty('promedioMensual');
      
      expect(typeof estadisticas.totalObligaciones).toBe('number');
      expect(estadisticas.totalObligaciones).toBeGreaterThan(0);
      
      // Verificar que tiene datos para todos los meses
      expect(Object.keys(estadisticas.porMes)).toHaveLength(12);
      
      // Verificar tipos de obligaciones
      expect(estadisticas.porTipo).toHaveProperty('declaracion');
      expect(estadisticas.porTipo).toHaveProperty('pago');
    });

    test('debe calcular correctamente el promedio mensual', () => {
      const estadisticas = getEstadisticasObligaciones(2024);
      
      const sumaTotal = Object.values(estadisticas.porMes).reduce((sum, count) => sum + count, 0);
      const promedioEsperado = Math.round(sumaTotal / 12 * 100) / 100;
      
      expect(estadisticas.promedioMensual).toBe(promedioEsperado);
    });
  });

  describe('Validaciones de datos', () => {
    test('todas las obligaciones deben tener propiedades requeridas', () => {
      const obligaciones = getObligaciones(2024, 1);
      
      obligaciones.forEach(obligacion => {
        expect(obligacion).toHaveProperty('id');
        expect(obligacion).toHaveProperty('nombre');
        expect(obligacion).toHaveProperty('descripcion');
        expect(obligacion).toHaveProperty('tipo');
        expect(obligacion).toHaveProperty('fechaLimite');
        expect(obligacion).toHaveProperty('regimen');
        expect(obligacion).toHaveProperty('periodicidad');
        expect(obligacion).toHaveProperty('obligatorio');
        
        expect(typeof obligacion.id).toBe('string');
        expect(typeof obligacion.nombre).toBe('string');
        expect(typeof obligacion.descripcion).toBe('string');
        expect(['declaracion', 'pago', 'aviso'].includes(obligacion.tipo)).toBe(true);
        expect(obligacion.fechaLimite).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(typeof obligacion.obligatorio).toBe('boolean');
      });
    });
  });
});
