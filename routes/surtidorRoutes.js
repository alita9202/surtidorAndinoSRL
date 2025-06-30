const express = require('express');
const route = express.Router();
const surtidorControlador = require('../controllers/surtidorController');

route.get('/', surtidorControlador.traerVentas);

route.get('/reporte/ventas-por-combustible', surtidorControlador.reporteVentasPorTipoCombustible);
route.get('/reporte/ventas-por-tipo-venta', surtidorControlador.reporteVentasPorTipoVenta);
route.get('/reporte/ingresos-por-surtidor', surtidorControlador.reporteIngresosPorSurtidor);
route.get('/reporte/comparar-metas', surtidorControlador.reporteCompararMetas);
route.get('/reporte/nivel-stock', surtidorControlador.reporteNivelStock);


module.exports = route;
