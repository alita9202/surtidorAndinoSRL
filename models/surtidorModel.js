const db = require('../config/db');

exports.traerTodasLasVentas = (callback) => {
    const consulta = 'SELECT * FROM Venta'; 
    db.query(consulta, (err, resultado) => {
        if (err) return callback(err);
        callback(null, resultado);
    });
};

exports.obtenerVentasPorTipoCombustible = (fechaInicio, fechaFin, callback) => {
    const consulta = 'CALL ReporteVentaPorTipoCombustible(?, ?)';
    db.query(consulta, [fechaInicio, fechaFin], (err, resultado) => {
        if (err) return callback(err);
        callback(null, resultado[0]);
    });
};

exports.obtenerVentasPorTipoVenta = (tipoVenta, callback) => {
    const consulta = 'CALL sp_ReporteVentasPorTipoVenta(?)';
    db.query(consulta, [tipoVenta], (err, resultado) => {
        if (err) return callback(err);
        callback(null, resultado[0]);
    });
};

exports.obtenerIngresosPorSurtidor = (idSurtidor, callback) => {
    const consulta = 'CALL sp_ReporteIngresosPorSurtidor(?)';
    db.query(consulta, [idSurtidor], (err, resultado) => {
        if (err) return callback(err);
        callback(null, resultado[0]);
    });
};

exports.obtenerNombresEmpleados = (callback) => {
    const consulta = 'SELECT Nombre_Empleado FROM Empleado';
    db.query(consulta, (err, resultado) => {
        if (err) return callback(err);
        callback(null, resultado.map(e => e.Nombre_Empleado));
    });
};


exports.compararMetasEmpleados = (emp1, emp2, callback) => {
    const consulta = 'CALL sp_CompararMetasEmpleados(?, ?)';
    db.query(consulta, [emp1, emp2], (err, resultado) => {
        if (err) return callback(err);
        callback(null, resultado[0]);
    });
};

exports.obtenerResumenGeneralMetas = (callback) => {
    const consulta = `
        SELECT 
            e.Nombre_Empleado,
            e.Meta_Venta,
            SUM(pc.Precio * pc.Unidad_Vendida) AS Total_Vendido,
            CASE 
                WHEN SUM(pc.Precio * pc.Unidad_Vendida) >= e.Meta_Venta THEN 'Meta Alcanzada'
                ELSE 'Meta No Alcanzada'
            END AS Estado_Meta
        FROM 
            Empleado e
        JOIN 
            Venta v ON e.CI = v.CI_Empleado
        JOIN 
            Producto_Combustible pc ON v.Id_Producto = pc.Id_Producto
        GROUP BY 
            e.Nombre_Empleado, e.Meta_Venta
        ORDER BY 
            Total_Vendido DESC
    `;
    db.query(consulta, (err, resultado) => {
        if (err) return callback(err);
        callback(null, resultado);
    });
};

exports.reporteNivelStock = (callback) => {
    const consulta = 'CALL sp_ReporteNivelStock()';
    db.query(consulta, (err, resultado) => {
        if (err) return callback(err);
        callback(null, resultado[0]);
    });
};


