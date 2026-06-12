// legal.ts - Privacy Policy and Terms & Conditions content (es/en)
// Drafted around Colombian Law 1581/2012 (habeas data) and Decree 1377/2013.
// NOTE: template for general guidance — have a lawyer review before relying on it.

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

type Lang = 'es' | 'en';

export const legal: Record<'privacy' | 'terms', Record<Lang, LegalDoc>> = {
  privacy: {
    es: {
      title: 'Política de Privacidad y Tratamiento de Datos Personales',
      intro:
        'En BEMYTECH protegemos tu información personal. Esta política describe qué datos recopilamos, para qué los usamos y cómo puedes ejercer tus derechos, en cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas aplicables en Colombia.',
      updated: 'Última actualización: 12 de junio de 2026',
      sections: [
        {
          heading: '1. Responsable del tratamiento',
          paragraphs: ['El responsable del tratamiento de tus datos personales es:'],
          items: [
            'Razón social: SOLUCIONES TECNOLÓGICAS BEMYTECH S.A.S. (en adelante, «BEMYTECH»)',
            'Domicilio: Pereira, Risaralda, Colombia',
            'Correo electrónico: contacto@bemytech.com',
            'Teléfono: +57 311 430 22 56',
          ],
        },
        {
          heading: '2. Datos que recopilamos',
          paragraphs: [
            'Recopilamos únicamente los datos necesarios para atender tu solicitud:',
          ],
          items: [
            'Datos de contacto que nos proporcionas voluntariamente (nombre, correo electrónico, empresa y mensaje) cuando usas nuestro formulario o nos escribes por WhatsApp.',
            'Datos técnicos mínimos generados al visitar el sitio (registros de infraestructura del servidor, como dirección IP y tipo de navegador).',
            'Tu preferencia de idioma, almacenada localmente en tu navegador (localStorage); esta información no se transmite a nuestros servidores.',
          ],
        },
        {
          heading: '3. Sin cookies de rastreo',
          paragraphs: [
            'Este sitio no utiliza cookies de publicidad, de rastreo ni de análisis de terceros. Si esto cambia en el futuro, actualizaremos esta política y, cuando la ley lo exija, solicitaremos tu consentimiento.',
            'Ten en cuenta que nuestro formulario de contacto abre WhatsApp en tu dispositivo: el mensaje se envía a través de esa plataforma y queda sujeto también a las políticas de privacidad de WhatsApp (Meta).',
          ],
        },
        {
          heading: '4. Finalidades del tratamiento',
          items: [
            'Responder tus consultas y solicitudes de información.',
            'Elaborar propuestas y cotizaciones de nuestros servicios.',
            'Ejecutar y gestionar los contratos de desarrollo de software y servicios relacionados.',
            'Enviarte comunicaciones relacionadas con tu solicitud o proyecto.',
            'Cumplir obligaciones legales, contables y tributarias.',
          ],
        },
        {
          heading: '5. Autorización y base legal',
          paragraphs: [
            'Al enviarnos tus datos a través del formulario, WhatsApp o correo electrónico, autorizas de manera previa, expresa e informada su tratamiento conforme a esta política. Cuando contratas nuestros servicios, el tratamiento se fundamenta además en la ejecución de la relación contractual.',
          ],
        },
        {
          heading: '6. Con quién compartimos tus datos',
          paragraphs: ['No vendemos ni alquilamos tus datos personales. Solo los compartimos con:'],
          items: [
            'Proveedores tecnológicos que necesitamos para operar (alojamiento web, infraestructura en la nube, mensajería como WhatsApp), quienes actúan bajo sus propias políticas y/o como encargados del tratamiento.',
            'Autoridades competentes, cuando exista obligación legal de hacerlo.',
          ],
        },
        {
          heading: '7. Transferencias internacionales',
          paragraphs: [
            'Algunos de nuestros proveedores de infraestructura pueden estar ubicados fuera de Colombia. En esos casos procuramos que ofrezcan niveles adecuados de protección de datos conforme a la normatividad colombiana.',
          ],
        },
        {
          heading: '8. Seguridad de la información',
          paragraphs: [
            'Aplicamos medidas técnicas y organizativas razonables para proteger tu información: cifrado en tránsito (HTTPS), acceso restringido a los datos y buenas prácticas de desarrollo seguro.',
          ],
        },
        {
          heading: '9. Conservación',
          paragraphs: [
            'Conservamos tus datos solo durante el tiempo necesario para cumplir las finalidades descritas o mientras exista una obligación legal o contractual que lo requiera.',
          ],
        },
        {
          heading: '10. Tus derechos como titular',
          paragraphs: ['De acuerdo con la Ley 1581 de 2012, tienes derecho a:'],
          items: [
            'Conocer, actualizar y rectificar tus datos personales.',
            'Solicitar prueba de la autorización otorgada.',
            'Ser informado sobre el uso que se ha dado a tus datos.',
            'Revocar la autorización y/o solicitar la supresión de tus datos cuando no exista un deber legal o contractual que lo impida.',
            'Presentar quejas ante la Superintendencia de Industria y Comercio (www.sic.gov.co) por infracciones a la ley.',
          ],
        },
        {
          heading: '11. Cómo ejercer tus derechos',
          paragraphs: [
            'Escríbenos a contacto@bemytech.com indicando tu nombre, el derecho que deseas ejercer y los hechos que motivan tu solicitud. Atenderemos consultas en un máximo de diez (10) días hábiles y reclamos en un máximo de quince (15) días hábiles, conforme a la ley.',
          ],
        },
        {
          heading: '12. Menores de edad',
          paragraphs: [
            'Nuestro sitio y servicios están dirigidos a empresas y personas mayores de edad. No recopilamos deliberadamente datos de menores.',
          ],
        },
        {
          heading: '13. Cambios a esta política',
          paragraphs: [
            'Podemos actualizar esta política para reflejar cambios normativos u operativos. Publicaremos la versión vigente en esta página con su fecha de actualización.',
          ],
        },
      ],
    },
    en: {
      title: 'Privacy Policy and Personal Data Processing',
      intro:
        'At BEMYTECH we protect your personal information. This policy describes what data we collect, what we use it for and how you can exercise your rights, in compliance with Colombian Law 1581 of 2012, Decree 1377 of 2013 and other applicable regulations.',
      updated: 'Last updated: June 12, 2026',
      sections: [
        {
          heading: '1. Data controller',
          paragraphs: ['The controller of your personal data is:'],
          items: [
            'Legal name: SOLUCIONES TECNOLÓGICAS BEMYTECH S.A.S. ("BEMYTECH")',
            'Address: Pereira, Risaralda, Colombia',
            'Email: contacto@bemytech.com',
            'Phone: +57 311 430 22 56',
          ],
        },
        {
          heading: '2. Data we collect',
          paragraphs: ['We collect only the data needed to handle your request:'],
          items: [
            'Contact data you voluntarily provide (name, email, company and message) when you use our contact form or write to us on WhatsApp.',
            'Minimal technical data generated when you visit the site (server infrastructure logs, such as IP address and browser type).',
            'Your language preference, stored locally in your browser (localStorage); this information is not transmitted to our servers.',
          ],
        },
        {
          heading: '3. No tracking cookies',
          paragraphs: [
            'This site does not use advertising, tracking or third-party analytics cookies. If this changes in the future, we will update this policy and, where required by law, request your consent.',
            'Note that our contact form opens WhatsApp on your device: the message is sent through that platform and is also subject to the privacy policies of WhatsApp (Meta).',
          ],
        },
        {
          heading: '4. Purposes of processing',
          items: [
            'Responding to your questions and information requests.',
            'Preparing proposals and quotes for our services.',
            'Executing and managing software development contracts and related services.',
            'Sending you communications related to your request or project.',
            'Complying with legal, accounting and tax obligations.',
          ],
        },
        {
          heading: '5. Authorization and legal basis',
          paragraphs: [
            'By sending us your data through the form, WhatsApp or email, you give your prior, express and informed authorization for its processing under this policy. When you hire our services, processing is additionally based on the performance of the contractual relationship.',
          ],
        },
        {
          heading: '6. Who we share your data with',
          paragraphs: ['We do not sell or rent your personal data. We only share it with:'],
          items: [
            'Technology providers we need to operate (web hosting, cloud infrastructure, messaging such as WhatsApp), who act under their own policies and/or as data processors.',
            'Competent authorities, when legally required.',
          ],
        },
        {
          heading: '7. International transfers',
          paragraphs: [
            'Some of our infrastructure providers may be located outside Colombia. In those cases we seek providers that offer adequate levels of data protection in accordance with Colombian regulations.',
          ],
        },
        {
          heading: '8. Information security',
          paragraphs: [
            'We apply reasonable technical and organizational measures to protect your information: encryption in transit (HTTPS), restricted access to data and secure development practices.',
          ],
        },
        {
          heading: '9. Retention',
          paragraphs: [
            'We keep your data only for as long as necessary to fulfill the purposes described or while a legal or contractual obligation requires it.',
          ],
        },
        {
          heading: '10. Your rights as data subject',
          paragraphs: ['Under Colombian Law 1581 of 2012, you have the right to:'],
          items: [
            'Know, update and rectify your personal data.',
            'Request proof of the authorization granted.',
            'Be informed about how your data has been used.',
            'Revoke the authorization and/or request deletion of your data when no legal or contractual duty prevents it.',
            'File complaints with the Superintendence of Industry and Commerce (www.sic.gov.co) for violations of the law.',
          ],
        },
        {
          heading: '11. How to exercise your rights',
          paragraphs: [
            'Write to contacto@bemytech.com stating your name, the right you wish to exercise and the facts behind your request. We will answer inquiries within ten (10) business days and claims within fifteen (15) business days, as required by law.',
          ],
        },
        {
          heading: '12. Minors',
          paragraphs: [
            'Our site and services are aimed at companies and adults. We do not knowingly collect data from minors.',
          ],
        },
        {
          heading: '13. Changes to this policy',
          paragraphs: [
            'We may update this policy to reflect regulatory or operational changes. The current version will always be published on this page with its update date.',
          ],
        },
      ],
    },
  },
  terms: {
    es: {
      title: 'Términos y Condiciones de Uso',
      intro:
        'Estos términos regulan el acceso y uso del sitio web bemytech.io, operado por SOLUCIONES TECNOLÓGICAS BEMYTECH S.A.S. («BEMYTECH») desde Pereira, Colombia. Al navegar este sitio aceptas estos términos; si no estás de acuerdo, por favor no lo utilices.',
      updated: 'Última actualización: 12 de junio de 2026',
      sections: [
        {
          heading: '1. Quiénes somos',
          paragraphs: [
            'BEMYTECH es la marca de SOLUCIONES TECNOLÓGICAS BEMYTECH S.A.S., empresa de desarrollo de software a la medida con domicilio en Pereira, Risaralda, Colombia. Contacto: contacto@bemytech.com · +57 311 430 22 56.',
          ],
        },
        {
          heading: '2. Uso permitido del sitio',
          paragraphs: ['Te comprometes a usar el sitio de forma lícita. En particular, no está permitido:'],
          items: [
            'Intentar vulnerar la seguridad del sitio o de su infraestructura.',
            'Usar el contenido para suplantar a BEMYTECH o a sus clientes.',
            'Realizar extracción masiva o automatizada de contenido (scraping) sin autorización.',
          ],
        },
        {
          heading: '3. Carácter informativo del contenido',
          paragraphs: [
            'La información de este sitio (servicios, tecnologías, tiempos y procesos) es de carácter informativo y no constituye una oferta vinculante. Los servicios de desarrollo de software se contratan mediante propuestas y contratos específicos firmados por las partes, cuyos términos prevalecen sobre el contenido de este sitio.',
            'Los plazos y precios definitivos de cada proyecto se establecen en la propuesta o contrato correspondiente.',
          ],
        },
        {
          heading: '4. Propiedad intelectual',
          paragraphs: [
            'El sitio, su diseño, textos, logotipos y la marca BEMYTECH son de nuestra propiedad o se usan bajo licencia, y están protegidos por las normas de propiedad intelectual. No se permite su reproducción con fines comerciales sin autorización escrita.',
            'Los productos mostrados en el portafolio (como Castevo, RikDrive, Viatika, Raffle o Visual Emotion) y las marcas de terceros mencionadas pertenecen a sus respectivos titulares. La titularidad del software desarrollado para cada cliente se define en el contrato de cada proyecto.',
          ],
        },
        {
          heading: '5. Testimonios y portafolio',
          paragraphs: [
            'Los testimonios publicados corresponden a opiniones reales de usuarios y clientes, publicadas con su autorización. Los resultados descritos son experiencias particulares y no garantizan resultados idénticos en otros proyectos.',
          ],
        },
        {
          heading: '6. Enlaces y servicios de terceros',
          paragraphs: [
            'El sitio contiene enlaces a servicios de terceros (por ejemplo, WhatsApp). Su uso se rige por los términos y políticas de dichos terceros, sobre los cuales no tenemos control ni responsabilidad.',
          ],
        },
        {
          heading: '7. Disponibilidad y garantías',
          paragraphs: [
            'El sitio se ofrece "tal cual" y "según disponibilidad". Podemos modificarlo, actualizarlo o suspenderlo en cualquier momento sin previo aviso. No garantizamos que esté libre de errores o interrupciones.',
          ],
        },
        {
          heading: '8. Limitación de responsabilidad',
          paragraphs: [
            'En la máxima medida permitida por la ley colombiana, BEMYTECH no será responsable por daños indirectos o pérdidas derivadas del uso o imposibilidad de uso de este sitio web. Nada en estos términos limita responsabilidades que por ley no puedan excluirse.',
          ],
        },
        {
          heading: '9. Protección de datos personales',
          paragraphs: [
            'El tratamiento de tus datos personales se rige por nuestra Política de Privacidad, disponible en este mismo sitio.',
          ],
        },
        {
          heading: '10. Ley aplicable y jurisdicción',
          paragraphs: [
            'Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia será sometida a los jueces competentes de Pereira, Risaralda, salvo que la ley disponga otra cosa.',
          ],
        },
        {
          heading: '11. Cambios',
          paragraphs: [
            'Podemos actualizar estos términos en cualquier momento. La versión vigente será la publicada en esta página con su fecha de actualización.',
          ],
        },
        {
          heading: '12. Contacto',
          paragraphs: [
            'Para cualquier consulta sobre estos términos escríbenos a contacto@bemytech.com.',
          ],
        },
      ],
    },
    en: {
      title: 'Terms and Conditions of Use',
      intro:
        'These terms govern access to and use of the bemytech.io website, operated by SOLUCIONES TECNOLÓGICAS BEMYTECH S.A.S. ("BEMYTECH") from Pereira, Colombia. By browsing this site you accept these terms; if you do not agree, please do not use it.',
      updated: 'Last updated: June 12, 2026',
      sections: [
        {
          heading: '1. Who we are',
          paragraphs: [
            'BEMYTECH is the brand of SOLUCIONES TECNOLÓGICAS BEMYTECH S.A.S., a custom software development company based in Pereira, Risaralda, Colombia. Contact: contacto@bemytech.com · +57 311 430 22 56.',
          ],
        },
        {
          heading: '2. Permitted use of the site',
          paragraphs: ['You agree to use the site lawfully. In particular, you may not:'],
          items: [
            'Attempt to breach the security of the site or its infrastructure.',
            'Use the content to impersonate BEMYTECH or its clients.',
            'Perform bulk or automated content extraction (scraping) without authorization.',
          ],
        },
        {
          heading: '3. Informational nature of the content',
          paragraphs: [
            'The information on this site (services, technologies, timelines and processes) is informational and does not constitute a binding offer. Software development services are engaged through specific proposals and contracts signed by the parties, whose terms prevail over the content of this site.',
            'Final timelines and prices for each project are set out in the corresponding proposal or contract.',
          ],
        },
        {
          heading: '4. Intellectual property',
          paragraphs: [
            'The site, its design, copy, logos and the BEMYTECH brand are our property or used under license, and are protected by intellectual property laws. Commercial reproduction without written authorization is not permitted.',
            'The products shown in the portfolio (such as Castevo, RikDrive, Viatika, Raffle or Visual Emotion) and third-party brands mentioned belong to their respective owners. Ownership of software developed for each client is defined in each project contract.',
          ],
        },
        {
          heading: '5. Testimonials and portfolio',
          paragraphs: [
            'Published testimonials are real opinions from users and clients, published with their authorization. The results described are individual experiences and do not guarantee identical results in other projects.',
          ],
        },
        {
          heading: '6. Third-party links and services',
          paragraphs: [
            'The site contains links to third-party services (for example, WhatsApp). Their use is governed by those third parties\' terms and policies, over which we have no control or responsibility.',
          ],
        },
        {
          heading: '7. Availability and warranties',
          paragraphs: [
            'The site is provided "as is" and "as available". We may modify, update or suspend it at any time without notice. We do not guarantee it will be error-free or uninterrupted.',
          ],
        },
        {
          heading: '8. Limitation of liability',
          paragraphs: [
            'To the maximum extent permitted by Colombian law, BEMYTECH shall not be liable for indirect damages or losses arising from the use of, or inability to use, this website. Nothing in these terms limits liabilities that cannot be excluded by law.',
          ],
        },
        {
          heading: '9. Personal data protection',
          paragraphs: [
            'The processing of your personal data is governed by our Privacy Policy, available on this site.',
          ],
        },
        {
          heading: '10. Governing law and jurisdiction',
          paragraphs: [
            'These terms are governed by the laws of the Republic of Colombia. Any dispute shall be submitted to the competent courts of Pereira, Risaralda, unless the law provides otherwise.',
          ],
        },
        {
          heading: '11. Changes',
          paragraphs: [
            'We may update these terms at any time. The current version will be the one published on this page with its update date.',
          ],
        },
        {
          heading: '12. Contact',
          paragraphs: ['For any questions about these terms, write to contacto@bemytech.com.'],
        },
      ],
    },
  },
};
