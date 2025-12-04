import { PlanData } from './types';

export const APP_DATA: PlanData = {
  phases: [
    {
      id: "phase-1",
      title: "Fase 1: Inteligencia y Segmentación",
      objective: "Identificar quién tiene la urgencia y el volumen para valorar un servicio 24/7.",
      tasks: [
        {
          id: "p1-t1",
          title: "Definir Perfil de Cliente Ideal (ICP)",
          description: "Identificar empresas en Retail (Big Box), E-commerce, Automotriz y CPG que operen 'Just-in-Time'.",
          actionable: true,
          aiPrompt: "Genera un perfil de cliente ideal (ICP) detallado para una empresa de logística que ofrece Dry Vans 53ft 24/7, enfocado en el sector Automotriz y Retail."
        },
        {
          id: "p1-t2",
          title: "Mapeo de Corredores (Lanes)",
          description: "Documentar rutas clave en CA (Inland Empire), TX (Triángulo Logístico) y FL (Miami/Jax).",
          actionable: false
        },
        {
          id: "p1-t3",
          title: "Creación de Base de Datos (CRM)",
          description: "Compilar contactos de decisores (Gerentes de Tráfico, Directores de Logística) usando ZoomInfo o LinkedIn.",
          actionable: true,
          aiPrompt: "Dame una lista de cargos (Job Titles) específicos y palabras clave para buscar en LinkedIn Sales Navigator para encontrar decisores de logística en Texas y California."
        }
      ]
    },
    {
      id: "phase-2",
      title: "Fase 2: Propuesta de Valor",
      objective: "Comunicar por qué el servicio 24/7 es una ventaja competitiva.",
      tasks: [
        {
          id: "p2-t1",
          title: "Diseño de la UVP",
          description: "Redactar mensaje central sobre flujo continuo y disponibilidad de madrugada/fines de semana.",
          actionable: true,
          aiPrompt: "Redacta 3 variantes de una Propuesta de Valor Única (UVP) corta y contundente para un servicio de transporte 24/7 enfocado en evitar cuellos de botella en fines de semana."
        },
        {
          id: "p2-t2",
          title: "Creación del Pitch Deck",
          description: "Desarrollar presentación de 5 diapositivas: Flota, Cobertura, Seguridad y Casos de éxito.",
          actionable: true,
          aiPrompt: "Crea la estructura y el texto (copy) para un Pitch Deck de 5 diapositivas para vender servicios de Dry Van 53ft."
        },
        {
          id: "p2-t3",
          title: "Benchmarking de Tarifas",
          description: "Analizar tarifas Spot vs Contract en DAT/Truckstop y crear hoja de tarifas 'All-in'.",
          actionable: false
        }
      ]
    },
    {
      id: "phase-3",
      title: "Fase 3: Prospección (Outreach)",
      objective: "Ejecución de la estrategia comercial.",
      tasks: [
        {
          id: "p3-t1",
          title: "Campaña de Email Marketing",
          description: "Redactar y programar secuencia de 3 correos: Dolor, Solución, Prueba Social.",
          actionable: true,
          aiPrompt: "Escribe una secuencia de 3 correos en frío para gerentes de logística. Email 1: Problemas de retrasos en fines de semana. Email 2: Solución con servicio 24/7. Email 3: Casos de éxito."
        },
        {
          id: "p3-t2",
          title: "Estrategia en LinkedIn",
          description: "Conectar con 20 prospectos diarios y publicar contenido sobre estado de carreteras.",
          actionable: true,
          aiPrompt: "Genera 5 ideas de posts para LinkedIn sobre logística, enfocados en el estado de las carreteras en I-10 e I-35 y la disponibilidad de camiones."
        },
        {
          id: "p3-t3",
          title: "Llamadas de Descubrimiento",
          description: "Ejecutar bloque de llamadas (9AM - 11AM). Preguntar sobre manejo de cargas imprevistas.",
          actionable: true,
          aiPrompt: "Escribe un guion de llamada en frío (Cold Call Script) para un coordinador logístico. El gancho debe ser preguntar cómo manejan sus cargas urgentes de viernes por la tarde."
        }
      ]
    },
    {
      id: "phase-4",
      title: "Fase 4: Negociación y Cierre",
      objective: "Convertir el interés en órdenes de carga.",
      tasks: [
        {
          id: "p4-t1",
          title: "Reuniones de Calificación",
          description: "Validar volumen, condiciones de pago (Credit check) y si es Spot vs RFP.",
          actionable: false
        },
        {
          id: "p4-t2",
          title: "Onboarding de Proveedor",
          description: "Tener listo paquete de Carrier Setup (W9, Seguro, MC/DOT, NOA).",
          actionable: false
        },
        {
          id: "p4-t3",
          title: "Prueba de Servicio (Trial Load)",
          description: "Solicitar activamente la 'carga difícil' que otros rechazaron.",
          actionable: true,
          aiPrompt: "Redacta un correo corto para pedirle a un cliente potencial que nos pruebe con su 'carga más difícil' o esa que nadie más quiere tomar."
        }
      ]
    },
    {
      id: "phase-5",
      title: "Fase 5: Operaciones y Retención",
      objective: "Cumplir la promesa del 24/7.",
      tasks: [
        {
          id: "p5-t1",
          title: "Alineación con Despacho",
          description: "Asegurar turnos rotativos reales para cubrir PST, CST y EST.",
          actionable: false
        },
        {
          id: "p5-t2",
          title: "Protocolo de Comunicación",
          description: "Actualizaciones automáticas: Pickup, In-Transit (4h), Delivery.",
          actionable: false
        },
        {
          id: "p5-t3",
          title: "Revisión Post-Servicio",
          description: "Enviar encuesta 24h después y solicitar más volumen.",
          actionable: true,
          aiPrompt: "Crea un formato de correo de seguimiento post-entrega para asegurar satisfacción y pedir más volumen en la misma ruta."
        }
      ]
    }
  ],
  regions: [
    {
      id: "ca",
      name: "California",
      code: "CA",
      focus: "Salidas de Puertos hacia Inland Empire y Noroeste.",
      lanes: ["Long Beach/LA -> Inland Empire", "CA -> TX (I-10)", "CA -> Noroeste"],
      notes: "Cuidado con AB5. Asegurar estructura 100% legal (Fleet owners o W2) para tranquilidad de clientes corporativos."
    },
    {
      id: "tx",
      name: "Texas",
      code: "TX",
      focus: "Triángulo logístico y cruces fronterizos.",
      lanes: ["Dallas - Houston - San Antonio", "Laredo/El Paso -> Distribución Nacional"],
      notes: "Cross-Border es clave. Mencionar capacidad de Transloading en Laredo o Through-trailer hacia México."
    },
    {
      id: "fl",
      name: "Florida",
      code: "FL",
      focus: "Carga entrante de LATAM y distribución al Sudeste.",
      lanes: ["MIA/JAX -> Atlanta", "MIA/JAX -> Charlotte"],
      notes: "Florida es estado de consumo. Ofrecer tarifas competitivas para Backhaul hacia el norte donde faltan camiones."
    }
  ]
};