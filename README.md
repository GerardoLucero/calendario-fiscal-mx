# calendario-fiscal-mx

Calendario completo de obligaciones fiscales mexicanas del SAT con fechas límite, cálculo automático de vencimientos y recordatorios para cumplir con las obligaciones tributarias.

[![Ko-fi](https://img.shields.io/badge/Ko--fi-FF5E5B?style=flat&logo=ko-fi&logoColor=white)](https://ko-fi.com/gerardolucero)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/lucerorios0)
[![GitHub Stars](https://img.shields.io/github/stars/GerardoLucero/calendario-fiscal-mx?style=social)](https://github.com/GerardoLucero/calendario-fiscal-mx)
[![npm version](https://badge.fury.io/js/calendario-fiscal-mx.svg)](https://badge.fury.io/js/calendario-fiscal-mx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Obligaciones fiscales del SAT** — calendario oficial actualizado
- **Fechas límite automáticas** — cálculo preciso de vencimientos
- **Múltiples regímenes** — personas físicas, morales, RESICO, etc.
- **Periodicidad flexible** — mensual, bimestral, trimestral, anual
- **Sistema de alertas** — recordatorios antes del vencimiento
- **Planificación fiscal** — vista anual de obligaciones
- **Clasificación por tipo** — declaraciones, pagos, avisos
- **Días hábiles** — considera feriados oficiales mexicanos
- **Filtros avanzados** — por régimen, tipo, período

## Instalación

```bash
npm install calendario-fiscal-mx
```

## Uso

```javascript
// ES6 Modules
import { getObligaciones, getProximasObligaciones, esFechaLimite } from 'calendario-fiscal-mx';

// Obtener obligaciones del mes actual
const obligacionesMes = getObligaciones();
console.log(obligacionesMes);

// Próximas obligaciones (siguientes 30 días)
const proximas = getProximasObligaciones();
console.log(proximas);
// [
//   {
//     nombre: 'Declaración mensual de IVA',
//     fechaLimite: '2024-01-17',
//     tipo: 'declaracion',
//     regimen: 'general',
//     diasRestantes: 5
//   }
// ]
```

## Obligaciones fiscales principales

### Régimen General
- **IVA Mensual**: Día 17 del mes siguiente
- **ISR Provisional**: Día 17 del mes siguiente
- **Retenciones ISR**: Día 17 del mes siguiente
- **Declaración Anual**: 31 de marzo

### RESICO
- **Pagos Bimestrales**: Día 17 del mes siguiente al bimestre
- **Declaración Anual**: 30 de abril

### Personas Físicas
- **Pagos Provisionales**: Día 17 del mes siguiente
- **Declaración Anual**: 30 de abril

## Licencia

MIT © [Gerardo Lucero](https://github.com/GerardoLucero)
