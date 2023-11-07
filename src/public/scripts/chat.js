// Obtén una referencia al panel que deseas mover
const chatHistoryPanel = document.getElementById("chat-history");

// Agrega un evento para detectar el movimiento del ratón
document.addEventListener("mousemove", movePanelOnMouseEdge);

// Función para mover el panel cuando el ratón pasa por el borde
function movePanelOnMouseEdge(event) {
    const panelWidth = chatHistoryPanel.clientWidth;
    const panelHeight = chatHistoryPanel.clientHeight;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const edgeThreshold = 20; // Puedes ajustar este valor para controlar cuán cerca del borde debe estar el ratón para activar el movimiento.

    if (mouseX < edgeThreshold) {
        // El ratón está en el borde izquierdo
        chatHistoryPanel.style.transform = `translateX(-${panelWidth}px)`;
    } else if (mouseX > screenWidth - edgeThreshold) {
        // El ratón está en el borde derecho
        chatHistoryPanel.style.transform = `translateX(${screenWidth}px)`;
    } else if (mouseY < edgeThreshold) {
        // El ratón está en el borde superior
        chatHistoryPanel.style.transform = `translateY(-${panelHeight}px)`;
    } else if (mouseY > screenHeight - edgeThreshold) {
        // El ratón está en el borde inferior
        chatHistoryPanel.style.transform = `translateY(${screenHeight}px)`;
    } else {
        // Restablece la posición si el ratón no está en el borde
        chatHistoryPanel.style.transform = "translate(0, 0)";
    }
}
