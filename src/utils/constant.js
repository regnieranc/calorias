export const Role = '$2y$10$klyAF3F7Ny3RKdU48nNq3OSY8NYYpZkh74y80F/0y0LT97o4mwPFq'  // variable de admin localstorage

export const Hash = '$2y$10$u35WIHM0SwQVpbU2m/PO.esQCPihv3W1YuoGPz70IhqIu3q9zWEeS' //valor admin de bd

export const Token = '$2y$10$GkUN/KAWl4PIjFDzp2WNB.7K0bGi6DFBkfFUgd1B/hUijl3aEeH02'//"token" en localstorage, literal, la clave

export const AnimacionForm = 'fly down' //tipo de animacion de los formularios

export const AnimacionHeader = 'pulse' //tipo de animacion del header

export const TiempoAnimacion = 3000

export var MyHeaders = {
	'Accept': 'application/json',
	'Authorization': `Bearer ${localStorage.getItem(Token)}`
}

export const CantidadRegistros = 10