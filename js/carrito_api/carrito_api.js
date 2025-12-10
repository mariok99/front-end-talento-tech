const KEY = "carrito";
//CARRITO ES NULL, DONDE SE DEBE INICIA?
export const guardar_carrito = (carrito) => {
    localStorage.setItem(KEY, JSON.stringify(carrito));
    
};

export const obtener_carrito = () => {
    return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const vaciar_carrito = () => {
    localStorage.removeItem(KEY);
};