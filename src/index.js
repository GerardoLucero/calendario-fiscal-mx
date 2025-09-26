/**
 * Calendario Fiscal MX - Obligaciones fiscales del SAT
 * @author Gerardo Lucero
 * @license MIT
 */

// Datos de obligaciones fiscales por régimen
const OBLIGACIONES_FISCALES = {
  general: {
    mensual: [
      {
        id: 'iva-mensual',
        nombre: 'Declaración mensual de IVA',
        descripcion: 'Declaración mensual del Impuesto al Valor Agregado',
        tipo: 'declaracion',
        diaLimite: 17,
        forma: 'A-29'
      },
      {
        id: 'isr-provisional',
        nombre: 'ISR Provisional',
        descripcion: 'Pago provisional del Impuesto Sobre la Renta',
        tipo: 'pago',
        diaLimite: 17,
        forma: 'A-5'
      }
    ],
    anual: [
      {
        id: 'declaracion-anual-moral',
        nombre: 'Declaración Anual Personas Morales',
        descripcion: 'Declaración anual del ejercicio fiscal',
        tipo: 'declaracion',
        mes: 3,
        dia: 31,
        forma: 'A-2'
      }
    ]
  },
  resico: {
    bimestral: [
      {
        id: 'pago-bimestral-resico',
        nombre: 'Pago Bimestral RESICO',
        descripcion: 'Pago bimestral del Régimen Simplificado de Confianza',
        tipo: 'pago',
        diaLimite: 17,
        forma: 'A-6'
      }
    ],
    anual: [
      {
        id: 'declaracion-anual-resico',
        nombre: 'Declaración Anual RESICO',
        descripcion: 'Declaración anual del Régimen Simplificado de Confianza',
        tipo: 'declaracion',
        mes: 4,
        dia: 30,
        forma: 'A-7'
      }
    ]
  },
  persona_fisica: {
    mensual: [
      {
        id: 'pagos-provisionales-pf',
        nombre: 'Pagos Provisionales Persona Física',
        descripcion: 'Pagos provisionales de personas físicas',
        tipo: 'pago',
        diaLimite: 17,
        forma: 'A-3'
      }
    ],
    anual: [
      {
        id: 'declaracion-anual-pf',
        nombre: 'Declaración Anual Persona Física',
        descripcion: 'Declaración anual de personas físicas',
        tipo: 'declaracion',
        mes: 4,
        dia: 30,
        forma: 'A-4'
      }
    ]
  }
};

/**
 * Obtiene obligaciones fiscales de un período específico
 */
export function getObligaciones(año = new Date().getFullYear(), mes = new Date().getMonth() + 1, opciones = {}) {
  const {
    regimen = 'general',
    tipo = null,
    periodicidad = null
  } = opciones;
  
  const obligaciones = [];
  const regimensObligaciones = OBLIGACIONES_FISCALES[regimen] || OBLIGACIONES_FISCALES.general;
  
  // Obligaciones mensuales
  if (regimensObligaciones.mensual && (!periodicidad || periodicidad === 'mensual')) {
    regimensObligaciones.mensual.forEach(obligacion => {
      if (!tipo || obligacion.tipo === tipo) {
        const fechaLimite = new Date(año, mes, obligacion.diaLimite);
        const hoy = new Date();
        const diasRestantes = Math.ceil((fechaLimite - hoy) / (1000 * 60 * 60 * 24));
        
        obligaciones.push({
          ...obligacion,
          fechaLimite: fechaLimite.toISOString().split('T')[0],
          regimen,
          periodicidad: 'mensual',
          personaTipo: regimen === 'persona_fisica' ? 'fisica' : 'moral',
          obligatorio: true,
          diasRestantes
        });
      }
    });
  }
  
  // Obligaciones bimestrales
  if (regimensObligaciones.bimestral && (!periodicidad || periodicidad === 'bimestral')) {
    if (mes % 2 === 0) { // Solo en meses pares
      regimensObligaciones.bimestral.forEach(obligacion => {
        if (!tipo || obligacion.tipo === tipo) {
          const fechaLimite = new Date(año, mes, obligacion.diaLimite);
          const hoy = new Date();
          const diasRestantes = Math.ceil((fechaLimite - hoy) / (1000 * 60 * 60 * 24));
          
          obligaciones.push({
            ...obligacion,
            fechaLimite: fechaLimite.toISOString().split('T')[0],
            regimen,
            periodicidad: 'bimestral',
            personaTipo: 'moral',
            obligatorio: true,
            diasRestantes
          });
        }
      });
    }
  }
  
  // Obligaciones anuales
  if (regimensObligaciones.anual && (!periodicidad || periodicidad === 'anual')) {
    regimensObligaciones.anual.forEach(obligacion => {
      if (mes === obligacion.mes && (!tipo || obligacion.tipo === tipo)) {
        const fechaLimite = new Date(año, obligacion.mes - 1, obligacion.dia);
        const hoy = new Date();
        const diasRestantes = Math.ceil((fechaLimite - hoy) / (1000 * 60 * 60 * 24));
        
        obligaciones.push({
          ...obligacion,
          fechaLimite: fechaLimite.toISOString().split('T')[0],
          regimen,
          periodicidad: 'anual',
          personaTipo: regimen === 'persona_fisica' ? 'fisica' : 'moral',
          obligatorio: true,
          diasRestantes
        });
      }
    });
  }
  
  return obligaciones;
}

