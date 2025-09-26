/**
 * Calendario de obligaciones fiscales del SAT
 * @author Gerardo Lucero
 * @version 1.0.0
 */
/**
 * Función principal de la librería
 * @param {any} input - Parámetro de entrada
 * @returns {any} Resultado procesado
 */
export function main(input: any): any;
/**
 * Función de validación
 * @param {any} data - Datos a validar
 * @returns {boolean} True si es válido
 */
export function validar(data: any): boolean;
/**
 * Función de búsqueda
 * @param {string} query - Término de búsqueda
 * @returns {Array} Resultados encontrados
 */
export function buscar(query: string): any[];
/**
 * Obtiene estadísticas
 * @returns {Object} Estadísticas del módulo
 */
export function getEstadisticas(): any;
declare namespace _default {
    export { main };
    export { validar };
    export { buscar };
    export { getEstadisticas };
}
export default _default;
