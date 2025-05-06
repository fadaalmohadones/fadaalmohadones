document.addEventListener("DOMContentLoaded", async () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // Mes actual (1-12)
  const currentMonthName=now.toLocaleString("es-ES", { month: "long", year: "numeric" });
  const currentYear = now.getFullYear();

  const prevDate = new Date(currentYear, now.getMonth() - 1);
  const prevMonth = prevDate.getMonth() + 1;
  const prevMonthName=prevDate.toLocaleString("es-ES", { month: "long", year: "numeric" });
  const prevYear = prevDate.getFullYear();

  const mesActualNombre = now.toLocaleString("es-ES", { month: "long", year: "numeric" });
  const mesAnteriorNombre = prevDate.toLocaleString("es-ES", { month: "long", year: "numeric" });
    document.getElementById("mes-actual").textContent = `${currentMonthName}`;
    document.getElementById("mes-anterior").textContent = `${prevMonthName}`;
  
    
  try {
    const [actualRes, anteriorRes] = await Promise.all([
      fetch(`http://localhost:3000/api/orders/month/${String(currentMonth).padStart(2, '0')}/${currentYear}`),
      fetch(`http://localhost:3000/api/orders/month/${String(prevMonth).padStart(2, '0')}/${prevYear}`)
    ]);

    const actualData = await actualRes.json();
    const anteriorData = await anteriorRes.json();

    // Actual
    document.getElementById("facturacion-actual").textContent = `$${actualData.monthBilling.toLocaleString()}`;
    document.getElementById("cantidad-pedidos-actual").textContent = `${actualData.ordersQuantity}`;
    document.getElementById("produccion-actual").textContent = `$${actualData.totalProduccionCost.toLocaleString()}`;

    // Anterior
    document.getElementById("facturacion-anterior").textContent = `$${anteriorData.monthBilling.toLocaleString()}`;
    document.getElementById("cantidad-pedidos-anterior").textContent = `${anteriorData.ordersQuantity}`;
    document.getElementById("produccion-anterior").textContent = `$${anteriorData.totalProduccionCost.toLocaleString()}`;

  } catch (error) {
    console.error("Error al cargar datos del dashboard:", error);
  }

  // Usuario simulado
  const params = new URLSearchParams(window.location.search);
  const username = params.get("user");
  if (username) {
    document.getElementById("user-name").textContent = username;
  }
  });
  