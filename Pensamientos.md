## Problemas con Jest

Durante la configuración inicial de Jest para Angular hubo varios problemas:

1. **Paquetes Jest faltantes**: Fue necesario instalar la paqueteria necesaria.

```json
  {
    "@types/jest": "^30.0.0",
    "jest": "^30.3.0",
    "jest-environment-jsdom": "^30.3.0",
    "jest-preset-angular": "^16.1.2",
    "jsdom": "^29.0.2",
  }
```

2. **Faltaba configurar tsconfig.spec.json**: Se creo una configuracion basica.

3. **jest-preset-angular**: La configuración inicial era incorrecta. Siguiendo la documentación, se actualizaron los imports correspondientes. Dado que estamos trabajando con Angular 21, se ha optado por un enfoque zoneless para evitar la necesidad de instalar zone.js, aunque esto requiere una configuración específica:

  ```typescript
   // setup-jest.ts
   import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

  setupZonelessTestEnv();
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

  - **Opción principal:**  
  Persistir los datos en `localStorage` utilizando un `effect` sobre el `signal`.

  - **Alternativa:**  
  Consumir la API de DummyJSON como se propone.  
  Dado que no existe persistencia en esta API, sería necesario ampliarlo combinándolo con `localStorage`, separando los elementos agregados y eliminados.

      - Crear un nuevo servicio para gestionar la comunicación con la API.
      - Utilizar un store para centralizar el estado y adaptarlo a esta integración.
      - Controlar duplicidad de peticiones

### 3. Validación de Formulario
No existe validacion del formulario, no hay control. Se deberia de agregar validacion de required, logitudes.

### 4. Tests E2E (Cypress/Playwright - Testing Library)
Solo hay tests unitarios.


### 5. Cambiar prioridad de la tarea
Solo hay delete. Faltaria agregar la posibiliad de cambiar la prioridad.

### 6. Editar Tarea Existente
Solo hay delete. Faltaria agregar modo de edicion (Nuevo formulario).

### 7. Separación en componentes de `todo-list`

Actualmente, toda la lógica y la estructura están concentradas en el componente `todo-list`. Para cumplir con el principio de responsabilidad única (SRP), lo recomendable es separar este componente en partes y desacopladas, cada una con una responsabilidad clara.

También sería necesario aplicar esta misma separación en sus correspondientes tests.

**Propuesta de estructura:**
- `todo-list` → contenedor principal
- `todo-item` → representación de cada tarea
- `todo-form` → creación de nuevas tareas
- `todo-filter` → filtrado de tareas

### 8. Posibilidad de paginación
 La API Dummy tiene documentacion para integrarla.
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