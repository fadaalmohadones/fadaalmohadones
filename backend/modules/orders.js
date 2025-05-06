const express = require('express');
const pool = require('../config/db');  // Importa la conexión a PostgreSQL
const authMiddleware = require('../config/auth'); // Importa autenticación

const router = express.Router();

// Ruta protegida para obtener la facturación
router.get('/month/:mes/:anio', async (req, res) => {
    try {
        const { mes, anio } = req.params;

        let totalBilling = 0;
        const result = await pool.query('SELECT * FROM "Orders" WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2', [mes, anio]);

        result.rows.forEach(order => {
            totalBilling += Number(order.subtotal);
        });

        const result1 = await pool.query(
            `SELECT 
                SUM(p."productionValue" * pxo.quantity) AS "totalProductionCost"
             FROM 
                "Orders" o
             JOIN 
                "ProductsxOrders" pxo ON o.id = pxo."fkOrder"
             JOIN 
                "Products" p ON pxo."skuProduct" = p.sku
             WHERE 
                EXTRACT(MONTH FROM o.date) = $1
                AND EXTRACT(YEAR FROM o.date) = $2`,
            [mes, anio]
        );

        const totalProductionCost = result1.rows[0].totalProductionCost || 0;

        res.status(200).json({ "monthBilling":totalBilling,"ordersQuantity":result.rows.length,"totalProduccionCost":  totalProductionCost}); // Devuelve el total
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la facturación' });
    }
});

router.get('/active', async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT 
              o.id AS order_id, 
              o.total, 
              c.name AS client_name 
            FROM "Orders" o
            INNER JOIN "Clients" c ON o."fkClient" = c.id
            WHERE o.delivered = false
          `);
        const orders=result.rows;
        res.status(200).json({orders }); // Devuelve el total
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las ordenes' });
    }
});

router.put('/setAsDelivered/:id/:delivered', async (req, res) => {
    const { id, delivered } = req.params;
    try {
      await pool.query('UPDATE "Orders" SET delivered = $1 WHERE id = $2', [delivered, id]);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'No se pudo actualizar el estado de entrega' });
    }
  });


  router.delete('/:id/', async (req, res) => {
    const { id } = req.params;

    try {
      await pool.query('DELETE FROM "Orders" WHERE id = $1', [id]);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'No se pudo actualizar el estado de entrega' });
    }
  });
module.exports = router;