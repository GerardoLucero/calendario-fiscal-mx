# Calendario Fiscal MX

<!-- BADGES-DONATIONS-START -->
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Donate-orange?logo=ko-fi)](https://ko-fi.com/gerardolucero)
[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support-yellow?logo=buy-me-a-coffee)](https://buymeacoffee.com/lucerorios0)
<!-- BADGES-DONATIONS-END -->

[![npm version](https://badge.fury.io/js/calendario-fiscal-mx.svg)](https://badge.fury.io/js/calendario-fiscal-mx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Calendario completo de **obligaciones fiscales mexicanas** del SAT con fechas límite, cálculo automático de vencimientos y recordatorios para cumplir con las obligaciones tributarias.

## 🚀 Características

- 📅 **Obligaciones fiscales del SAT** - Calendario oficial actualizado
- ⏰ **Fechas límite automáticas** - Cálculo preciso de vencimientos
- 🏦 **Múltiples regímenes** - Personas físicas, morales, RESICO, etc.
- 📊 **Periodicidad flexible** - Mensual, bimestral, trimestral, anual
- 🔔 **Sistema de alertas** - Recordatorios antes del vencimiento
- 📈 **Planificación fiscal** - Vista anual de obligaciones
- 🏷️ **Clasificación por tipo** - Declaraciones, pagos, avisos
- ✨ **Días hábiles** - Considera feriados oficiales mexicanos
- 🎯 **Filtros avanzados** - Por régimen, tipo, período

## 📦 Instalación

```bash
npm install calendario-fiscal-mx
```

## 🔧 Uso

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

## 📅 Obligaciones Fiscales Principales

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

## 📄 Licencia

MIT © [Gerardo Lucero](https://github.com/GerardoLucero)

<!-- DONATIONS-START -->
## 💖 Apoya el Ecosistema Mexicano OSS

Si estos paquetes te ayudan (RFC, ISR, Nómina, Bancos, Feriados, Nombres, Códigos Postales, Validadores), considera invitarme un café o apoyar el mantenimiento:

- [Ko-fi](https://ko-fi.com/gerardolucero)
- [Buy Me a Coffee](https://buymeacoffee.com/lucerorios0)

> Gracias por tu apoyo 🙌. Priorizaré issues/PRs con **contexto de uso en México** (SAT/IMSS/INFONAVIT, bancos, feriados) y publicaré avances en los READMEs.
<!-- DONATIONS-END -->
