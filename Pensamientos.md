## Problemas con Jest

Durante la configuración inicial de Jest para Angular hubo varios problemas:

1. **Paquetes Jest faltantes**: Fue necesario instalar la paqueteria necesaria.

2. **Faltaba configurar tsconfig.spec.json**: Se creo una configuracion basica.

2. **jest-preset-angular v16**: requiere setup especifico
   ```typescript
   // setup-jest.ts
   import 'jest-preset-angular/setup-env/zone';
   ```
---

## Lo que quedó fuera

### 1. Ordenamiento por Prioridad
No implementado. El requerimiento dice que las tareas de mayor prioridad deben aparecer primero.

Agregar un .sort() en el computed:
```typescript
public filteredTodos = computed(() => {
  const todos = [...this._todos()].sort((a, b) => b.priority - a.priority);
});
```

### 2. Persistencia (localStorage / API)
El codigo usa solo signals en memoria. Si el usuario actualiza la pagina, pierde los datos.

- Opcion principal: Guardar en localStorage en el effect del signal
- Alternativa: Consumir dummyjson para datos reales - No existee persistencia se deberia de ampliar a usar localStorage pero separando deleted y added.

### 3. Validación de Formulario
Solo validacion de required. Faltaria validar longitud minima/maxima del titulo y mostrar mensajes de error.

### 4. Tests E2E (Cypress/Playwright - Testing Library)
Solo hay tests unitarios.


### 5. Cambiar prioridad de la tarea
Solo hay delete. Faltaria agregar la posibiliad de cambiar la prioridad.

### 6. Editar Tarea Existente
Solo hay delete. Faltaria agregar modo de edicion (Nuevo formulario).

---

## Bugs conocidos (sin corregir por tiempo)

### SVG acciona cambiar el estado completed en vez de prioridad
- Se buscaba cambiar prioridad (Baja <-> Alta)
- Lo que hace actualmente: marca como completada/incompleta
- El checkbox es el que realmente deberia de cambiar los estados de completado, no esta con este comportamiento.

### Count lee del DOM
- Actual: document.querySelectorAll("#todoList>li").length
- Deberia ser: store.filteredTodos().length

---

## Decisiones de Diseño

1. **Signal-based Store**: Angular Signals para estado reactivo, moderno y sin necesidad de NgRx
2. **Computed para filteredTodos**: filtering declarativo y reactivo automaticamente
3. **Tailwind**: Ya estaba previamente configurado
4. **Tests agrupados por contexto**: mejor mantenimiento y lectura