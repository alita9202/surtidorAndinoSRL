const surtidorModel = require('../models/surtidorModel');

// Traer todas las ventas (ejemplo general)
exports.traerVentas = (req, res) => {
    surtidorModel.traerTodasLasVentas((err, ventas) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error al traer las ventas");
        }
        console.log(ventas);
        res.render('surtidor/ventas', { ventas });
    });
};


exports.reporteVentasPorTipoCombustible = (req, res) => {
    const { fechaInicio, fechaFin } = req.query;

    surtidorModel.obtenerVentasPorTipoCombustible(fechaInicio, fechaFin, (err, datos) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error al obtener el reporte");
        }
        console.log(datos);
        res.render('surtidor/ventasPorCombustibleTurno', {
            ventas: datos,
            fechaInicio,
            fechaFin
        });
    });
};


exports.reporteVentasPorTipoVenta = (req, res) => {
    const tipoVenta = req.query.tipoVenta || 'Particular'; 
    surtidorModel.obtenerVentasPorTipoVenta(tipoVenta, (err, datos) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al obtener el reporte');
        }
        res.render('surtidor/ventasPorTipoVenta', { ventas: datos, tipoVenta });
    });
};

exports.reporteIngresosPorSurtidor = (req, res) => {
    const idSurtidor = req.query.idSurtidor || 1; 
    surtidorModel.obtenerIngresosPorSurtidor(idSurtidor, (err, datos) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al obtener el reporte');
        }
        res.render('surtidor/ingresosPorSurtidor', { ingresos: datos, idSurtidor });
    });
};


exports.reporteCompararMetas = (req, res) => {
    const empleado1 = req.query.empleado1;
    const empleado2 = req.query.empleado2;

    surtidorModel.obtenerNombresEmpleados((err, empleados) => {
        if (err) return res.status(500).send('Error cargando empleados');

        surtidorModel.obtenerResumenGeneralMetas((err, resumen) => {
            if (err) return res.status(500).send('Error cargando resumen');

            if (empleado1 && empleado2) {
                surtidorModel.compararMetasEmpleados(empleado1, empleado2, (err, resultado) => {
                    if (err) return res.status(500).send('Error comparando metas');
                    res.render('surtidor/compararMetas', {
                        empleados,
                        empleado1,
                        empleado2,
                        resultados: resultado,
                        resumen
                    });
                });
            } else {
                res.render('surtidor/compararMetas', {
                    empleados,
                    empleado1: null,
                    empleado2: null,
                    resultados: null,
                    resumen
                });
            }
        });
    });
};

exports.reporteCompararMetas = (req, res) => {
    const empleado1 = req.query.empleado1;
    const empleado2 = req.query.empleado2;

    surtidorModel.obtenerNombresEmpleados((err, empleados) => {
        if (err) return res.status(500).send('Error cargando empleados');

        surtidorModel.obtenerResumenGeneralMetas((err, resumen) => {
            if (err) return res.status(500).send('Error cargando resumen');

            if (empleado1 && empleado2) {
                surtidorModel.compararMetasEmpleados(empleado1, empleado2, (err, resultado) => {
                    if (err) return res.status(500).send('Error comparando metas');

                    res.render('surtidor/compararMetas', {
                        empleados,
                        empleado1,
                        empleado2,
                        resultados: resultado,
                        resumen
                    });
                });
            } else {
                res.render('surtidor/compararMetas', {
                    empleados,
                    empleado1: null,
                    empleado2: null,
                    resultados: null,
                    resumen
                });
            }
        });
    });
};



exports.reporteNivelStock = (req, res) => {
    surtidorModel.reporteNivelStock((err, datos) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error al obtener el nivel de stock');
        }
        res.render('surtidor/reporteNivelStock', { stock: datos });
    });
};



