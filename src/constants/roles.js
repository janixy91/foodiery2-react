// Definición de los roles y sus equivalencias en puntos
const roles = [
  { nombre: "Explorador de Sabores", nivel: 1, puntos: 100 },
  { nombre: "Explorador de Sabores", nivel: 2, puntos: 200 },
  { nombre: "Explorador de Sabores", nivel: 3, puntos: 300 },
  { nombre: "Catador Aficionado", nivel: 1, puntos: 500 },
  { nombre: "Catador Aficionado", nivel: 2, puntos: 900 },
  { nombre: "Catador Aficionado", nivel: 3, puntos: 1400 },
  { nombre: "Gastrónomo Curioso", nivel: 1, puntos: 2300 },
  { nombre: "Gastrónomo Curioso", nivel: 2, puntos: 3300 },
  { nombre: "Gastrónomo Curioso", nivel: 3, puntos: 5600 },
  { nombre: "Degustador Aventurero", nivel: 1, puntos: 8900 },
  { nombre: "Degustador Aventurero", nivel: 2, puntos: 14500 },
  { nombre: "Degustador Aventurero", nivel: 3, puntos: 23400 },
  { nombre: "Gourmet Novato", nivel: 1, puntos: 37900 },
  { nombre: "Gourmet Novato", nivel: 2, puntos: 61300 },
  { nombre: "Gourmet Novato", nivel: 3, puntos: 99200 },
  { nombre: "Saboreador Entusiasta", nivel: 1, puntos: 159200 },
  { nombre: "Saboreador Entusiasta", nivel: 2, puntos: 258500 },
  { nombre: "Saboreador Entusiasta", nivel: 3, puntos: 417700 },
  { nombre: "Conocedor en Prácticas", nivel: 1, puntos: 676400 },
  { nombre: "Conocedor en Prácticas", nivel: 2, puntos: 1092100 },
  { nombre: "Conocedor en Prácticas", nivel: 3, puntos: 1768500 },
  { nombre: "Maestro del Bocado", nivel: 1, puntos: 7200000 },
  { nombre: "Maestro del Bocado", nivel: 2, puntos: 11608500 },
  { nombre: "Maestro del Bocado", nivel: 3, puntos: 18808500 },
  { nombre: "Aficionado Épico", nivel: 1, puntos: 19485000 },
  { nombre: "Aficionado Épico", nivel: 2, puntos: 31423500 },
  { nombre: "Aficionado Épico", nivel: 3, puntos: 50908500 },
  { nombre: "Cazador de Platos", nivel: 1, puntos: 158217500 },
  { nombre: "Cazador de Platos", nivel: 2, puntos: 256126000 },
  { nombre: "Cazador de Platos", nivel: 3, puntos: 414343500 },
  { nombre: "Epicúreo Dedicado", nivel: 1, puntos: 672153500 },
  { nombre: "Epicúreo Dedicado", nivel: 2, puntos: 1087499500 },
  { nombre: "Epicúreo Dedicado", nivel: 3, puntos: 1759653000 },
  { nombre: "Gastrónomo Apasionado", nivel: 1, puntos: 1836866500 },
  { nombre: "Gastrónomo Apasionado", nivel: 2, puntos: 2976526000 },
  { nombre: "Gastrónomo Apasionado", nivel: 3, puntos: 4813392500 },
  { nombre: "Crítico Conocedor", nivel: 1, puntos: 6610079000 },
  { nombre: "Crítico Conocedor", nivel: 2, puntos: 10713447500 },
  { nombre: "Crítico Conocedor", nivel: 3, puntos: 17323526500 },
  { nombre: "Gourmet Experto", nivel: 1, puntos: 23537005500 },
  { nombre: "Gourmet Experto", nivel: 2, puntos: 38060572000 },
  { nombre: "Catador de Lujo", puntos: 1500 },
  { nombre: "Gastrónomo Supremo", puntos: 1600 },
  { nombre: "Crítico de Sabores", puntos: 1700 },
  { nombre: "Saboreador Legendario", puntos: 1800 },
  { nombre: "Epicúreo Élite", puntos: 1900 },
  { nombre: "Gurú del Gusto", puntos: 2000 },
  { nombre: "Degustador Supremo", puntos: 2100 },
  { nombre: "Epicúreo Viajero", puntos: 2200 },
  { nombre: "Cazador de Delicias", puntos: 2300 },
  { nombre: "Explorador Epicúreo", puntos: 2400 },
  { nombre: "Conocedor Supremo", puntos: 2500 },
  { nombre: "Gastrónomo Ilustre", puntos: 2600 },
  { nombre: "Saboreador Insigne", puntos: 2700 },
  { nombre: "Catador de Élite", puntos: 2800 },
  { nombre: "Epicúreo Magistral", puntos: 2900 },
  { nombre: "Crítico Espléndido", puntos: 3000 },
  { nombre: "Gurú Sabroso", puntos: 3100 },
  { nombre: "Gastrónomo Magistral", puntos: 3200 },
  { nombre: "Catador Inigualable", puntos: 3300 },
  { nombre: "Degustador Fenomenal", puntos: 3400 },
  { nombre: "Saboreador Máximo", puntos: 3500 },
  { nombre: "Epicúreo Esencial", puntos: 3600 },
  { nombre: "Conocedor Primario", puntos: 3700 },
  { nombre: "Explorador Gastronómico", puntos: 3800 },
  { nombre: "Gurú Epicúreo", puntos: 3900 },
  { nombre: "Gastrónomo Preeminente", puntos: 4000 },
  { nombre: "Catador Distinguido", puntos: 4100 },
  { nombre: "Saboreador Eminente", puntos: 4200 },
  { nombre: "Epicúreo Excepcional", puntos: 4300 },
  { nombre: "Crítico Sensacional", puntos: 4400 },
  { nombre: "Degustador Notable", puntos: 4500 },
  { nombre: "Cazador Sensacional", puntos: 4600 },
  { nombre: "Gurú del Sabor", puntos: 4700 },
  { nombre: "Conocedor Extraordinario", puntos: 4800 },
  { nombre: "Saboreador Superior", puntos: 4900 },
  { nombre: "Epicúreo Supremo", puntos: 5000 },
];

// Función para determinar el rol y nivel basado en la cantidad de puntos del usuario
export function determinarRolYnivel(puntosUsuario) {
  // Ordenar roles por cantidad de puntos de menor a mayor
  const rolesOrdenados = roles.sort((a, b) => a.puntos - b.puntos);

  // Buscar el primer rol que tenga una cantidad de puntos mayor o igual que los puntos del usuario
  let rol = rolesOrdenados.find((rol) => rol.puntos >= puntosUsuario);

  // Si no se encontró ningún rol, significa que el usuario tiene más puntos que el último rol en la lista
  if (!rol) {
    rol = rolesOrdenados[rolesOrdenados.length - 1]; // Seleccionar el último rol
  }

  return rol;
}
