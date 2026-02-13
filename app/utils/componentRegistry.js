import { components } from "../component/sections/register";

/**
 * Build registry từ components array
 *
 * INPUT:
 *   components = [
 *     HeroSection ,
 *     TextBlockSection ,
 *     ImageCardSection
 *   ]
 *
 * OUTPUT:
 *   {
 *     "hero": {
 *       component: HeroSection,
 *       schema: {...}
 *     },
 *     "text-block": {
 *       component: TextBlockSection,
 *       schema: {...}
 *     }
 *   }
 */
function buildRegistry() {
  const register = {};

  for (let i = 0; i < components.length; i++) {
    const module = components[i];
    const component = module.default;
    const schema = module.schema;

    register[schema.type] = {
        component: component,
        schema: schema
    };
  }

  return register;
}


const REGISTRY = buildRegistry();

/**
 * Get schema by type
 * 
 * USAGE:
 *   const schema = getSchema("hero");
 *   // → { type: "hero", title: "Hero Banner", settings: [...] }
 */
export function getSchema(type){
   const component = REGISTRY[type];

   return component ? component.schema : null;
}

/**
 * Get component by type
 * 
 * USAGE:
 *   const Component = getComponent("hero");
 *   // → HeroSection function
 */
export function getComponent(type) {
  const component = REGISTRY[type];
  return component ? component.component : null;
}

/**
 * Get all schemas (for Sidebar modal)
 * 
 * USAGE:
 *   const allSchemas = getAllSchemas();
 * 
 * OUTPUT:
 *   [
 *     { type: "hero", title: "Hero Banner", settings: [...] },
 *     { type: "text-block", title: "Text Block", settings: [...] },
 *     { type: "image-card", title: "Image Card", settings: [...] }
 *   ]
 */
export function getAllSchemas() {
   const arrays = [];
   const allComponents = Object.keys(REGISTRY);

   for(let i = 0; i < allComponents.length; i++){
      arrays.push(REGISTRY[allComponents[i]].schema);
   }

   return arrays;
}
