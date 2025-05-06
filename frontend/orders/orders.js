document.addEventListener("DOMContentLoaded", async () => {
    const activeOrders = document.getElementById("active-orders-table-body");
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
    let orderToDeleteId = null;
  
    async function loadOrders() {
      try {
        const res = await fetch("http://localhost:3000/api/orders/active");
        const orders = await res.json();
  
        activeOrders.innerHTML = "";
        orders.orders.forEach((order) => {
          const tr = document.createElement("tr");
  
          tr.innerHTML = `
            <td>${order.order_id}</td>
            <td>${order.client_name}</td>
            <td>$${order.total}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-success btn-deliver" data-id="${order.order_id}">Marcar entrega</button>
            </td>
            <td>
              <a href="edit-order.html?id=${order.order_id}" class="btn btn-sm btn-warning">Editar</a>
              <button class="btn btn-sm btn-danger btn-delete" data-id="${order.order_id}">Eliminar</button>
            </td>
          `;
  
          activeOrders.appendChild(tr);
        });
  
        // Botón eliminar
        document.querySelectorAll(".btn-delete").forEach((btn) => {
          btn.addEventListener("click", () => {
            orderToDeleteId = btn.dataset.id;
            deleteModal.show();
          });
        });
  
        // Confirmar eliminación
        document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
          try {
            await fetch(`http://localhost:3000/api/orders/${orderToDeleteId}`, {
              method: "DELETE",
            });
            deleteModal.hide();
            loadOrders();
          } catch (error) {
            console.error("Error al eliminar:", error);
          }
        });
  
        // Botón marcar como entregado
        document.querySelectorAll(".btn-deliver").forEach((btn) => {
          btn.addEventListener("click", async () => {
            const orderId = btn.dataset.id;
            try {
              await fetch(`http://localhost:3000/api/orders/setAsDelivered/${orderId}/true`, {
                method: "PUT",
              });
              loadOrders();
            } catch (error) {
              console.error("Error al marcar como entregado:", error);
            }
          });
        });
  
      } catch (error) {
        console.error("Error al cargar órdenes:", error);
      }
    }
  
    loadOrders();
  });
  