/**
 * Obtiene las próximas obligaciones fiscales
 */
export function getProximasObligaciones(dias = 30, opciones = {}) {
  const hoy = new Date();
  const obligacionesProximas = [];
  
  // Revisar los próximos 3 meses para capturar todas las obligaciones
  for (let i = 0; i < 3; i++) {
    const fecha = new Date(hoy.getFullYear(), hoy.getMonth() + i, 1);
    const obligacionesMes = getObligaciones(fecha.getFullYear(), fecha.getMonth() + 1, opciones);
    
    obligacionesMes.forEach(obligacion => {
      const fechaObligacion = new Date(obligacion.fechaLimite);
      const diasHasta = Math.ceil((fechaObligacion - hoy) / (1000 * 60 * 60 * 24));
      
      if (diasHasta >= 0 && diasHasta <= dias) {
        obligacionesProximas.push({
          ...obligacion,
          diasRestantes: diasHasta
        });
      }
    });
  }
  
  return obligacionesProximas.sort((a, b) => a.diasRestantes - b.diasRestantes);
}

/**
 * Verifica si una fecha específica tiene obligaciones fiscales
 */
export function esFechaLimite(fecha, opciones = {}) {
  const fechaStr = fecha.toISOString().split('T')[0];
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  
  const obligacionesMes = getObligaciones(año, mes, opciones);
  
  return obligacionesMes.some(obligacion => obligacion.fechaLimite === fechaStr);
}

/**
 * Obtiene obligaciones específicas de un régimen fiscal
 */
export function getObligacionesPorRegimen(regimen, año = new Date().getFullYear(), mes = new Date().getMonth() + 1) {
  return getObligaciones(año, mes, { regimen });
}

/**
 * Calcula estadísticas de obligaciones para un año
 */
export function getEstadisticasObligaciones(año = new Date().getFullYear()) {
  let totalObligaciones = 0;
  const porMes = {};
  const porTipo = { declaracion: 0, pago: 0, aviso: 0 };
  
  for (let mes = 1; mes <= 12; mes++) {
    const obligacionesMes = getObligaciones(año, mes);
    porMes[mes] = obligacionesMes.length;
    totalObligaciones += obligacionesMes.length;
    
    obligacionesMes.forEach(obligacion => {
      porTipo[obligacion.tipo] = (porTipo[obligacion.tipo] || 0) + 1;
    });
  }
  
  return {
    año,
    totalObligaciones,
    porMes,
    porTipo,
    promedioMensual: Math.round(totalObligaciones / 12 * 100) / 100
  };
}

// Exportación por defecto
export default {
  getObligaciones,
  getProximasObligaciones,
  esFechaLimite,
  getObligacionesPorRegimen,
  getEstadisticasObligaciones
};
