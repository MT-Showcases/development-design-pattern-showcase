/**
 * COMPONENT TYPE: Type Definition
 * SECTION: Data
 *
 * ROLE:
 * - Define all 23 GoF Design Patterns with complete theory
 * - Provide structured data for pattern theory pages
 * - Include intent, problem, solution, examples, and usage guidelines
 *
 * PATTERNS USED:
 * - Data Repository Pattern - Centralized pattern knowledge base
 * - Type Safety - Strong typing for all pattern properties
 *
 * NOTES FOR CONTRIBUTORS:
 * - Each pattern includes: intent, problem, solution, code examples, when to use, real-world cases
 * - Examples are in JavaScript/TypeScript for consistency
 * - Keep examples concise but realistic
 */

import React from "react";
import { BuildOutlined, ToolOutlined, ThunderboltOutlined } from "@ant-design/icons";

export interface PatternTheory {
    id: string;
    name: string;
    category: "creational" | "structural" | "behavioral";
    intent: string;
    problem: string;
    solution: string;
    structure: string; // Descrizione della struttura
    participants: string[]; // Classi/componenti coinvolti
    codeExamples: CodeExample[];
    realWorldExamples: string[];
    whenToUse: string[];
    whenNotToUse: string[];
    relatedPatterns: string[];
}

export interface CodeExample {
    title: string;
    description: string;
    code: string;
    language: "javascript" | "typescript";
    type: "problem" | "solution" | "example"; // For icon rendering
}

export const PATTERN_CATEGORIES = {
    creational: {
        name: "Creational Patterns",
        description:
            "Patterns che si occupano della creazione di oggetti, rendendo il sistema indipendente da come gli oggetti vengono creati, composti e rappresentati.",
        icon: React.createElement(BuildOutlined),
        patterns: [
            "singleton",
            "factory-method",
            "abstract-factory",
            "builder",
            "prototype",
        ],
    },
    structural: {
        name: "Structural Patterns",
        description:
            "Patterns che si occupano della composizione di classi e oggetti per formare strutture più grandi.",
        icon: React.createElement(ToolOutlined),
        patterns: [
            "adapter",
            "bridge",
            "composite",
            "decorator",
            "facade",
            "flyweight",
            "proxy",
        ],
    },
    behavioral: {
        name: "Behavioral Patterns",
        description:
            "Patterns che si occupano degli algoritmi e dell'assegnazione delle responsabilità tra oggetti.",
        icon: React.createElement(ThunderboltOutlined),
        patterns: [
            "chain-of-responsibility",
            "command",
            "interpreter",
            "iterator",
            "mediator",
            "memento",
            "observer",
            "state",
            "strategy",
            "template-method",
            "visitor",
        ],
    },
};

export const patterns: Record<string, PatternTheory> = {
    // ==================== CREATIONAL PATTERNS ====================

    singleton: {
        id: "singleton",
        name: "Singleton",
        category: "creational",
        intent: "Garantire che una classe abbia una sola istanza e fornire un punto di accesso globale ad essa.",
        problem:
            "A volte è necessario che una classe abbia esattamente una sola istanza. Ad esempio, ci dovrebbe essere un solo oggetto per gestire la connessione al database, un solo logger di sistema, o un solo gestore di configurazione.",
        solution:
            "Rendere la classe responsabile di tenere traccia della sua unica istanza. La classe impedisce la creazione di altre istanze intercettando le richieste di creazione e fornendo un metodo per accedere all'istanza unica.",
        structure:
            "Una classe con un costruttore privato, una variabile statica privata per contenere l'istanza unica, e un metodo statico pubblico per ottenere l'istanza.",
        participants: [
            "Singleton - definisce il metodo getInstance() che restituisce l'istanza unica",
            "Instance - l'istanza unica della classe Singleton",
        ],
        codeExamples: [
            {
                title: "PROBLEMA: Senza Singleton - Istanze Multiple",
                description:
                    "Questo codice crea molteplici istanze della configurazione, causando inconsistenza e spreco di memoria.",
                type: "problem",
                code: `// ❌ PROBLEMA: Ogni volta che creiamo AppConfig, abbiamo un'istanza diversa
class AppConfig {
  constructor() {
    this.settings = {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      theme: 'dark'
    };
    // Caricamento pesante dal server (viene ripetuto ogni volta!)
    this.loadFromServer();
  }

  loadFromServer() {
    console.log('Loading config from server... (expensive operation)');
  }

  getSetting(key) {
    return this.settings[key];
  }
}

// ❌ Problema: Ogni modulo crea la propria istanza
const config1 = new AppConfig();  // Loading config from server...
const config2 = new AppConfig();  // Loading config from server... (di nuovo!)

config1.settings.theme = 'light';
console.log(config1.settings.theme); // 'light'
console.log(config2.settings.theme); // 'dark' - inconsistenza!

console.log(config1 === config2); // false - istanze diverse!`,
                language: "javascript",
            },
            {
                title: "SOLUZIONE: Singleton - Una Sola Istanza",
                description:
                    "Il pattern Singleton garantisce che esista una sola istanza e fornisce un punto di accesso globale.",
                type: "solution",
                code: `// ✅ SOLUZIONE: Singleton garantisce un'unica istanza
class AppConfig {
  constructor() {
    // Impedisce la creazione diretta con 'new'
    if (AppConfig._instance) {
      return AppConfig._instance;
    }
    
    this.settings = {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      theme: 'dark'
    };
    
    // Caricamento pesante avviene una sola volta
    this.loadFromServer();
    
    // Memorizza l'istanza unica
    AppConfig._instance = this;
  }

  // Metodo statico per ottenere l'istanza unica
  static getInstance() {
    // Lazy initialization: crea l'istanza solo se non esiste
    if (!AppConfig._instance) {
      AppConfig._instance = new AppConfig();
      console.log('✅ New instance created');
    } else {
      console.log('♻️ Returning existing instance');
    }
    return AppConfig._instance;
  }

  loadFromServer() {
    console.log('Loading config from server... (only once!)');
  }

  getSetting(key) {
    return this.settings[key];
  }

  setSetting(key, value) {
    this.settings[key] = value;
  }
}

// Variabile statica privata per memorizzare l'istanza unica
AppConfig._instance = null;

// ✅ Utilizzo: Tutti ottengono la stessa istanza
const config1 = AppConfig.getInstance(); // ✅ New instance created
const config2 = AppConfig.getInstance(); // ♻️ Returning existing instance

config1.setSetting('theme', 'light');
console.log(config1.getSetting('theme')); // 'light'
console.log(config2.getSetting('theme')); // 'light' - consistenza!

console.log(config1 === config2); // true - stessa istanza!`,
                language: "javascript",
            },
            {
                title: "Esempio Pratico: Database Connection Pool",
                description:
                    "Caso d'uso reale: pool di connessioni al database condiviso in tutta l'app.",
                type: "example",
                code: `// 🎯 Esempio reale: Database Connection Pool
class DatabasePool {
  constructor() {
    // Impedisce la creazione diretta
    if (DatabasePool._instance) {
      return DatabasePool._instance;
    }
    
    this.connections = [];
    this.maxConnections = 10;
    this.currentConnections = 0;
    
    console.log('🔧 Initializing database connection pool...');
    this.initializePool();
    
    DatabasePool._instance = this;
  }

  static getInstance() {
    if (!DatabasePool._instance) {
      DatabasePool._instance = new DatabasePool();
    }
    return DatabasePool._instance;
  }

  initializePool() {
    // Crea 5 connessioni iniziali
    for (let i = 0; i < 5; i++) {
      this.connections.push({
        id: i,
        inUse: false,
        connection: \`mongodb://localhost:27017/db_\${i}\`
      });
    }
    this.currentConnections = 5;
  }

  // Ottieni una connessione dal pool
  getConnection() {
    // Cerca una connessione libera
    const available = this.connections.find(c => !c.inUse);
    
    if (available) {
      available.inUse = true;
      console.log(\`📤 Connection \${available.id} acquired\`);
      return available;
    }
    
    // Se non ci sono connessioni libere e non abbiamo raggiunto il max
    if (this.currentConnections < this.maxConnections) {
      const newConnection = {
        id: this.currentConnections,
        inUse: true,
        connection: \`mongodb://localhost:27017/db_\${this.currentConnections}\`
      };
      this.connections.push(newConnection);
      this.currentConnections++;
      console.log(\`➕ New connection \${newConnection.id} created and acquired\`);
      return newConnection;
    }
    
    console.log('⚠️ No connections available, waiting...');
    return null;
  }

  // Rilascia una connessione al pool
  releaseConnection(connection) {
    connection.inUse = false;
    console.log(\`📥 Connection \${connection.id} released\`);
  }

  getStats() {
    const inUse = this.connections.filter(c => c.inUse).length;
    return \`Total: \${this.currentConnections}, In use: \${inUse}, Available: \${this.currentConnections - inUse}\`;
  }
}

// Variabile statica per l'istanza
DatabasePool._instance = null;

// 🎯 Utilizzo in diversi moduli dell'applicazione
// Modulo User Service
function userService() {
  const pool = DatabasePool.getInstance();
  const conn = pool.getConnection();
  // ... esegui query ...
  pool.releaseConnection(conn);
}

// Modulo Order Service
function orderService() {
  const pool = DatabasePool.getInstance(); // Stessa istanza!
  const conn = pool.getConnection();
  // ... esegui query ...
  pool.releaseConnection(conn);
}

// Tutti i servizi condividono lo stesso pool
const pool1 = DatabasePool.getInstance();
const pool2 = DatabasePool.getInstance();
console.log(pool1 === pool2); // true
console.log(pool1.getStats());`,
                language: "javascript",
            },
            {
                title: "Confronto: Singleton vs Istanze Multiple",
                description: "Visualizzazione delle differenze tra i due approcci.",
                type: "example",
                code: `// 🆚 CONFRONTO DIRETTO

// ❌ SENZA SINGLETON
class Logger {
  constructor() {
    this.logs = [];
  }
  
  log(message) {
    this.logs.push(\`[\${new Date().toISOString()}] \${message}\`);
  }
  
  getLogs() {
    return this.logs;
  }
}

const logger1 = new Logger();
const logger2 = new Logger();

logger1.log('User logged in');
logger2.log('Order created');

console.log('Logger1 logs:', logger1.getLogs()); // ['User logged in']
console.log('Logger2 logs:', logger2.getLogs()); // ['Order created']
// ❌ I log sono divisi in istanze separate!

// ✅ CON SINGLETON
class SingletonLogger {
  constructor() {
    if (SingletonLogger._instance) {
      return SingletonLogger._instance;
    }
    
    this.logs = [];
    SingletonLogger._instance = this;
  }
  
  static getInstance() {
    if (!SingletonLogger._instance) {
      SingletonLogger._instance = new SingletonLogger();
    }
    return SingletonLogger._instance;
  }
  
  log(message) {
    this.logs.push(\`[\${new Date().toISOString()}] \${message}\`);
  }
  
  getLogs() {
    return this.logs;
  }
}

SingletonLogger._instance = null;

const sLogger1 = SingletonLogger.getInstance();
const sLogger2 = SingletonLogger.getInstance();

sLogger1.log('User logged in');
sLogger2.log('Order created');

console.log('Singleton logs:', sLogger1.getLogs()); 
// ['User logged in', 'Order created']
console.log('Are they the same?', sLogger1 === sLogger2); // true
// ✅ Tutti i log sono centralizzati in un'unica istanza!`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Database Connection Pool - Una sola istanza gestisce tutte le connessioni al database",
            "Logger di sistema - Un solo logger centralizzato per tutta l'applicazione",
            "Configuration Manager - Configurazione globale accessibile ovunque",
            "Cache Manager - Una sola cache condivisa tra tutti i componenti",
            "Thread Pool - Gestione centralizzata dei thread worker",
        ],
        whenToUse: [
            "Quando deve esserci esattamente una sola istanza di una classe",
            "Quando l'istanza deve essere accessibile da più parti del codice",
            "Quando l'istanza unica dovrebbe essere estendibile tramite sottoclassi",
            "Per gestire risorse condivise (database, file, configurazioni)",
        ],
        whenNotToUse: [
            "Quando servono istanze multiple con stato diverso",
            "Quando rende difficile il testing (dependency injection è meglio)",
            "Quando crea accoppiamento stretto nel codice",
            "Quando viola il Single Responsibility Principle",
        ],
        relatedPatterns: ["Factory Method", "Abstract Factory", "Prototype"],
    },

    "factory-method": {
        id: "factory-method",
        name: "Factory Method",
        category: "creational",
        intent: "Definire un'interfaccia per creare un oggetto, ma lasciare che le sottoclassi decidano quale classe istanziare.",
        problem:
            "Il codice diventa dipendente da classi concrete specifiche quando crea oggetti direttamente. Questo rende difficile estendere il sistema con nuovi tipi senza modificare il codice esistente.",
        solution:
            "Definire un metodo factory in una classe base che le sottoclassi possono sovrascrivere per specificare quale tipo di oggetto creare. Il codice client lavora con l'interfaccia del factory method, non con classi concrete.",
        structure:
            "Una classe Creator astratta con un factory method astratto, e ConcreteCreator che implementano il metodo per creare istanze concrete.",
        participants: [
            "Creator - dichiara il factory method che restituisce un oggetto Product",
            "ConcreteCreator - sovrascrive il factory method per restituire un ConcreteProduct",
            "Product - interfaccia degli oggetti creati dal factory method",
            "ConcreteProduct - implementazione concreta di Product",
        ],
        codeExamples: [
            {
                title: "PROBLEMA: Codice Rigido con Classi Concrete",
                description:
                    "Quando il codice dipende direttamente da classi concrete, diventa difficile estendere.",
                type: "problem",
                code: `// ❌ PROBLEMA: Il codice è rigidamente accoppiato alle classi concrete
class NotificationService {
  sendNotification(type, message) {
    // ❌ Switch statement: aggiungere nuovi tipi richiede modificare questo codice
    if (type === 'email') {
      const email = new EmailNotification();
      email.send(message);
    } else if (type === 'sms') {
      const sms = new SMSNotification();
      sms.send(message);
    } else if (type === 'push') {
      const push = new PushNotification();
      push.send(message);
    }
    // ❌ Per aggiungere Slack, Telegram, etc. dobbiamo modificare QUESTA funzione!
  }
}

class EmailNotification {
  send(message) {
    console.log(\`📧 Email: \${message}\`);
  }
}

class SMSNotification {
  send(message) {
    console.log(\`📱 SMS: \${message}\`);
  }
}

class PushNotification {
  send(message) {
    console.log(\`🔔 Push: \${message}\`);
  }
}

// ❌ Utilizzo rigido
const service = new NotificationService();
service.sendNotification('email', 'Order shipped!');
service.sendNotification('sms', 'Code: 123456');

// ❌ Problemi:
// 1. Violazione Open/Closed Principle
// 2. Impossibile estendere senza modificare NotificationService
// 3. Testing difficile (dipendenze hard-coded)`,
                language: "javascript",
            },
            {
                title: "SOLUZIONE: Factory Method - Estensibilità",
                description:
                    "Factory Method permette alle sottoclassi di decidere quale classe istanziare.",
                type: "solution",
                code: `// ✅ SOLUZIONE: Factory Method con estensibilità

// Concrete Products - implementazioni specifiche
class EmailNotification {
  send(message) {
    console.log(\`📧 Sending email: \${message}\`);
    // Logica specifica per email (SMTP, HTML formatting, etc.)
  }
}

class SMSNotification {
  send(message) {
    console.log(\`📱 Sending SMS: \${message}\`);
    // Logica specifica per SMS (Twilio API, length limit, etc.)
  }
}

class PushNotification {
  send(message) {
    console.log(\`🔔 Sending push: \${message}\`);
    // Logica specifica per push (FCM, APNS, etc.)
  }
}

// Creator base - definisce il factory method
class NotificationFactory {
  // Factory Method - da sovrascrivere nelle sottoclassi
  createNotification() {
    throw new Error('createNotification() must be implemented in subclass');
  }

  // Template method che usa il factory method
  notify(message) {
    // ✅ Non sa quale tipo concreto viene creato
    const notification = this.createNotification();
    notification.send(message);
  }
}

// Concrete Creators - decidono quale Product creare
class EmailNotificationFactory extends NotificationFactory {
  createNotification() {
    return new EmailNotification();
  }
}

class SMSNotificationFactory extends NotificationFactory {
  createNotification() {
    return new SMSNotification();
  }
}

class PushNotificationFactory extends NotificationFactory {
  createNotification() {
    return new PushNotification();
  }
}

// ✅ Utilizzo flessibile
const emailFactory = new EmailNotificationFactory();
emailFactory.notify('Your order has shipped!');

const smsFactory = new SMSNotificationFactory();
smsFactory.notify('Verification code: 123456');

// ✅ Aggiungere nuovi tipi è facile - basta creare nuove classi!
class SlackNotification {
  send(message) {
    console.log(\`💬 Sending Slack message: \${message}\`);
  }
}

class SlackNotificationFactory extends NotificationFactory {
  createNotification() {
    return new SlackNotification();
  }
}

const slackFactory = new SlackNotificationFactory();
slackFactory.notify('Build completed successfully!');

// ✅ Nessuna modifica al codice esistente richiesta!`,
                language: "javascript",
            },
            {
                title: "Esempio Pratico: Sistema di Export Multi-Formato",
                description:
                    "Export di report in formati diversi (PDF, Excel, CSV) usando Factory Method.",
                type: "example",
                code: `// 🎯 Esempio reale: Export di report in formati diversi

// Concrete Products
class PDFExporter {
  export(data) {
    console.log('📄 Generating PDF report...');
    console.log('- Creating document structure');
    console.log('- Adding headers and footers');
    console.log('- Formatting tables');
    console.log(\`- Exporting \${data.length} rows\`);
    console.log(\`✅ PDF saved as report.\${this.getFileExtension()}\`);
  }
  
  getFileExtension() {
    return 'pdf';
  }
}

class ExcelExporter {
  export(data) {
    console.log('📊 Generating Excel report...');
    console.log('- Creating workbook');
    console.log('- Adding worksheets');
    console.log('- Applying cell formatting');
    console.log(\`- Writing \${data.length} rows\`);
    console.log(\`✅ Excel saved as report.\${this.getFileExtension()}\`);
  }
  
  getFileExtension() {
    return 'xlsx';
  }
}

class CSVExporter {
  export(data) {
    console.log('📋 Generating CSV report...');
    console.log('- Converting to comma-separated values');
    console.log('- Escaping special characters');
    console.log(\`- Writing \${data.length} rows\`);
    console.log(\`✅ CSV saved as report.\${this.getFileExtension()}\`);
  }
  
  getFileExtension() {
    return 'csv';
  }
}

// Creator base
class ReportGenerator {
  // Factory Method - da sovrascrivere
  createExporter() {
    throw new Error('createExporter() must be implemented');
  }
  
  // Business logic che usa il factory method
  generateReport(data, filename) {
    console.log(\`\\n🔄 Starting report generation for \${filename}...\`);
    
    const exporter = this.createExporter();
    const fullFilename = \`\${filename}.\${exporter.getFileExtension()}\`;
    
    console.log(\`Format: \${exporter.getFileExtension().toUpperCase()}\`);
    exporter.export(data);
    console.log('─'.repeat(50));
  }
}

// Concrete Creators
class PDFReportGenerator extends ReportGenerator {
  createExporter() {
    return new PDFExporter();
  }
}

class ExcelReportGenerator extends ReportGenerator {
  createExporter() {
    return new ExcelExporter();
  }
}

class CSVReportGenerator extends ReportGenerator {
  createExporter() {
    return new CSVExporter();
  }
}

// 🎯 Utilizzo in una applicazione reale
const salesData = [
  { month: 'Jan', sales: 10000 },
  { month: 'Feb', sales: 15000 },
  { month: 'Mar', sales: 12000 }
];

// Client code - può scegliere il formato dinamicamente
function exportReport(format) {
  let generator;
  
  switch(format) {
    case 'pdf':
      generator = new PDFReportGenerator();
      break;
    case 'excel':
      generator = new ExcelReportGenerator();
      break;
    case 'csv':
      generator = new CSVReportGenerator();
      break;
    default:
      throw new Error('Unsupported format');
  }
  
  generator.generateReport(salesData, 'sales_report_2024');
}

// Esportazione in formati diversi
exportReport('pdf');
exportReport('excel');
exportReport('csv');`,
                language: "javascript",
            },
            {
                title: "Confronto: Switch vs Factory Method",
                description:
                    "Differenza tra codice procedurale e pattern Factory Method.",
                type: "example",
                code: `// 🆚 CONFRONTO DIRETTO

// ❌ APPROCCIO PROCEDURALE (con switch)
class ProceduralLogger {
  log(type, message) {
    switch(type) {
      case 'file':
        console.log(\`[FILE] Writing to disk: \${message}\`);
        break;
      case 'console':
        console.log(\`[CONSOLE] \${message}\`);
        break;
      case 'database':
        console.log(\`[DB] Inserting log: \${message}\`);
        break;
      // ❌ Per aggiungere 'cloud' devo modificare questa funzione!
    }
  }
}

const procLogger = new ProceduralLogger();
procLogger.log('file', 'Error occurred');
procLogger.log('console', 'Info message');

// ✅ FACTORY METHOD (estensibile)
class FileLogger {
  log(message) {
    console.log(\`[FILE] Writing to disk: \${message}\`);
  }
}

class ConsoleLogger {
  log(message) {
    console.log(\`[CONSOLE] \${message}\`);
  }
}

class DatabaseLogger {
  log(message) {
    console.log(\`[DB] Inserting log: \${message}\`);
  }
}

class LoggerFactory {
  createLogger() {
    throw new Error('createLogger() must be implemented');
  }
  
  writeLog(message) {
    const logger = this.createLogger();
    logger.log(message);
  }
}

class FileLoggerFactory extends LoggerFactory {
  createLogger() {
    return new FileLogger();
  }
}

class ConsoleLoggerFactory extends LoggerFactory {
  createLogger() {
    return new ConsoleLogger();
  }
}

// ✅ Aggiungere 'cloud' non richiede modifiche al codice esistente!
class CloudLogger {
  log(message) {
    console.log(\`[CLOUD] Uploading log: \${message}\`);
  }
}

class CloudLoggerFactory extends LoggerFactory {
  createLogger() {
    return new CloudLogger();
  }
}

const fileFactory = new FileLoggerFactory();
fileFactory.writeLog('Error occurred');

const cloudFactory = new CloudLoggerFactory();
cloudFactory.writeLog('System started'); // Nuovo tipo senza modifiche!`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Framework UI - Creazione di componenti diversi per piattaforme diverse (web, mobile, desktop)",
            "Sistema di logging - Diversi logger per console, file, database, cloud",
            "Parser di documenti - Factory per creare parser XML, JSON, CSV in base al tipo di file",
            "Connessioni database - Factory per creare connessioni MySQL, PostgreSQL, MongoDB",
            "Gestione pagamenti - Factory per creare processori Stripe, PayPal, Apple Pay",
        ],
        whenToUse: [
            "Quando non sai in anticipo quali tipi di oggetti dovrai creare",
            "Quando vuoi delegare la logica di creazione alle sottoclassi",
            "Quando vuoi fornire estensibilità ai tuoi utenti/library",
            "Quando vuoi localizzare la conoscenza delle classi concrete",
        ],
        whenNotToUse: [
            "Quando hai solo un tipo di oggetto da creare",
            "Quando la gerarchia di classi diventa troppo complessa",
            "Quando Simple Factory Pattern è sufficiente",
        ],
        relatedPatterns: ["Abstract Factory", "Template Method", "Prototype"],
    },

    "abstract-factory": {
        id: "abstract-factory",
        name: "Abstract Factory",
        category: "creational",
        intent: "Fornire un'interfaccia per creare famiglie di oggetti correlati senza specificare le loro classi concrete.",
        problem:
            "Quando devi creare famiglie di oggetti correlati che devono essere usati insieme (es. UI components per temi diversi), ma vuoi mantenere il codice indipendente dalle classi concrete.",
        solution:
            "Dichiarare interfacce per ogni tipo di prodotto nella famiglia. Quindi dichiarare l'abstract factory con metodi per creare ogni tipo di prodotto. Implementare concrete factory per ogni variante della famiglia.",
        structure:
            "AbstractFactory con metodi per creare AbstractProduct, ConcreteFactory che creano ConcreteProduct, e client che usa solo interfacce.",
        participants: [
            "AbstractFactory - interfaccia per creare prodotti astratti",
            "ConcreteFactory - implementa operazioni per creare prodotti concreti",
            "AbstractProduct - interfaccia per un tipo di prodotto",
            "ConcreteProduct - implementazione di un prodotto, creata da una ConcreteFactory",
        ],
        codeExamples: [
            {
                title: "Abstract Factory per UI Cross-Platform",
                description: "Creazione di componenti UI per Windows e Mac.",
                type: "example",
                code: `// Concrete Products - Windows
class WindowsButton {
  render() {
    console.log('Rendering Windows button');
  }
  onClick(callback) {
    console.log('Windows button clicked');
    callback();
  }
}

class WindowsCheckbox {
  render() {
    console.log('Rendering Windows checkbox');
  }
  toggle() {
    console.log('Windows checkbox toggled');
  }
}

// Concrete Products - Mac
class MacButton {
  render() {
    console.log('Rendering Mac button');
  }
  onClick(callback) {
    console.log('Mac button clicked');
    callback();
  }
}

class MacCheckbox {
  render() {
    console.log('Rendering Mac checkbox');
  }
  toggle() {
    console.log('Mac checkbox toggled');
  }
}

// Abstract Factory base
class GUIFactory {
  createButton() {
    throw new Error('createButton() must be implemented');
  }
  createCheckbox() {
    throw new Error('createCheckbox() must be implemented');
  }
}

// Concrete Factories
class WindowsFactory extends GUIFactory {
  createButton() {
    return new WindowsButton();
  }
  createCheckbox() {
    return new WindowsCheckbox();
  }
}

class MacFactory extends GUIFactory {
  createButton() {
    return new MacButton();
  }
  createCheckbox() {
    return new MacCheckbox();
  }
}

// Client code
function renderUI(factory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  
  button.render();
  checkbox.render();
}

// Utilizzo
const os = 'Windows'; // oppure 'Mac'
const factory = os === 'Windows' ? new WindowsFactory() : new MacFactory();
renderUI(factory);`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "UI Toolkit - Componenti diversi per tema dark/light o piattaforma Windows/Mac/Linux",
            "Database Access - Factory per creare Connection, Command, DataReader per DB diversi",
            "Documenti multi-formato - Factory per creare elementi PDF, HTML, DOC",
            "E-commerce - Factory per creare Payment, Shipping, Notification per diversi paesi",
            "Game Development - Factory per creare Enemy, Weapon, PowerUp per livelli diversi",
        ],
        whenToUse: [
            "Quando il sistema deve essere indipendente da come i prodotti sono creati",
            "Quando il sistema deve funzionare con diverse famiglie di prodotti",
            "Quando vuoi garantire che i prodotti di una famiglia siano usati insieme",
            "Quando vuoi fornire una libreria di prodotti rivelando solo le interfacce",
        ],
        whenNotToUse: [
            "Quando hai una sola famiglia di prodotti",
            "Quando aggiungere nuovi tipi di prodotti è raro",
            "Quando la gerarchia di factory diventa troppo complessa",
        ],
        relatedPatterns: ["Factory Method", "Singleton", "Prototype"],
    },

    builder: {
        id: "builder",
        name: "Builder",
        category: "creational",
        intent: "Separare la costruzione di un oggetto complesso dalla sua rappresentazione, permettendo allo stesso processo di costruzione di creare diverse rappresentazioni.",
        problem:
            "Creare oggetti complessi con molti parametri opzionali può portare a costruttori telescopici (costruttori con troppi parametri) o a oggetti parzialmente inizializzati.",
        solution:
            "Estrarre il codice di costruzione dell'oggetto in un oggetto separato chiamato builder. Organizzare la costruzione in passi che possono essere chiamati in sequenza.",
        structure:
            "Builder interface con metodi per costruire parti, ConcreteBuilder che implementa i passi, Director che definisce l'ordine di costruzione, e Product come risultato finale.",
        participants: [
            "Builder - interfaccia astratta per creare parti del prodotto",
            "ConcreteBuilder - implementa i passi e tiene traccia della rappresentazione",
            "Director - costruisce l'oggetto usando l'interfaccia Builder",
            "Product - l'oggetto complesso risultante",
        ],
        codeExamples: [
            {
                title: "Builder per Query SQL",
                description: "Costruzione fluida di query SQL complesse.",
                type: "example",
                code: `class SQLQuery {
  constructor() {
    this.selectClause = '';
    this.fromClause = '';
    this.whereConditions = [];
    this.orderByClause = '';
    this.limitClause = '';
  }

  toString() {
    let query = this.selectClause + ' ' + this.fromClause;
    
    if (this.whereConditions.length > 0) {
      query += ' WHERE ' + this.whereConditions.join(' AND ');
    }
    
    if (this.orderByClause) {
      query += ' ' + this.orderByClause;
    }
    
    if (this.limitClause) {
      query += ' ' + this.limitClause;
    }
    
    return query;
  }
}

class QueryBuilder {
  constructor() {
    this.query = new SQLQuery();
  }

  select(...columns) {
    this.query.selectClause = \`SELECT \${columns.join(', ')}\`;
    return this;
  }

  from(table) {
    this.query.fromClause = \`FROM \${table}\`;
    return this;
  }

  where(condition) {
    this.query.whereConditions.push(condition);
    return this;
  }

  orderBy(column, direction = 'ASC') {
    this.query.orderByClause = \`ORDER BY \${column} \${direction}\`;
    return this;
  }

  limit(count) {
    this.query.limitClause = \`LIMIT \${count}\`;
    return this;
  }

  build() {
    return this.query;
  }
}

// Utilizzo
const query = new QueryBuilder()
  .select('name', 'email', 'age')
  .from('users')
  .where('age > 18')
  .where('active = true')
  .orderBy('name', 'ASC')
  .limit(10)
  .build();

console.log(query.toString());
// SELECT name, email, age FROM users WHERE age > 18 AND active = true ORDER BY name ASC LIMIT 10`,
                language: "javascript",
            },
            {
                title: "Builder per Oggetti Complessi",
                description: "Costruzione di un hamburger con opzioni multiple.",
                type: "example",
                code: `class Hamburger {
  constructor(bun, patty, cheese, toppings = [], sauces = []) {
    this.bun = bun;
    this.patty = patty;
    this.cheese = cheese;
    this.toppings = toppings;
    this.sauces = sauces;
  }

  describe() {
    let description = \`\${this.bun} bun with \${this.patty} patty\`;
    if (this.cheese) description += \`, \${this.cheese} cheese\`;
    if (this.toppings.length) description += \`, toppings: \${this.toppings.join(', ')}\`;
    if (this.sauces.length) description += \`, sauces: \${this.sauces.join(', ')}\`;
    return description;
  }
}

class HamburgerBuilder {
  constructor() {
    this.bun = 'regular';
    this.patty = 'beef';
    this.cheese = null;
    this.toppings = [];
    this.sauces = [];
  }

  setBun(bun) {
    this.bun = bun;
    return this;
  }

  setPatty(patty) {
    this.patty = patty;
    return this;
  }

  addCheese(cheese) {
    this.cheese = cheese;
    return this;
  }

  addTopping(topping) {
    this.toppings.push(topping);
    return this;
  }

  addSauce(sauce) {
    this.sauces.push(sauce);
    return this;
  }

  build() {
    return new Hamburger(
      this.bun,
      this.patty,
      this.cheese,
      this.toppings,
      this.sauces
    );
  }
}

// Utilizzo
const burger = new HamburgerBuilder()
  .setBun('sesame')
  .setPatty('chicken')
  .addCheese('cheddar')
  .addTopping('lettuce')
  .addTopping('tomato')
  .addTopping('onion')
  .addSauce('mayo')
  .addSauce('ketchup')
  .build();

console.log(burger.describe());`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "StringBuilder in Java - costruzione efficiente di stringhe",
            "HTTP Request Builders - librerie come Axios, Fetch per costruire richieste",
            "Form Builders - costruzione di form HTML complessi",
            "Document Builders - creazione di PDF, Word, Excel con configurazioni complesse",
            "Configuration Builders - costruzione di oggetti di configurazione (webpack, babel)",
        ],
        whenToUse: [
            "Quando un oggetto ha molti parametri opzionali nel costruttore",
            "Quando vuoi creare diverse rappresentazioni dello stesso oggetto",
            "Quando la costruzione richiede passi complessi",
            "Quando vuoi isolare il codice di costruzione dalla logica business",
        ],
        whenNotToUse: [
            "Quando l'oggetto è semplice con pochi parametri",
            "Quando tutti i parametri sono obbligatori",
            "Quando la complessità del builder non è giustificata",
        ],
        relatedPatterns: ["Abstract Factory", "Composite", "Singleton"],
    },

    prototype: {
        id: "prototype",
        name: "Prototype",
        category: "creational",
        intent: "Specificare i tipi di oggetti da creare usando un'istanza prototipale e creare nuovi oggetti copiando questo prototipo.",
        problem:
            "Creare nuovi oggetti identici o simili a oggetti esistenti può essere costoso. Inoltre, il codice non dovrebbe dipendere dalle classi concrete degli oggetti da copiare.",
        solution:
            "Delegare il processo di clonazione agli oggetti stessi. Dichiarare un'interfaccia comune per tutti gli oggetti che supportano la clonazione.",
        structure:
            "Prototype interface con metodo clone(), ConcretePrototype che implementa clone(), e client che clona invece di creare nuove istanze.",
        participants: [
            "Prototype - dichiara l'interfaccia per clonare se stesso",
            "ConcretePrototype - implementa l'operazione di clonazione",
            "Client - crea nuovi oggetti chiedendo a un prototipo di clonarsi",
        ],
        codeExamples: [
            {
                title: "Prototype per Clonazione Oggetti",
                description: "Sistema di clonazione per configurazioni di gioco.",
                type: "example",
                code: `class GameCharacter {
  constructor(name, health, armor, weapons, skills) {
    this.name = name;
    this.health = health;
    this.armor = armor;
    this.weapons = weapons; // Array
    this.skills = skills;   // Oggetto chiave-valore
  }

  clone() {
    // Deep clone degli array e oggetti
    const clonedWeapons = [...this.weapons];
    const clonedSkills = { ...this.skills };
    
    return new GameCharacter(
      this.name,
      this.health,
      this.armor,
      clonedWeapons,
      clonedSkills
    );
  }

  display() {
    return \`\${this.name}: HP=\${this.health}, Armor=\${this.armor}\`;
  }
}

// Prototipi predefiniti
const warriorPrototype = new GameCharacter(
  'Warrior',
  100,
  50,
  ['Sword', 'Shield'],
  { Strength: 10, Defense: 8 }
);

const magePrototype = new GameCharacter(
  'Mage',
  70,
  20,
  ['Staff', 'Spellbook'],
  { Intelligence: 10, Mana: 100 }
);

// Creazione di nuovi personaggi clonando i prototipi
const player1 = warriorPrototype.clone();
player1.name = 'Aragorn';

const player2 = magePrototype.clone();
player2.name = 'Gandalf';
player2.skills.Wisdom = 15;

console.log(player1.display());
console.log(player2.display());

// I prototipi originali non sono stati modificati
console.log(warriorPrototype.display());
console.log(magePrototype.display());`,
                language: "javascript",
            },
            {
                title: "Prototype con Object.create (JavaScript)",
                description: "Approccio nativo JavaScript per prototypal inheritance.",
                type: "example",
                code: `// Prototipo base
const carPrototype = {
  wheels: 4,
  engine: 'V6',
  
  start() {
    console.log(\`Starting \${this.brand} with \${this.engine} engine\`);
  },
  
  clone() {
    return Object.create(this);
  }
};

// Creazione di nuove auto dal prototipo
const car1 = Object.create(carPrototype);
car1.brand = 'Toyota';
car1.model = 'Camry';

const car2 = Object.create(carPrototype);
car2.brand = 'Honda';
car2.model = 'Accord';
car2.engine = 'V8'; // Override

car1.start(); // Starting Toyota with V6 engine
car2.start(); // Starting Honda with V8 engine

// Modifica del prototipo si riflette su tutti gli oggetti
carPrototype.wheels = 6;
console.log(car1.wheels); // 6
console.log(car2.wheels); // 6`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "JavaScript Object.create() - creazione di oggetti da prototipi",
            "Game Development - clonazione di nemici, armi, power-up con statistiche simili",
            "Editor grafici - duplicazione di forme, simboli, template",
            "Configuration Management - clonazione di configurazioni base per ambienti diversi",
            "Document Templates - clonazione di template email, report, contratti",
        ],
        whenToUse: [
            "Quando il costo di creazione di un nuovo oggetto è maggiore della clonazione",
            "Quando vuoi evitare gerarchie di factory",
            "Quando le istanze di una classe possono avere solo poche combinazioni di stato",
            "Quando vuoi nascondere la complessità della creazione al client",
        ],
        whenNotToUse: [
            "Quando la clonazione è complessa (oggetti con riferimenti circolari)",
            "Quando gli oggetti non hanno molte proprietà da copiare",
            "Quando deep cloning è costoso o difficile da implementare",
        ],
        relatedPatterns: ["Abstract Factory", "Composite", "Decorator"],
    },

    // Continua con altri pattern...
    // Per brevità, aggiungo solo la struttura base per gli altri pattern
    // Possiamo espanderli progressivamente nei prossimi task

    adapter: {
        id: "adapter",
        name: "Adapter",
        category: "structural",
        intent: "Convertire l'interfaccia di una classe in un'altra interfaccia che i client si aspettano. Adapter permette a classi di lavorare insieme che altrimenti non potrebbero a causa di interfacce incompatibili.",
        problem:
            "Hai bisogno di usare una classe esistente, ma la sua interfaccia non è compatibile con il resto del tuo codice.",
        solution:
            "Creare una classe adapter che funge da wrapper, traducendo le chiamate dal client all'interfaccia della classe esistente.",
        structure:
            "Client chiama metodi su Adapter, che delega le chiamate a Adaptee con interfaccia incompatibile.",
        participants: [
            "Target - interfaccia che il client si aspetta",
            "Adapter - adatta Adaptee all'interfaccia Target",
            "Adaptee - classe esistente con interfaccia incompatibile",
            "Client - collabora con oggetti che rispettano l'interfaccia Target",
        ],
        codeExamples: [
            {
                title: "Adapter per API di Pagamento",
                description:
                    "Adattamento di diverse API di pagamento (Stripe, PayPal) a un'interfaccia comune.",
                type: "example",
                code: `// Sistema esistente che usa PayPal (Adaptee)
class PayPalAPI {
  constructor() {
    this.connected = false;
  }

  connect(apiKey) {
    console.log('Connessione a PayPal con API key:', apiKey);
    this.connected = true;
  }

  sendPayment(amount, email) {
    if (!this.connected) {
      throw new Error('Non connesso a PayPal');
    }
    console.log(\`Pagamento PayPal di $\${amount} inviato a \${email}\`);
    return { success: true, transactionId: 'PP-' + Date.now() };
  }
}

// Nuova libreria Stripe (Adaptee)
class StripeAPI {
  constructor(apiKey) {
    console.log('Stripe inizializzato con API key:', apiKey);
    this.apiKey = apiKey;
  }

  charge(cents, token) {
    console.log(\`Stripe charge di \${cents/100} dollari con token \${token}\`);
    return { id: 'ch_' + Date.now(), status: 'succeeded' };
  }
}

// Interfaccia comune che vogliamo usare (Target)
class PaymentProcessor {
  processPayment(amount, destination) {
    throw new Error('processPayment() deve essere implementato');
  }
}

// Adapter per PayPal
class PayPalAdapter extends PaymentProcessor {
  constructor(apiKey) {
    super();
    this.paypal = new PayPalAPI();
    this.paypal.connect(apiKey);
  }

  processPayment(amount, destination) {
    return this.paypal.sendPayment(amount, destination);
  }
}

// Adapter per Stripe
class StripeAdapter extends PaymentProcessor {
  constructor(apiKey) {
    super();
    this.stripe = new StripeAPI(apiKey);
  }

  processPayment(amount, destination) {
    const cents = amount * 100;
    return this.stripe.charge(cents, destination);
  }
}

// Client code - usa interfaccia uniforme
function checkout(processor, amount, destination) {
  console.log(\`\\nProcessing checkout...\`);
  const result = processor.processPayment(amount, destination);
  console.log('Result:', result);
}

// Utilizzo
const paypalProcessor = new PayPalAdapter('paypal-key-123');
const stripeProcessor = new StripeAdapter('stripe-key-456');

checkout(paypalProcessor, 50, 'user@example.com');
checkout(stripeProcessor, 75, 'tok_visa');`,
                language: "javascript",
            },
            {
                title: "Adapter per Legacy Database",
                description:
                    "Adattamento di vecchio sistema di storage XML a nuova interfaccia JSON.",
                type: "example",
                code: `// Sistema legacy - legge/scrive XML (Adaptee)
class XMLDatabase {
  readXML(filePath) {
    console.log(\`Lettura XML da \${filePath}\`);
    return '<users><user id="1"><name>Alice</name></user></users>';
  }

  writeXML(filePath, xmlData) {
    console.log(\`Scrittura XML in \${filePath}:\`, xmlData);
  }
}

// Nuovo sistema - vuole JSON
class ModernApp {
  loadData(database) {
    const data = database.read('users');
    console.log('Data loaded:', data);
    return data;
  }

  saveData(database, data) {
    database.write('users', data);
  }
}

// Adapter: converte XML ⇄ JSON
class XMLToJSONAdapter {
  constructor() {
    this.xmlDb = new XMLDatabase();
  }

  read(resource) {
    const xml = this.xmlDb.readXML(\`/data/\${resource}.xml\`);
    
    // Conversione semplificata XML → JSON
    const json = this.parseXMLtoJSON(xml);
    return json;
  }

  write(resource, jsonData) {
    // Conversione JSON → XML
    const xml = this.parseJSONtoXML(jsonData);
    this.xmlDb.writeXML(\`/data/\${resource}.xml\`, xml);
  }

  parseXMLtoJSON(xml) {
    // Simulazione conversione
    return [{ id: 1, name: 'Alice' }];
  }

  parseJSONtoXML(json) {
    // Simulazione conversione
    return '<users><user id="1"><name>Alice</name></user></users>';
  }
}

// Utilizzo
const app = new ModernApp();
const adapter = new XMLToJSONAdapter();

app.loadData(adapter);
app.saveData(adapter, [{ id: 2, name: 'Bob' }]);`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Integrazione API di terze parti (Stripe, PayPal, AWS SDK)",
            "Legacy code integration (adattamento vecchio codice a nuove interfacce)",
            "Database adapters (MySQL, PostgreSQL, MongoDB)",
            "Logger adapters (Winston, Log4j, console)",
            "Media player adapters (formati audio/video diversi)",
        ],
        whenToUse: [
            "Quando vuoi usare una classe esistente ma la sua interfaccia non corrisponde",
            "Quando vuoi creare una classe riutilizzabile che coopera con classi incompatibili",
            "Quando hai bisogno di usare più sottoclassi ma è impraticabile adattarle tutte",
            "Quando vuoi integrare librerie di terze parti con interfacce diverse",
        ],
        whenNotToUse: [
            "Quando puoi modificare direttamente la classe originale",
            "Quando l'adattamento è troppo complesso e introduce troppa logica",
            "Quando ci sono troppe conversioni di dati costose",
        ],
        relatedPatterns: ["Bridge", "Decorator", "Proxy", "Facade"],
    },

    bridge: {
        id: "bridge",
        name: "Bridge",
        category: "structural",
        intent: "Separare un'astrazione dalla sua implementazione in modo che possano variare indipendentemente.",
        problem:
            "Quando hai una gerarchia di classi che cresce in due dimensioni indipendenti (es. forme e colori), finisci con una esplosione di sottoclassi.",
        solution:
            "Dividere la gerarchia in due gerarchie separate: astrazione e implementazione. L'astrazione contiene un riferimento all'implementazione e delega il lavoro ad essa.",
        structure:
            "Abstraction usa Implementor interface. RefinedAbstraction estende Abstraction. ConcreteImplementor implementa Implementor.",
        participants: [
            "Abstraction - definisce l'interfaccia di astrazione e mantiene riferimento a Implementor",
            "RefinedAbstraction - estende l'interfaccia definita da Abstraction",
            "Implementor - interfaccia per le classi di implementazione",
            "ConcreteImplementor - implementa l'interfaccia Implementor",
        ],
        codeExamples: [
            {
                title: "Bridge per Dispositivi e Telecomandi",
                description:
                    "Separazione tra dispositivi (TV, Radio) e telecomandi (Base, Avanzato).",
                type: "example",
                code: `// Implementor - interfaccia dispositivi
class Device {
  isEnabled() {
    throw new Error('isEnabled() must be implemented');
  }
  enable() {
    throw new Error('enable() must be implemented');
  }
  disable() {
    throw new Error('disable() must be implemented');
  }
  getVolume() {
    throw new Error('getVolume() must be implemented');
  }
  setVolume(percent) {
    throw new Error('setVolume() must be implemented');
  }
}

// Concrete Implementors
class TV extends Device {
  constructor() {
    super();
    this.on = false;
    this.volume = 50;
  }

  isEnabled() {
    return this.on;
  }

  enable() {
    this.on = true;
    console.log('📺 TV is now ON');
  }

  disable() {
    this.on = false;
    console.log('📺 TV is now OFF');
  }

  getVolume() {
    return this.volume;
  }

  setVolume(percent) {
    this.volume = percent;
    console.log(\`📺 TV volume set to \${percent}%\`);
  }
}

class Radio extends Device {
  constructor() {
    super();
    this.on = false;
    this.volume = 30;
  }

  isEnabled() {
    return this.on;
  }

  enable() {
    this.on = true;
    console.log('📻 Radio is now ON');
  }

  disable() {
    this.on = false;
    console.log('📻 Radio is now OFF');
  }

  getVolume() {
    return this.volume;
  }

  setVolume(percent) {
    this.volume = percent;
    console.log(\`📻 Radio volume set to \${percent}%\`);
  }
}

// Abstraction - telecomando base
class RemoteControl {
  constructor(device) {
    this.device = device;
  }

  togglePower() {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeDown() {
    const currentVolume = this.device.getVolume();
    this.device.setVolume(currentVolume - 10);
  }

  volumeUp() {
    const currentVolume = this.device.getVolume();
    this.device.setVolume(currentVolume + 10);
  }
}

// Refined Abstraction - telecomando avanzato
class AdvancedRemoteControl extends RemoteControl {
  mute() {
    console.log('🔇 Muting device...');
    this.device.setVolume(0);
  }

  setChannel(channel) {
    console.log(\`📡 Setting channel to \${channel}\`);
  }
}

// Utilizzo: le due gerarchie variano indipendentemente
const tv = new TV();
const radio = new Radio();

const tvRemote = new RemoteControl(tv);
tvRemote.togglePower();
tvRemote.volumeUp();

const radioRemote = new AdvancedRemoteControl(radio);
radioRemote.togglePower();
radioRemote.mute();`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "GUI frameworks - separazione tra widget e rendering engine (Windows/Linux/Mac)",
            "Database drivers - separazione tra API e implementazione specifica del DB",
            "Dispositivi e controller - telecomandi, stampanti, dispositivi IoT",
            "Messaging systems - separazione tra sender/receiver e protocollo (SMTP, SMS, Push)",
        ],
        whenToUse: [
            "Quando vuoi evitare un legame permanente tra astrazione e implementazione",
            "Quando sia astrazione che implementazione devono essere estensibili tramite sottoclassi",
            "Quando cambiamenti nell'implementazione non devono impattare i client",
            "Quando hai una proliferazione di classi dovuta a combinazioni multiple",
        ],
        whenNotToUse: [
            "Quando hai una sola implementazione",
            "Quando l'astrazione e implementazione sono strettamente accoppiate",
            "Quando la complessità aggiunta non è giustificata",
        ],
        relatedPatterns: ["Adapter", "Abstract Factory", "Strategy"],
    },

    composite: {
        id: "composite",
        name: "Composite",
        category: "structural",
        intent: "Comporre oggetti in strutture ad albero per rappresentare gerarchie parte-tutto. Composite permette ai client di trattare uniformemente oggetti singoli e composizioni di oggetti.",
        problem:
            "Quando hai una struttura ad albero di oggetti e vuoi che i client trattino foglie e compositi allo stesso modo.",
        solution:
            "Definire un'interfaccia comune per oggetti semplici (foglie) e contenitori (compositi). I compositi contengono collezioni di componenti e delegano operazioni a loro.",
        structure:
            "Component interface, Leaf implementa Component, Composite contiene lista di Component e implementa operazioni delegando ai figli.",
        participants: [
            "Component - interfaccia comune per oggetti nella composizione",
            "Leaf - oggetto foglia senza figli",
            "Composite - componente con figli, implementa comportamenti relativi ai figli",
            "Client - manipola oggetti tramite interfaccia Component",
        ],
        codeExamples: [
            {
                title: "Composite per File System",
                description:
                    "Rappresentazione di file e cartelle in una struttura ad albero.",
                type: "example",
                code: `// Component - interfaccia comune
class FileSystemItem {
  getName() {
    throw new Error('getName() must be implemented');
  }

  getSize() {
    throw new Error('getSize() must be implemented');
  }

  display(indent = 0) {
    throw new Error('display() must be implemented');
  }
}

// Leaf - File singolo
class File extends FileSystemItem {
  constructor(name, size) {
    super();
    this.name = name;
    this.size = size;
  }

  getName() {
    return this.name;
  }

  getSize() {
    return this.size;
  }

  display(indent = 0) {
    const spaces = ' '.repeat(indent);
    console.log(\`\${spaces}📄 \${this.name} (\${this.size}KB)\`);
  }
}

// Composite - Cartella che può contenere file e altre cartelle
class Folder extends FileSystemItem {
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }

  getName() {
    return this.name;
  }

  add(item) {
    this.children.push(item);
  }

  remove(item) {
    const index = this.children.indexOf(item);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  getSize() {
    // Dimensione totale = somma dimensioni figli
    return this.children.reduce((total, child) => {
      return total + child.getSize();
    }, 0);
  }

  display(indent = 0) {
    const spaces = ' '.repeat(indent);
    console.log(\`\${spaces}📁 \${this.name}/ (\${this.getSize()}KB total)\`);
    
    // Mostra tutti i figli
    this.children.forEach(child => {
      child.display(indent + 2);
    });
  }
}

// Costruzione della struttura ad albero
const root = new Folder('root');

const documents = new Folder('documents');
documents.add(new File('report.pdf', 150));
documents.add(new File('presentation.pptx', 300));

const images = new Folder('images');
images.add(new File('photo1.jpg', 200));
images.add(new File('photo2.jpg', 180));

const videos = new Folder('videos');
videos.add(new File('tutorial.mp4', 5000));

root.add(documents);
root.add(images);
root.add(videos);
root.add(new File('readme.txt', 5));

// Client tratta file e cartelle allo stesso modo
console.log('File System Structure:');
root.display();
console.log(\`\\nTotal size: \${root.getSize()}KB\`);`,
                language: "javascript",
            },
            {
                title: "Composite per UI Components",
                description:
                    "Componenti UI annidati (box, panel, button) che possono essere renderizzati.",
                type: "example",
                code: `// Component interface
class UIComponent {
  render() {
    throw new Error('render() must be implemented');
  }
}

// Leaf - Button
class Button extends UIComponent {
  constructor(text) {
    super();
    this.text = text;
  }

  render() {
    console.log(\`  <button>\${this.text}</button>\`);
  }
}

// Leaf - Input
class Input extends UIComponent {
  constructor(placeholder) {
    super();
    this.placeholder = placeholder;
  }

  render() {
    console.log(\`  <input placeholder="\${this.placeholder}" />\`);
  }
}

// Composite - Panel che contiene altri componenti
class Panel extends UIComponent {
  constructor(title) {
    super();
    this.title = title;
    this.components = [];
  }

  add(component) {
    this.components.push(component);
  }

  remove(component) {
    const index = this.components.indexOf(component);
    if (index > -1) {
      this.components.splice(index, 1);
    }
  }

  render() {
    console.log(\`<div class="panel">\`);
    console.log(\`  <h3>\${this.title}</h3>\`);
    
    // Renderizza tutti i componenti figli
    this.components.forEach(component => {
      component.render();
    });
    
    console.log('</div>');
  }
}

// Costruzione UI complessa
const loginForm = new Panel('Login Form');
loginForm.add(new Input('Username'));
loginForm.add(new Input('Password'));
loginForm.add(new Button('Login'));

const sidebar = new Panel('Sidebar');
sidebar.add(new Button('Home'));
sidebar.add(new Button('Profile'));
sidebar.add(new Button('Settings'));

const mainPanel = new Panel('Main Container');
mainPanel.add(sidebar);
mainPanel.add(loginForm);

// Client renderizza l'intera struttura con una sola chiamata
console.log('Rendering UI:');
mainPanel.render();`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "File systems - file e cartelle",
            "UI frameworks - componenti annidati (React, Vue components)",
            "Organization charts - dipendenti e manager",
            "Graphic editors - forme semplici e gruppi di forme",
            "Menu systems - menu items e sottomenu",
        ],
        whenToUse: [
            "Quando vuoi rappresentare gerarchie parte-tutto di oggetti",
            "Quando vuoi che i client ignorino la differenza tra composizioni e oggetti singoli",
            "Quando la struttura può avere profondità arbitraria",
            "Quando vuoi applicare operazioni ricorsivamente su una struttura ad albero",
        ],
        whenNotToUse: [
            "Quando la struttura non è naturalmente ad albero",
            "Quando foglie e compositi hanno operazioni molto diverse",
            "Quando la complessità della gerarchia non è necessaria",
        ],
        relatedPatterns: ["Iterator", "Visitor", "Decorator", "Chain of Responsibility"],
    },

    decorator: {
        id: "decorator",
        name: "Decorator",
        category: "structural",
        intent: "Aggiungere responsabilità aggiuntive a un oggetto dinamicamente. I decorator forniscono un'alternativa flessibile all'ereditarietà per estendere funzionalità.",
        problem:
            "Estendere funzionalità tramite ereditarietà è statico e si applica a tutta la classe. Inoltre, avere molte combinazioni di funzionalità porta a una esplosione di sottoclassi.",
        solution:
            "Creare decorator che wrappano l'oggetto originale e aggiungono nuove funzionalità. I decorator implementano la stessa interfaccia dell'oggetto wrappato.",
        structure:
            "Component interface, ConcreteComponent implementa Component, Decorator wrappa Component e aggiunge comportamenti.",
        participants: [
            "Component - interfaccia comune per oggetti che possono avere responsabilità aggiunte",
            "ConcreteComponent - oggetto a cui possono essere aggiunte responsabilità",
            "Decorator - mantiene riferimento a Component e implementa interfaccia Component",
            "ConcreteDecorator - aggiunge responsabilità al componente",
        ],
        codeExamples: [
            {
                title: "Decorator per Coffee Shop",
                description:
                    "Aggiunta dinamica di ingredienti extra a bevande con calcolo del prezzo.",
                type: "example",
                code: `// Component - interfaccia bevanda
class Beverage {
  getDescription() {
    return 'Unknown Beverage';
  }

  cost() {
    return 0;
  }
}

// Concrete Components - bevande base
class Espresso extends Beverage {
  getDescription() {
    return 'Espresso';
  }

  cost() {
    return 1.99;
  }
}

class HouseBlend extends Beverage {
  getDescription() {
    return 'House Blend Coffee';
  }

  cost() {
    return 0.89;
  }
}

// Decorator base
class CondimentDecorator extends Beverage {
  constructor(beverage) {
    super();
    this.beverage = beverage;
  }
}

// Concrete Decorators - ingredienti extra
class Milk extends CondimentDecorator {
  getDescription() {
    return this.beverage.getDescription() + ', Milk';
  }

  cost() {
    return this.beverage.cost() + 0.10;
  }
}

class Mocha extends CondimentDecorator {
  getDescription() {
    return this.beverage.getDescription() + ', Mocha';
  }

  cost() {
    return this.beverage.cost() + 0.20;
  }
}

class Whip extends CondimentDecorator {
  getDescription() {
    return this.beverage.getDescription() + ', Whip';
  }

  cost() {
    return this.beverage.cost() + 0.15;
  }
}

// Utilizzo: wrapping multiplo per combinare funzionalità
let beverage1 = new Espresso();
console.log(\`\${beverage1.getDescription()} $\${beverage1.cost()}\`);

let beverage2 = new HouseBlend();
beverage2 = new Milk(beverage2);
beverage2 = new Mocha(beverage2);
beverage2 = new Whip(beverage2);
console.log(\`\${beverage2.getDescription()} $\${beverage2.cost()}\`);

// Output:
// Espresso $1.99
// House Blend Coffee, Milk, Mocha, Whip $1.34`,
                language: "javascript",
            },
            {
                title: "Decorator per Data Streams",
                description:
                    "Aggiunta di funzionalità come compressione e crittografia a stream di dati.",
                type: "example",
                code: `// Component - interfaccia stream
class DataStream {
  write(data) {
    throw new Error('write() must be implemented');
  }

  read() {
    throw new Error('read() must be implemented');
  }
}

// Concrete Component - stream base
class FileStream extends DataStream {
  constructor() {
    super();
    this.data = '';
  }

  write(data) {
    this.data = data;
    console.log(\`📝 Writing to file: "\${data}"\`);
  }

  read() {
    console.log(\`📖 Reading from file: "\${this.data}"\`);
    return this.data;
  }
}

// Decorators
class CompressionDecorator extends DataStream {
  constructor(stream) {
    super();
    this.stream = stream;
  }

  write(data) {
    const compressed = this.compress(data);
    console.log(\`🗜️  Compressing data: "\${data}" → "\${compressed}"\`);
    this.stream.write(compressed);
  }

  read() {
    const data = this.stream.read();
    const decompressed = this.decompress(data);
    console.log(\`📦 Decompressing: "\${data}" → "\${decompressed}"\`);
    return decompressed;
  }

  compress(data) {
    return data.split('').reverse().join(''); // Simulazione
  }

  decompress(data) {
    return data.split('').reverse().join('');
  }
}

class EncryptionDecorator extends DataStream {
  constructor(stream) {
    super();
    this.stream = stream;
  }

  write(data) {
    const encrypted = this.encrypt(data);
    console.log(\`🔒 Encrypting data: "\${data}" → "\${encrypted}"\`);
    this.stream.write(encrypted);
  }

  read() {
    const data = this.stream.read();
    const decrypted = this.decrypt(data);
    console.log(\`🔓 Decrypting: "\${data}" → "\${decrypted}"\`);
    return decrypted;
  }

  encrypt(data) {
    return Buffer.from(data).toString('base64'); // Simulazione
  }

  decrypt(data) {
    return Buffer.from(data, 'base64').toString('utf-8');
  }
}

// Utilizzo: stack di decorators
let stream = new FileStream();
stream = new CompressionDecorator(stream);
stream = new EncryptionDecorator(stream);

console.log('\\n--- Writing ---');
stream.write('Hello World');

console.log('\\n--- Reading ---');
const result = stream.read();
console.log(\`Final result: "\${result}"\`);`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Java I/O streams - BufferedReader, FileReader, etc.",
            "Middleware in web frameworks - logging, authentication, caching",
            "UI components - scrollbars, borders, shadows",
            "Text formatting - bold, italic, underline",
            "HTTP requests - retry logic, caching, logging",
        ],
        whenToUse: [
            "Quando vuoi aggiungere responsabilità a oggetti singoli dinamicamente",
            "Quando l'ereditarietà non è praticabile (troppi comportamenti da combinare)",
            "Quando vuoi che le responsabilità siano revocabili",
            "Quando estendere funzionalità tramite sottoclassi è impraticabile",
        ],
        whenNotToUse: [
            "Quando hai bisogno di modificare l'interfaccia dell'oggetto",
            "Quando la catena di decorator diventa troppo complessa",
            "Quando bastano semplici flag booleani per configurare comportamenti",
        ],
        relatedPatterns: ["Adapter", "Composite", "Strategy", "Proxy"],
    },

    facade: {
        id: "facade",
        name: "Facade",
        category: "structural",
        intent: "Fornire un'interfaccia unificata a un insieme di interfacce in un sottosistema. Facade definisce un'interfaccia di livello superiore che rende il sottosistema più facile da usare.",
        problem:
            "Quando lavori con librerie complesse o sottosistemi con molte classi interdipendenti, il codice client diventa complicato e fortemente accoppiato.",
        solution:
            "Creare una classe facade che fornisce un'interfaccia semplice per le operazioni comuni del sottosistema. Il facade delega le chiamate agli oggetti appropriati del sottosistema.",
        structure:
            "Facade fornisce metodi semplici che delegano a classi del sottosistema complesso. Client usa solo Facade invece di interagire direttamente con il sottosistema.",
        participants: [
            "Facade - conosce quali classi del sottosistema sono responsabili per una richiesta",
            "Subsystem classes - implementano funzionalità del sottosistema, gestite da Facade",
            "Client - usa Facade invece di chiamare direttamente le classi del sottosistema",
        ],
        codeExamples: [
            {
                title: "Facade per Home Theater System",
                description:
                    "Semplificazione dell'interfaccia per un sistema home theater complesso.",
                type: "example",
                code: `// Sottosistema complesso - molte classi interdipendenti
class Amplifier {
  on() {
    console.log('🔊 Amplifier on');
  }

  off() {
    console.log('🔊 Amplifier off');
  }

  setVolume(level) {
    console.log(\`🔊 Amplifier volume set to \${level}\`);
  }
}

class DVDPlayer {
  on() {
    console.log('💿 DVD Player on');
  }

  off() {
    console.log('💿 DVD Player off');
  }

  play(movie) {
    console.log(\`💿 Playing "\${movie}"\`);
  }

  stop() {
    console.log('💿 DVD Player stopped');
  }
}

class Projector {
  on() {
    console.log('📽️  Projector on');
  }

  off() {
    console.log('📽️  Projector off');
  }

  wideScreenMode() {
    console.log('📽️  Projector in widescreen mode (16:9)');
  }
}

class Lights {
  dim(level) {
    console.log(\`💡 Lights dimmed to \${level}%\`);
  }

  on() {
    console.log('💡 Lights on');
  }
}

// ❌ SENZA FACADE: Client deve gestire tutto manualmente
function watchMovieWithoutFacade(movie) {
  console.log('\\n--- Manual Setup (Without Facade) ---');
  const amp = new Amplifier();
  const dvd = new DVDPlayer();
  const projector = new Projector();
  const lights = new Lights();

  lights.dim(10);
  projector.on();
  projector.wideScreenMode();
  amp.on();
  amp.setVolume(5);
  dvd.on();
  dvd.play(movie);
}

// ✅ CON FACADE: Interfaccia semplificata
class HomeTheaterFacade {
  constructor(amp, dvd, projector, lights) {
    this.amp = amp;
    this.dvd = dvd;
    this.projector = projector;
    this.lights = lights;
  }

  watchMovie(movie) {
    console.log(\`\\n🎬 Get ready to watch "\${movie}"...\`);
    this.lights.dim(10);
    this.projector.on();
    this.projector.wideScreenMode();
    this.amp.on();
    this.amp.setVolume(5);
    this.dvd.on();
    this.dvd.play(movie);
    console.log('✅ Enjoy your movie!\\n');
  }

  endMovie() {
    console.log('\\n🎬 Shutting down home theater...');
    this.dvd.stop();
    this.dvd.off();
    this.amp.off();
    this.projector.off();
    this.lights.on();
    console.log('✅ Home theater shut down\\n');
  }
}

// Client usa facade - molto più semplice!
const homeTheater = new HomeTheaterFacade(
  new Amplifier(),
  new DVDPlayer(),
  new Projector(),
  new Lights()
);

homeTheater.watchMovie('The Matrix');
homeTheater.endMovie();`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Librerie complesse - jQuery è un facade per DOM API",
            "Framework - Express.js semplifica Node.js HTTP server",
            "Database ORM - Sequelize/TypeORM nascondono complessità SQL",
            "Payment gateways - interfaccia semplice per sistemi di pagamento complessi",
            "Cloud services - SDK che semplificano API complesse (AWS SDK)",
        ],
        whenToUse: [
            "Quando vuoi fornire interfaccia semplice a sottosistema complesso",
            "Quando ci sono molte dipendenze tra client e classi di implementazione",
            "Quando vuoi stratificare i sottosistemi",
            "Quando vuoi ridurre accoppiamento tra sottosistemi e client",
        ],
        whenNotToUse: [
            "Quando il sottosistema è già semplice",
            "Quando i client hanno bisogno di accesso diretto a funzionalità avanzate",
            'Quando il facade diventa un "god object" con troppe responsabilità',
        ],
        relatedPatterns: ["Abstract Factory", "Mediator", "Singleton"],
    },

    flyweight: {
        id: "flyweight",
        name: "Flyweight",
        category: "structural",
        intent: "Usare condivisione per supportare efficientemente un grande numero di oggetti a grana fine.",
        problem:
            "Creare un grande numero di oggetti simili consuma troppa memoria. Molti oggetti contengono dati duplicati.",
        solution:
            "Estrarre lo stato condiviso (intrinseco) dagli oggetti e memorizzarlo in un pool di flyweight. Lo stato variabile (estrinseco) viene passato ai metodi quando necessario.",
        structure:
            "Flyweight contiene stato intrinseco condiviso, FlyweightFactory gestisce pool di flyweight, Client mantiene stato estrinseco.",
        participants: [
            "Flyweight - interfaccia per flyweight che riceve e agisce su stato estrinseco",
            "ConcreteFlyweight - implementa interfaccia e memorizza stato intrinseco",
            "FlyweightFactory - crea e gestisce oggetti flyweight, assicura condivisione",
            "Client - mantiene riferimenti a flyweight e calcola/memorizza stato estrinseco",
        ],
        codeExamples: [
            {
                title: "Flyweight per Forest Rendering",
                description:
                    "Rendering efficiente di migliaia di alberi in una foresta condividendo mesh e texture.",
                type: "example",
                code: `// Flyweight - stato intrinseco condiviso (tipo albero)
class TreeType {
  constructor(name, color, texture) {
    this.name = name;
    this.color = color;
    this.texture = texture;
    console.log(\`🌲 Creating TreeType: \${name} (shared)\`);
  }

  draw(x, y) {
    console.log(\`Drawing \${this.name} tree at (\${x}, \${y}) with \${this.color} color\`);
  }
}

// Flyweight Factory - gestisce pool di flyweight
class TreeFactory {
  constructor() {
    this.treeTypes = {};
  }

  getTreeType(name, color, texture) {
    const key = \`\${name}_\${color}_\${texture}\`;
    
    if (!this.treeTypes[key]) {
      this.treeTypes[key] = new TreeType(name, color, texture);
    } else {
      console.log(\`♻️  Reusing existing TreeType: \${name}\`);
    }
    
    return this.treeTypes[key];
  }

  getTreeTypeCount() {
    return Object.keys(this.treeTypes).length;
  }
}

// Context - stato estrinseco (posizione unica di ogni albero)
class Tree {
  constructor(x, y, treeType) {
    this.x = x;
    this.y = y;
    this.treeType = treeType; // Riferimento a flyweight condiviso
  }

  draw() {
    this.treeType.draw(this.x, this.y);
  }
}

// Forest - gestisce migliaia di alberi
class Forest {
  constructor() {
    this.trees = [];
    this.factory = new TreeFactory();
  }

  plantTree(x, y, name, color, texture) {
    const type = this.factory.getTreeType(name, color, texture);
    const tree = new Tree(x, y, type);
    this.trees.push(tree);
  }

  draw() {
    console.log(\`\\n🌳 Drawing \${this.trees.length} trees:\`);
    this.trees.forEach(tree => tree.draw());
  }

  getMemoryUsage() {
    const treeTypeCount = this.factory.getTreeTypeCount();
    const treeCount = this.trees.length;
    console.log(\`\\n📊 Memory Statistics:\`);
    console.log(\`  Total trees: \${treeCount}\`);
    console.log(\`  Unique tree types (flyweights): \${treeTypeCount}\`);
    console.log(\`  Memory saved: \${((1 - treeTypeCount/treeCount) * 100).toFixed(1)}%\`);
  }
}

// Utilizzo: planting di migliaia di alberi
const forest = new Forest();

// Piantare 10000 alberi di soli 3 tipi
for (let i = 0; i < 3333; i++) {
  forest.plantTree(Math.random() * 1000, Math.random() * 1000, 'Oak', 'Green', 'Oak_texture');
}
for (let i = 0; i < 3333; i++) {
  forest.plantTree(Math.random() * 1000, Math.random() * 1000, 'Pine', 'Dark Green', 'Pine_texture');
}
for (let i = 0; i < 3334; i++) {
  forest.plantTree(Math.random() * 1000, Math.random() * 1000, 'Birch', 'White', 'Birch_texture');
}

forest.getMemoryUsage();
// Invece di 10000 oggetti TreeType, abbiamo solo 3!`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Text editors - condivisione di character glyphs",
            "Game development - sprite sharing per particles, bullets, enemies",
            "UI frameworks - condivisione di icon/image resources",
            "String pooling - Java String interning",
            "Database connection pooling - riuso di connessioni",
        ],
        whenToUse: [
            "Quando hai un grande numero di oggetti simili",
            "Quando la memoria è una preoccupazione critica",
            "Quando la maggior parte dello stato può essere estrinseco",
            "Quando l'identità degli oggetti non è importante",
        ],
        whenNotToUse: [
            "Quando hai pochi oggetti",
            "Quando lo stato è prevalentemente estrinseco",
            "Quando la complessità aggiunta non giustifica il risparmio di memoria",
        ],
        relatedPatterns: ["Composite", "State", "Strategy"],
    },

    proxy: {
        id: "proxy",
        name: "Proxy",
        category: "structural",
        intent: "Fornire un surrogato o segnaposto per un altro oggetto per controllarne l'accesso.",
        problem:
            "Vuoi aggiungere controllo di accesso, lazy loading, caching, o logging a un oggetto senza modificare il suo codice.",
        solution:
            "Creare una classe proxy che implementa la stessa interfaccia dell'oggetto reale e contiene un riferimento ad esso. Il proxy intercetta chiamate e può aggiungere logica prima/dopo aver delegato all'oggetto reale.",
        structure:
            "Subject interface, RealSubject implementa Subject, Proxy implementa Subject e mantiene riferimento a RealSubject.",
        participants: [
            "Subject - interfaccia comune per RealSubject e Proxy",
            "RealSubject - oggetto reale rappresentato dal proxy",
            "Proxy - mantiene riferimento a RealSubject e controlla accesso ad esso",
            "Client - lavora con Subject tramite interfaccia",
        ],
        codeExamples: [
            {
                title: "Proxy per Image Loading (Virtual Proxy)",
                description:
                    "Lazy loading di immagini pesanti - caricamento solo quando necessario.",
                type: "example",
                code: `// Subject interface
class Image {
  display() {
    throw new Error('display() must be implemented');
  }
}

// RealSubject - immagine reale (pesante da caricare)
class RealImage extends Image {
  constructor(filename) {
    super();
    this.filename = filename;
    this.loadFromDisk();
  }

  loadFromDisk() {
    console.log(\`📥 Loading image from disk: \${this.filename}\`);
    console.log('   ... reading file ...');
    console.log('   ... decoding pixels ...');
    console.log(\`✅ Image loaded: \${this.filename}\`);
  }

  display() {
    console.log(\`🖼️  Displaying: \${this.filename}\`);
  }
}

// Proxy - lazy loading
class ImageProxy extends Image {
  constructor(filename) {
    super();
    this.filename = filename;
    this.realImage = null; // Non caricata ancora
  }

  display() {
    // Carica l'immagine solo quando serve (lazy loading)
    if (!this.realImage) {
      console.log(\`⏳ First access to \${this.filename}, loading now...\`);
      this.realImage = new RealImage(this.filename);
    } else {
      console.log(\`♻️  Image already loaded: \${this.filename}\`);
    }
    
    this.realImage.display();
  }
}

// Utilizzo
console.log('Creating image proxies (fast, no loading yet):');
const image1 = new ImageProxy('photo1.jpg');
const image2 = new ImageProxy('photo2.jpg');
const image3 = new ImageProxy('photo3.jpg');

console.log('\\nDisplaying image1 (triggers loading):');
image1.display();

console.log('\\nDisplaying image1 again (already loaded):');
image1.display();

console.log('\\nDisplaying image2 (triggers loading):');
image2.display();

// image3 non viene mai visualizzata, quindi non viene mai caricata!`,
                language: "javascript",
            },
            {
                title: "Proxy per Access Control (Protection Proxy)",
                description:
                    "Controllo dell'accesso a operazioni sensibili basato sui permessi.",
                type: "example",
                code: `// Subject
class BankAccount {
  withdraw(amount) {
    throw new Error('withdraw() must be implemented');
  }

  deposit(amount) {
    throw new Error('deposit() must be implemented');
  }

  getBalance() {
    throw new Error('getBalance() must be implemented');
  }
}

// RealSubject
class RealBankAccount extends BankAccount {
  constructor(initialBalance) {
    super();
    this.balance = initialBalance;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log(\`❌ Insufficient funds. Balance: $\${this.balance}\`);
      return false;
    }
    this.balance -= amount;
    console.log(\`💸 Withdrew $\${amount}. New balance: $\${this.balance}\`);
    return true;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(\`💰 Deposited $\${amount}. New balance: $\${this.balance}\`);
  }

  getBalance() {
    return this.balance;
  }
}

// Protection Proxy - controlla permessi
class BankAccountProxy extends BankAccount {
  constructor(realAccount, userRole) {
    super();
    this.realAccount = realAccount;
    this.userRole = userRole;
  }

  withdraw(amount) {
    if (this.userRole !== 'owner' && this.userRole !== 'authorized') {
      console.log(\`🚫 Access denied: \${this.userRole} cannot withdraw\`);
      return false;
    }
    return this.realAccount.withdraw(amount);
  }

  deposit(amount) {
    // Tutti possono depositare
    return this.realAccount.deposit(amount);
  }

  getBalance() {
    if (this.userRole === 'guest') {
      console.log('🚫 Access denied: guests cannot view balance');
      return null;
    }
    const balance = this.realAccount.getBalance();
    console.log(\`💵 Balance: $\${balance}\`);
    return balance;
  }
}

// Utilizzo
const account = new RealBankAccount(1000);

console.log('\\n--- Owner access ---');
const ownerProxy = new BankAccountProxy(account, 'owner');
ownerProxy.getBalance();
ownerProxy.withdraw(100);

console.log('\\n--- Guest access ---');
const guestProxy = new BankAccountProxy(account, 'guest');
guestProxy.getBalance(); // Negato
guestProxy.withdraw(50);  // Negato
guestProxy.deposit(200);  // Permesso

console.log('\\n--- Auditor access ---');
const auditorProxy = new BankAccountProxy(account, 'auditor');
auditorProxy.getBalance(); // Permesso
auditorProxy.withdraw(50);  // Negato`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Virtual Proxy - lazy loading di oggetti pesanti (immagini, video)",
            "Protection Proxy - controllo accesso basato su permessi",
            "Remote Proxy - rappresenta oggetti in spazi di indirizzamento diversi (RPC, REST API)",
            "Caching Proxy - cache dei risultati di operazioni costose",
            "Logging Proxy - log delle chiamate ai metodi",
        ],
        whenToUse: [
            "Quando vuoi lazy initialization di oggetti pesanti",
            "Quando vuoi controllo di accesso a un oggetto",
            "Quando vuoi aggiungere funzionalità (logging, caching) senza modificare oggetto",
            "Quando l'oggetto è remoto o difficile da accedere direttamente",
        ],
        whenNotToUse: [
            "Quando la complessità del proxy non è giustificata",
            "Quando non hai bisogno di controllo sull'accesso",
            "Quando l'overhead del proxy è troppo alto",
        ],
        relatedPatterns: ["Adapter", "Decorator", "Facade"],
    },

    // ==================== BEHAVIORAL PATTERNS ====================

    observer: {
        id: "observer",
        name: "Observer",
        category: "behavioral",
        intent: "Definire una dipendenza uno-a-molti tra oggetti in modo che quando un oggetto cambia stato, tutti i suoi dipendenti vengono notificati e aggiornati automaticamente.",
        problem:
            "Quando un oggetto deve notificare altri oggetti senza conoscere chi sono o quanti sono, creando un accoppiamento stretto.",
        solution:
            "Definire un meccanismo di sottoscrizione che permette a più oggetti di osservare un soggetto. Quando il soggetto cambia stato, notifica automaticamente tutti gli osservatori.",
        structure:
            "Subject mantiene lista di Observer e fornisce metodi attach/detach. Observer definisce interfaccia update(). ConcreteObserver implementa update().",
        participants: [
            "Subject - conosce i suoi observer e fornisce interfaccia per attach/detach",
            "Observer - interfaccia per ricevere notifiche",
            "ConcreteSubject - memorizza stato e notifica observer quando cambia",
            "ConcreteObserver - implementa update() e mantiene riferimento a ConcreteSubject",
        ],
        codeExamples: [
            {
                title: "Observer per Sistema di Notifiche",
                description:
                    "Newsletter che notifica automaticamente tutti gli iscritti quando esce un nuovo articolo.",
                type: "example",
                code: `// Subject - Newsletter
class Newsletter {
  constructor() {
    this.subscribers = [];
    this.latestArticle = null;
  }

  subscribe(observer) {
    console.log(\`📧 \${observer.name} subscribed to newsletter\`);
    this.subscribers.push(observer);
  }

  unsubscribe(observer) {
    const index = this.subscribers.indexOf(observer);
    if (index > -1) {
      this.subscribers.splice(index, 1);
      console.log(\`❌ \${observer.name} unsubscribed from newsletter\`);
    }
  }

  publishArticle(article) {
    console.log(\`\\n📰 Publishing new article: "\${article.title}"\`);
    this.latestArticle = article;
    this.notifySubscribers();
  }

  notifySubscribers() {
    console.log(\`🔔 Notifying \${this.subscribers.length} subscribers...\`);
    this.subscribers.forEach(subscriber => {
      subscriber.update(this.latestArticle);
    });
  }
}

// Observer - Subscriber
class EmailSubscriber {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  update(article) {
    console.log(\`✉️  Email sent to \${this.name} (\${this.email}): "\${article.title}"\`);
  }
}

class SMSSubscriber {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  update(article) {
    console.log(\`📱 SMS sent to \${this.name} (\${this.phone}): "\${article.title}"\`);
  }
}

// Utilizzo
const newsletter = new Newsletter();

const alice = new EmailSubscriber('Alice', 'alice@example.com');
const bob = new SMSSubscriber('Bob', '+1234567890');
const charlie = new EmailSubscriber('Charlie', 'charlie@example.com');

newsletter.subscribe(alice);
newsletter.subscribe(bob);
newsletter.subscribe(charlie);

newsletter.publishArticle({
  title: 'Observer Pattern Explained',
  content: 'Learn about the Observer pattern...'
});

newsletter.unsubscribe(bob);

newsletter.publishArticle({
  title: 'Design Patterns in JavaScript',
  content: 'Master design patterns...'
});`,
                language: "javascript",
            },
            {
                title: "Observer per Stock Market",
                description:
                    "Sistema di trading che notifica investitori quando il prezzo di uno stock cambia.",
                type: "example",
                code: `// Subject - Stock
class Stock {
  constructor(symbol, price) {
    this.symbol = symbol;
    this.price = price;
    this.investors = [];
  }

  attach(investor) {
    this.investors.push(investor);
    console.log(\`📈 \${investor.name} is now watching \${this.symbol}\`);
  }

  detach(investor) {
    const index = this.investors.indexOf(investor);
    if (index > -1) {
      this.investors.splice(index, 1);
    }
  }

  setPrice(newPrice) {
    const oldPrice = this.price;
    this.price = newPrice;
    const change = ((newPrice - oldPrice) / oldPrice * 100).toFixed(2);
    
    console.log(\`\\n💰 \${this.symbol}: $\${oldPrice} → $\${newPrice} (\${change}%)\`);
    this.notify();
  }

  notify() {
    this.investors.forEach(investor => {
      investor.update(this);
    });
  }
}

// Concrete Observers
class Investor {
  constructor(name, strategy) {
    this.name = name;
    this.strategy = strategy; // 'buy-low', 'sell-high', 'hold'
  }

  update(stock) {
    if (this.strategy === 'buy-low' && stock.price < 100) {
      console.log(\`✅ \${this.name}: Buying \${stock.symbol} at $\${stock.price}\`);
    } else if (this.strategy === 'sell-high' && stock.price > 150) {
      console.log(\`💸 \${this.name}: Selling \${stock.symbol} at $\${stock.price}\`);
    } else {
      console.log(\`⏸️  \${this.name}: Holding \${stock.symbol} at $\${stock.price}\`);
    }
  }
}

// Utilizzo
const apple = new Stock('AAPL', 120);

const investor1 = new Investor('John', 'buy-low');
const investor2 = new Investor('Sarah', 'sell-high');
const investor3 = new Investor('Mike', 'hold');

apple.attach(investor1);
apple.attach(investor2);
apple.attach(investor3);

apple.setPrice(95);  // John buys
apple.setPrice(160); // Sarah sells
apple.setPrice(130); // All hold`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Event listeners in JavaScript (addEventListener)",
            "React state management (useState, Redux subscribers)",
            "RxJS Observables",
            "Pub/Sub messaging systems (Redis, RabbitMQ)",
            "Model-View architecture (MVC, MVVM)",
        ],
        whenToUse: [
            "Quando un cambiamento di stato in un oggetto richiede cambiamenti in altri",
            "Quando non sai quanti oggetti devono essere notificati",
            "Quando vuoi disaccoppiare soggetto e osservatori",
            "Quando serve broadcast di eventi a molteplici listener",
        ],
        whenNotToUse: [
            "Quando hai solo un osservatore (usa callback diretto)",
            "Quando l'ordine di notifica è critico",
            "Quando troppe notifiche causano problemi di performance",
        ],
        relatedPatterns: ["Mediator", "Singleton", "Command"],
    },

    strategy: {
        id: "strategy",
        name: "Strategy",
        category: "behavioral",
        intent: "Definire una famiglia di algoritmi, incapsularli e renderli intercambiabili. Strategy permette all'algoritmo di variare indipendentemente dai client che lo usano.",
        problem:
            "Quando hai molteplici algoritmi correlati e vuoi passare da uno all'altro a runtime senza condizionali complessi.",
        solution:
            "Estrarre gli algoritmi in classi separate (strategie) con interfaccia comune. Il contesto mantiene riferimento a una strategia e delega il lavoro ad essa.",
        structure:
            "Context usa Strategy interface. ConcreteStrategy implementa algoritmi specifici. Context può switchare strategie a runtime.",
        participants: [
            "Strategy - interfaccia comune a tutti gli algoritmi",
            "ConcreteStrategy - implementa algoritmo usando interfaccia Strategy",
            "Context - mantiene riferimento a Strategy e delega lavoro ad essa",
        ],
        codeExamples: [
            {
                title: "Strategy per Payment Processing",
                description:
                    "Diversi metodi di pagamento (carta, PayPal, crypto) intercambiabili.",
                type: "example",
                code: `// Strategy interface
class PaymentStrategy {
  pay(amount) {
    throw new Error('pay() must be implemented');
  }
}

// Concrete Strategies
class CreditCardPayment extends PaymentStrategy {
  constructor(cardNumber, cvv) {
    super();
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  pay(amount) {
    console.log(\`💳 Paying $\${amount} with Credit Card ending in \${this.cardNumber.slice(-4)}\`);
    console.log('   Processing card transaction...');
    console.log('   ✅ Payment successful');
  }
}

class PayPalPayment extends PaymentStrategy {
  constructor(email) {
    super();
    this.email = email;
  }

  pay(amount) {
    console.log(\`🅿️  Paying $\${amount} with PayPal account \${this.email}\`);
    console.log('   Redirecting to PayPal...');
    console.log('   ✅ Payment confirmed');
  }
}

class CryptoPayment extends PaymentStrategy {
  constructor(walletAddress) {
    super();
    this.walletAddress = walletAddress;
  }

  pay(amount) {
    console.log(\`₿  Paying $\${amount} with Crypto wallet \${this.walletAddress.slice(0, 8)}...\`);
    console.log('   Broadcasting transaction to blockchain...');
    console.log('   ✅ Transaction confirmed');
  }
}

// Context - Shopping Cart
class ShoppingCart {
  constructor() {
    this.items = [];
    this.paymentStrategy = null;
  }

  addItem(item, price) {
    this.items.push({ item, price });
    console.log(\`🛒 Added \${item} ($\${price}) to cart\`);
  }

  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }

  checkout() {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    console.log(\`\\n📦 Checkout - Total: $\${total}\`);
    
    if (!this.paymentStrategy) {
      console.log('❌ Please select a payment method');
      return;
    }
    
    this.paymentStrategy.pay(total);
  }
}

// Utilizzo
const cart = new ShoppingCart();
cart.addItem('Laptop', 999);
cart.addItem('Mouse', 25);

// Try different payment strategies
console.log('\\n--- Payment with Credit Card ---');
cart.setPaymentStrategy(new CreditCardPayment('1234-5678-9012-3456', '123'));
cart.checkout();

console.log('\\n--- Payment with PayPal ---');
cart.setPaymentStrategy(new PayPalPayment('user@example.com'));
cart.checkout();

console.log('\\n--- Payment with Crypto ---');
cart.setPaymentStrategy(new CryptoPayment('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'));
cart.checkout();`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Sorting algorithms (QuickSort, MergeSort, BubbleSort)",
            "Compression algorithms (ZIP, RAR, GZIP)",
            "Validation strategies (email, phone, credit card)",
            "Route calculation (fastest, shortest, scenic)",
            "Pricing strategies (normal, discount, premium)",
        ],
        whenToUse: [
            "Quando hai molti algoritmi correlati che differiscono solo nel comportamento",
            "Quando vuoi evitare condizionali complessi per scegliere algoritmo",
            "Quando vuoi nascondere dettagli implementativi degli algoritmi",
            "Quando gli algoritmi devono essere intercambiabili a runtime",
        ],
        whenNotToUse: [
            "Quando hai solo un algoritmo",
            "Quando gli algoritmi non cambiano mai",
            "Quando il client non ha bisogno di scegliere l'algoritmo",
        ],
        relatedPatterns: ["State", "Template Method", "Decorator"],
    },

    command: {
        id: "command",
        name: "Command",
        category: "behavioral",
        intent: "Incapsulare una richiesta come oggetto, permettendo di parametrizzare client con diverse richieste, accodare richieste, e supportare operazioni annullabili.",
        problem:
            "Quando vuoi disaccoppiare l'oggetto che invoca l'operazione da quello che sa come eseguirla, o quando serve undo/redo.",
        solution:
            "Incapsulare richieste come oggetti Command con metodo execute(). Invoker chiama execute() senza conoscere i dettagli. Receiver esegue il lavoro effettivo.",
        structure:
            "Command interface con execute(). ConcreteCommand implementa execute() e chiama metodi su Receiver. Invoker memorizza Command.",
        participants: [
            "Command - interfaccia per eseguire operazione",
            "ConcreteCommand - implementa execute() e invoca metodi su Receiver",
            "Receiver - sa come eseguire operazioni",
            "Invoker - chiede al command di eseguire richiesta",
            "Client - crea ConcreteCommand e imposta Receiver",
        ],
        codeExamples: [
            {
                title: "Command per Text Editor (Undo/Redo)",
                description:
                    "Editor di testo con supporto per undo/redo delle operazioni.",
                type: "example",
                code: `// Receiver - Document
class Document {
  constructor() {
    this.content = '';
  }

  write(text) {
    this.content += text;
  }

  delete(length) {
    this.content = this.content.slice(0, -length);
  }

  getContent() {
    return this.content;
  }
}

// Command interface
class Command {
  execute() {
    throw new Error('execute() must be implemented');
  }

  undo() {
    throw new Error('undo() must be implemented');
  }
}

// Concrete Commands
class WriteCommand extends Command {
  constructor(document, text) {
    super();
    this.document = document;
    this.text = text;
  }

  execute() {
    this.document.write(this.text);
    console.log(\`✍️  Wrote: "\${this.text}"\`);
  }

  undo() {
    this.document.delete(this.text.length);
    console.log(\`⏮️  Undid write: "\${this.text}"\`);
  }
}

class DeleteCommand extends Command {
  constructor(document, length) {
    super();
    this.document = document;
    this.length = length;
    this.deletedText = '';
  }

  execute() {
    const content = this.document.getContent();
    this.deletedText = content.slice(-this.length);
    this.document.delete(this.length);
    console.log(\`🗑️  Deleted: "\${this.deletedText}"\`);
  }

  undo() {
    this.document.write(this.deletedText);
    console.log(\`⏮️  Undid delete: "\${this.deletedText}"\`);
  }
}

// Invoker - Editor
class TextEditor {
  constructor(document) {
    this.document = document;
    this.history = [];
    this.redoStack = [];
  }

  executeCommand(command) {
    command.execute();
    this.history.push(command);
    this.redoStack = []; // Clear redo stack after new command
  }

  undo() {
    if (this.history.length === 0) {
      console.log('❌ Nothing to undo');
      return;
    }
    
    const command = this.history.pop();
    command.undo();
    this.redoStack.push(command);
  }

  redo() {
    if (this.redoStack.length === 0) {
      console.log('❌ Nothing to redo');
      return;
    }
    
    const command = this.redoStack.pop();
    command.execute();
    this.history.push(command);
  }

  showContent() {
    console.log(\`📄 Content: "\${this.document.getContent()}"\`);
  }
}

// Utilizzo
const doc = new Document();
const editor = new TextEditor(doc);

editor.executeCommand(new WriteCommand(doc, 'Hello '));
editor.executeCommand(new WriteCommand(doc, 'World'));
editor.showContent();

editor.executeCommand(new DeleteCommand(doc, 5));
editor.showContent();

console.log('\\n--- Undo ---');
editor.undo();
editor.showContent();

console.log('\\n--- Redo ---');
editor.redo();
editor.showContent();`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Text editors (undo/redo)",
            "Transaction systems (commit/rollback)",
            "GUI buttons (ogni button esegue un command)",
            "Job queues (background jobs)",
            "Macro recording (registra sequenze di comandi)",
        ],
        whenToUse: [
            "Quando vuoi parametrizzare oggetti con operazioni",
            "Quando serve supporto per undo/redo",
            "Quando vuoi accodare richieste o loggarle",
            "Quando serve supporto per transazioni",
        ],
        whenNotToUse: [
            "Quando le operazioni sono semplici callback",
            "Quando non serve undo/redo o history",
            "Quando aggiunge complessità inutile",
        ],
        relatedPatterns: ["Memento", "Composite", "Prototype"],
    },

    state: {
        id: "state",
        name: "State",
        category: "behavioral",
        intent: "Permettere a un oggetto di alterare il suo comportamento quando il suo stato interno cambia. L'oggetto sembrerà cambiare classe.",
        problem:
            "Quando un oggetto ha molti stati e il comportamento cambia in base allo stato, finisci con condizionali complessi ovunque.",
        solution:
            "Estrarre comportamenti specifici dello stato in classi State separate. Il contesto delega le operazioni all'oggetto State corrente.",
        structure:
            "Context mantiene riferimento a ConcreteState corrente. State interface definisce metodi. ConcreteState implementa comportamento per stato specifico.",
        participants: [
            "Context - mantiene istanza di ConcreteState che definisce stato corrente",
            "State - interfaccia per incapsulare comportamento associato a stato",
            "ConcreteState - implementa comportamento associato a uno stato del Context",
        ],
        codeExamples: [
            {
                title: "State per Vending Machine",
                description:
                    "Distributore automatico con stati: NoMoney, HasMoney, Dispensing.",
                type: "example",
                code: `// State interface
class VendingMachineState {
  insertMoney(context) {
    console.log('❌ Invalid operation in this state');
  }

  selectProduct(context) {
    console.log('❌ Invalid operation in this state');
  }

  dispense(context) {
    console.log('❌ Invalid operation in this state');
  }
}

// Concrete States
class NoMoneyState extends VendingMachineState {
  insertMoney(context) {
    console.log('💰 Money inserted');
    context.setState(new HasMoneyState());
  }

  selectProduct(context) {
    console.log('❌ Please insert money first');
  }
}

class HasMoneyState extends VendingMachineState {
  insertMoney(context) {
    console.log('✅ Additional money added');
  }

  selectProduct(context) {
    console.log('🎯 Product selected');
    context.setState(new DispensingState());
    context.dispense();
  }
}

class DispensingState extends VendingMachineState {
  dispense(context) {
    console.log('📦 Dispensing product...');
    console.log('✅ Product delivered');
    context.setState(new NoMoneyState());
  }

  insertMoney(context) {
    console.log('⏸️  Please wait, dispensing in progress');
  }

  selectProduct(context) {
    console.log('⏸️  Please wait, dispensing in progress');
  }
}

// Context - Vending Machine
class VendingMachine {
  constructor() {
    this.state = new NoMoneyState();
  }

  setState(state) {
    this.state = state;
  }

  insertMoney() {
    this.state.insertMoney(this);
  }

  selectProduct() {
    this.state.selectProduct(this);
  }

  dispense() {
    this.state.dispense(this);
  }
}

// Utilizzo
const machine = new VendingMachine();

console.log('--- Scenario 1: Normal flow ---');
machine.selectProduct();  // Error: no money
machine.insertMoney();    // OK
machine.selectProduct();  // OK, dispenses

console.log('\\n--- Scenario 2: Multiple money inserts ---');
machine.insertMoney();
machine.insertMoney();    // Additional money
machine.selectProduct();

console.log('\\n--- Scenario 3: Try to insert during dispensing ---');
machine.insertMoney();
machine.selectProduct();
machine.insertMoney();    // Error: dispensing`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "TCP connection (Closed, Listen, Established)",
            "Order processing (Pending, Confirmed, Shipped, Delivered)",
            "Media player (Playing, Paused, Stopped)",
            "Document workflow (Draft, Review, Approved, Published)",
            "Game character states (Idle, Walking, Running, Jumping)",
        ],
        whenToUse: [
            "Quando comportamento di oggetto dipende dal suo stato",
            "Quando hai condizionali lunghi basati sullo stato",
            "Quando stati hanno comportamenti complessi",
            "Quando le transizioni tra stati sono ben definite",
        ],
        whenNotToUse: [
            "Quando hai pochi stati semplici",
            "Quando lo stato non influenza il comportamento",
            "Quando aggiunge complessità inutile",
        ],
        relatedPatterns: ["Strategy", "Singleton", "Flyweight"],
    },

    "template-method": {
        id: "template-method",
        name: "Template Method",
        category: "behavioral",
        intent: "Definire lo scheletro di un algoritmo in un metodo, delegando alcuni passi alle sottoclassi. Template Method permette alle sottoclassi di ridefinire certi passi di un algoritmo senza cambiarne la struttura.",
        problem:
            "Quando hai algoritmi simili con passi comuni ma alcune variazioni nei dettagli.",
        solution:
            "Definire metodo template nella classe base con lo scheletro dell'algoritmo. Le sottoclassi sovrascrivono metodi hook specifici.",
        structure:
            "AbstractClass definisce template method e metodi astratti/hook. ConcreteClass implementa metodi astratti.",
        participants: [
            "AbstractClass - definisce template method e metodi primitivi astratti",
            "ConcreteClass - implementa metodi primitivi per eseguire passi specifici",
        ],
        codeExamples: [
            {
                title: "Template Method per Data Mining",
                description:
                    "Algoritmo di analisi dati per diversi formati (CSV, JSON, XML).",
                type: "example",
                code: `// Abstract Class
class DataMiner {
  // Template Method - definisce lo scheletro
  mine(path) {
    console.log(\`\\n🔍 Starting data mining from \${path}\`);
    
    const file = this.openFile(path);
    const rawData = this.extractData(file);
    const parsedData = this.parseData(rawData);
    const analysis = this.analyzeData(parsedData);
    
    this.closeFile(file);
    this.sendReport(analysis);
    
    console.log('✅ Mining complete\\n');
  }

  // Common steps (same for all)
  openFile(path) {
    console.log(\`📂 Opening file: \${path}\`);
    return { path, handle: 'file_handle' };
  }

  closeFile(file) {
    console.log(\`🔒 Closing file: \${file.path}\`);
  }

  sendReport(analysis) {
    console.log(\`📧 Sending report: \${JSON.stringify(analysis)}\`);
  }

  // Abstract methods (must be implemented by subclasses)
  extractData(file) {
    throw new Error('extractData() must be implemented');
  }

  parseData(rawData) {
    throw new Error('parseData() must be implemented');
  }

  // Hook method (optional override)
  analyzeData(data) {
    console.log('📊 Analyzing data (default analysis)');
    return { records: data.length, summary: 'Basic analysis' };
  }
}

// Concrete Classes
class CSVDataMiner extends DataMiner {
  extractData(file) {
    console.log('📄 Extracting CSV data');
    return 'col1,col2\\nval1,val2\\nval3,val4';
  }

  parseData(rawData) {
    console.log('🔧 Parsing CSV format');
    const lines = rawData.split('\\n');
    return lines.map(line => line.split(','));
  }

  analyzeData(data) {
    console.log('📊 CSV-specific analysis');
    return { 
      records: data.length - 1, 
      columns: data[0].length,
      type: 'CSV'
    };
  }
}

class JSONDataMiner extends DataMiner {
  extractData(file) {
    console.log('📄 Extracting JSON data');
    return '[{"name":"Alice","age":30},{"name":"Bob","age":25}]';
  }

  parseData(rawData) {
    console.log('🔧 Parsing JSON format');
    return JSON.parse(rawData);
  }

  analyzeData(data) {
    console.log('📊 JSON-specific analysis');
    return { 
      records: data.length, 
      fields: Object.keys(data[0]),
      type: 'JSON'
    };
  }
}

class XMLDataMiner extends DataMiner {
  extractData(file) {
    console.log('📄 Extracting XML data');
    return '<users><user name="Alice"/><user name="Bob"/></users>';
  }

  parseData(rawData) {
    console.log('🔧 Parsing XML format');
    // Simplified XML parsing
    return [{ name: 'Alice' }, { name: 'Bob' }];
  }
}

// Utilizzo
const csvMiner = new CSVDataMiner();
csvMiner.mine('data.csv');

const jsonMiner = new JSONDataMiner();
jsonMiner.mine('data.json');

const xmlMiner = new XMLDataMiner();
xmlMiner.mine('data.xml'); // Uses default analysis`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Frameworks (Spring, Angular lifecycle hooks)",
            "Build tools (compile, test, package steps)",
            "Game loops (initialize, update, render)",
            "HTTP request handling (authenticate, validate, process, respond)",
            "Test frameworks (setup, execute, teardown)",
        ],
        whenToUse: [
            "Quando hai algoritmi simili con variazioni in alcuni passi",
            "Quando vuoi evitare duplicazione di codice comune",
            "Quando vuoi controllare i punti di estensione",
            "Quando le sottoclassi devono sovrascrivere solo alcune parti",
        ],
        whenNotToUse: [
            "Quando l'algoritmo è completamente diverso per ogni caso",
            "Quando serve più flessibilità di quella offerta da ereditarietà",
            "Quando preferisci composizione a ereditarietà",
        ],
        relatedPatterns: ["Strategy", "Factory Method", "Hook Method"],
    },

    "chain-of-responsibility": {
        id: "chain-of-responsibility",
        name: "Chain of Responsibility",
        category: "behavioral",
        intent: "Evitare di accoppiare il mittente di una richiesta al suo ricevitore dando a più oggetti la possibilità di gestire la richiesta. Concatenare gli oggetti riceventi e passare la richiesta lungo la catena finché un oggetto la gestisce.",
        problem:
            "Quando hai molteplici handler per una richiesta e non sai in anticipo quale la gestirà.",
        solution:
            "Creare catena di handler. Ogni handler decide se processare la richiesta o passarla al prossimo nella catena.",
        structure:
            "Handler interface con metodo handleRequest() e riferimento a next handler. ConcreteHandler implementa handleRequest() e può passare al next.",
        participants: [
            "Handler - interfaccia per gestire richieste e accedere al successore",
            "ConcreteHandler - gestisce richieste per cui è responsabile, altrimenti passa al successore",
            "Client - inizia la richiesta a un Handler nella catena",
        ],
        codeExamples: [
            {
                title: "Chain of Responsibility per Support Tickets",
                description:
                    "Sistema di supporto con livelli (Level 1, Level 2, Manager).",
                type: "example",
                code: `// Handler
class SupportHandler {
  constructor() {
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler; // For chaining
  }

  handle(ticket) {
    if (this.canHandle(ticket)) {
      this.process(ticket);
    } else if (this.nextHandler) {
      console.log(\`  ↗️  Escalating to next level...\`);
      this.nextHandler.handle(ticket);
    } else {
      console.log('  ❌ No handler available for this ticket');
    }
  }

  canHandle(ticket) {
    throw new Error('canHandle() must be implemented');
  }

  process(ticket) {
    throw new Error('process() must be implemented');
  }
}

// Concrete Handlers
class Level1Support extends SupportHandler {
  canHandle(ticket) {
    return ticket.complexity === 'low';
  }

  process(ticket) {
    console.log(\`  🎫 Level 1 Support: Handling ticket #\${ticket.id}\`);
    console.log(\`     Issue: \${ticket.issue}\`);
    console.log('     ✅ Resolved with FAQ');
  }
}

class Level2Support extends SupportHandler {
  canHandle(ticket) {
    return ticket.complexity === 'medium';
  }

  process(ticket) {
    console.log(\`  🎫 Level 2 Support: Handling ticket #\${ticket.id}\`);
    console.log(\`     Issue: \${ticket.issue}\`);
    console.log('     ✅ Resolved with technical assistance');
  }
}

class ManagerSupport extends SupportHandler {
  canHandle(ticket) {
    return ticket.complexity === 'high';
  }

  process(ticket) {
    console.log(\`  🎫 Manager: Handling ticket #\${ticket.id}\`);
    console.log(\`     Issue: \${ticket.issue}\`);
    console.log('     ✅ Resolved with executive decision');
  }
}

// Setup chain
const level1 = new Level1Support();
const level2 = new Level2Support();
const manager = new ManagerSupport();

level1.setNext(level2).setNext(manager);

// Tickets
const tickets = [
  { id: 1, issue: 'Password reset', complexity: 'low' },
  { id: 2, issue: 'Database performance', complexity: 'medium' },
  { id: 3, issue: 'Contract negotiation', complexity: 'high' },
  { id: 4, issue: 'General question', complexity: 'low' }
];

console.log('📞 Processing support tickets:\\n');
tickets.forEach(ticket => {
  console.log(\`Ticket #\${ticket.id} (\${ticket.complexity} complexity):\`);
  level1.handle(ticket);
  console.log('');
});`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Middleware in Express.js",
            "Event bubbling in DOM",
            "Exception handling (try-catch chain)",
            "Logging frameworks (log levels)",
            "Authentication/Authorization pipelines",
        ],
        whenToUse: [
            "Quando più oggetti possono gestire una richiesta",
            "Quando non sai quale handler gestirà la richiesta",
            "Quando vuoi disaccoppiare mittente e ricevitore",
            "Quando l'insieme di handler cambia dinamicamente",
        ],
        whenNotToUse: [
            "Quando sai esattamente chi deve gestire la richiesta",
            "Quando ogni richiesta deve essere gestita",
            "Quando la catena diventa troppo lunga",
        ],
        relatedPatterns: ["Composite", "Command", "Decorator"],
    },

    iterator: {
        id: "iterator",
        name: "Iterator",
        category: "behavioral",
        intent: "Fornire un modo per accedere sequenzialmente agli elementi di un oggetto aggregato senza esporre la sua rappresentazione sottostante.",
        problem:
            "Quando vuoi attraversare una collezione senza esporre la sua struttura interna.",
        solution:
            "Creare oggetto Iterator che incapsula la logica di attraversamento. La collezione fornisce metodo per ottenere l'iterator.",
        structure:
            "Iterator interface con hasNext() e next(). ConcreteIterator implementa attraversamento. Aggregate fornisce createIterator().",
        participants: [
            "Iterator - interfaccia per accedere e attraversare elementi",
            "ConcreteIterator - implementa Iterator e tiene traccia della posizione",
            "Aggregate - interfaccia per creare Iterator",
            "ConcreteAggregate - implementa createIterator() che ritorna ConcreteIterator",
        ],
        codeExamples: [
            {
                title: "Iterator per Book Collection",
                description:
                    "Iteratore personalizzato per attraversare collezione di libri.",
                type: "example",
                code: `// Iterator
class Iterator {
  hasNext() {
    throw new Error('hasNext() must be implemented');
  }

  next() {
    throw new Error('next() must be implemented');
  }
}

// Concrete Iterator
class BookIterator extends Iterator {
  constructor(books) {
    super();
    this.books = books;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.books.length;
  }

  next() {
    if (!this.hasNext()) {
      return null;
    }
    return this.books[this.index++];
  }
}

// Reverse Iterator
class ReverseBookIterator extends Iterator {
  constructor(books) {
    super();
    this.books = books;
    this.index = books.length - 1;
  }

  hasNext() {
    return this.index >= 0;
  }

  next() {
    if (!this.hasNext()) {
      return null;
    }
    return this.books[this.index--];
  }
}

// Aggregate
class BookCollection {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  createIterator() {
    return new BookIterator(this.books);
  }

  createReverseIterator() {
    return new ReverseBookIterator(this.books);
  }
}

// Utilizzo
const library = new BookCollection();
library.addBook({ title: '1984', author: 'George Orwell' });
library.addBook({ title: 'Brave New World', author: 'Aldous Huxley' });
library.addBook({ title: 'Fahrenheit 451', author: 'Ray Bradbury' });

console.log('📚 Forward iteration:');
const iterator = library.createIterator();
while (iterator.hasNext()) {
  const book = iterator.next();
  console.log(\`  - \${book.title} by \${book.author}\`);
}

console.log('\\n📚 Reverse iteration:');
const reverseIterator = library.createReverseIterator();
while (reverseIterator.hasNext()) {
  const book = reverseIterator.next();
  console.log(\`  - \${book.title} by \${book.author}\`);
}

// JavaScript built-in iterator (for comparison)
console.log('\\n📚 Using JavaScript for...of:');
library.books[Symbol.iterator] = function() {
  let index = 0;
  const books = this;
  return {
    next() {
      if (index < books.length) {
        return { value: books[index++], done: false };
      }
      return { done: true };
    }
  };
};

for (const book of library.books) {
  console.log(\`  - \${book.title} by \${book.author}\`);
}`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "JavaScript Array.prototype[Symbol.iterator]",
            "Java Iterator interface",
            "Database result sets",
            "File system directory traversal",
            "Tree/Graph traversal algorithms",
        ],
        whenToUse: [
            "Quando vuoi accedere a contenuti senza esporre rappresentazione interna",
            "Quando serve supporto per multiple traversal della stessa struttura",
            "Quando vuoi interfaccia uniforme per attraversare strutture diverse",
            "Quando vuoi separare logica di traversal dalla collezione",
        ],
        whenNotToUse: [
            "Quando hai accesso diretto semplice agli elementi",
            "Quando le collezioni sono sempre piccole",
            "Quando JavaScript built-in iterators sono sufficienti",
        ],
        relatedPatterns: ["Composite", "Factory Method", "Memento"],
    },

    mediator: {
        id: "mediator",
        name: "Mediator",
        category: "behavioral",
        intent: "Definire un oggetto che incapsula come un insieme di oggetti interagisce. Mediator promuove loose coupling evitando che gli oggetti si riferiscano esplicitamente l'un l'altro.",
        problem:
            "Quando hai molti oggetti che comunicano tra loro, creando dipendenze complesse difficili da capire e mantenere.",
        solution:
            "Creare oggetto Mediator che gestisce tutte le interazioni. Gli oggetti comunicano solo con il mediator, non direttamente tra loro.",
        structure:
            "Mediator interface definisce metodi di comunicazione. ConcreteMediator coordina Colleague objects. Colleague conosce Mediator.",
        participants: [
            "Mediator - interfaccia per comunicare con Colleague objects",
            "ConcreteMediator - implementa comportamento cooperativo coordinando Colleague",
            "Colleague - ogni classe Colleague conosce il suo Mediator",
        ],
        codeExamples: [
            {
                title: "Mediator per Chat Room",
                description: "Chat room che media comunicazione tra utenti.",
                type: "example",
                code: `// Mediator
class ChatRoom {
  constructor() {
    this.users = [];
  }

  register(user) {
    this.users.push(user);
    user.chatRoom = this;
    console.log(\`✅ \${user.name} joined the chat\`);
  }

  send(message, from, to) {
    if (to) {
      // Private message
      to.receive(message, from);
    } else {
      // Broadcast to all
      this.users.forEach(user => {
        if (user !== from) {
          user.receive(message, from);
        }
      });
    }
  }
}

// Colleague
class User {
  constructor(name) {
    this.name = name;
    this.chatRoom = null;
  }

  send(message, to) {
    console.log(\`\${this.name} sends: "\${message}"\`);
    this.chatRoom.send(message, this, to);
  }

  receive(message, from) {
    console.log(\`  → \${this.name} receives from \${from.name}: "\${message}"\`);
  }
}

// Utilizzo
const chatRoom = new ChatRoom();

const alice = new User('Alice');
const bob = new User('Bob');
const charlie = new User('Charlie');

chatRoom.register(alice);
chatRoom.register(bob);
chatRoom.register(charlie);

console.log('\\n--- Broadcasting ---');
alice.send('Hello everyone!');

console.log('\\n--- Private message ---');
bob.send('Hi Alice, how are you?', alice);

console.log('\\n--- Another broadcast ---');
charlie.send('Anyone up for lunch?');`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Chat rooms / messaging systems",
            "Air traffic control",
            "MVC controller (mediates between Model and View)",
            "Dialog boxes (coordina widgets)",
            "Event bus systems",
        ],
        whenToUse: [
            "Quando hai oggetti che comunicano in modi complessi",
            "Quando riusare oggetti è difficile per troppe dipendenze",
            "Quando comportamento distribuito tra classi deve essere personalizzabile",
            "Quando vuoi centralizzare controllo su comunicazione",
        ],
        whenNotToUse: [
            "Quando hai poche interazioni semplici",
            "Quando il mediator diventa troppo complesso",
            "Quando comunicazione diretta è più chiara",
        ],
        relatedPatterns: ["Facade", "Observer", "Singleton"],
    },

    memento: {
        id: "memento",
        name: "Memento",
        category: "behavioral",
        intent: "Catturare e esternalizzare lo stato interno di un oggetto senza violare l'incapsulamento, in modo che l'oggetto possa essere ripristinato a questo stato successivamente.",
        problem:
            "Quando serve salvare e ripristinare lo stato di un oggetto senza esporre i dettagli della sua implementazione.",
        solution:
            "Creare oggetto Memento che memorizza snapshot dello stato. Originator crea e ripristina da Memento. Caretaker gestisce Memento.",
        structure:
            "Memento memorizza stato. Originator crea Memento e ripristina stato. Caretaker è responsabile del Memento.",
        participants: [
            "Memento - memorizza stato interno di Originator",
            "Originator - crea Memento e usa Memento per ripristinare stato",
            "Caretaker - è responsabile per salvaguardare Memento",
        ],
        codeExamples: [
            {
                title: "Memento per Game Save System",
                description: "Sistema di salvataggio per videogioco con checkpoint.",
                type: "example",
                code: `// Memento
class GameMemento {
  constructor(level, health, score, position) {
    this.level = level;
    this.health = health;
    this.score = score;
    this.position = position;
    this.timestamp = new Date().toISOString();
  }

  getState() {
    return {
      level: this.level,
      health: this.health,
      score: this.score,
      position: this.position
    };
  }
}

// Originator
class Game {
  constructor() {
    this.level = 1;
    this.health = 100;
    this.score = 0;
    this.position = { x: 0, y: 0 };
  }

  play() {
    // Simulate gameplay
    this.level++;
    this.health -= 20;
    this.score += 100;
    this.position.x += 10;
    this.position.y += 5;
  }

  save() {
    console.log('💾 Creating save point...');
    return new GameMemento(this.level, this.health, this.score, { ...this.position });
  }

  restore(memento) {
    const state = memento.getState();
    this.level = state.level;
    this.health = state.health;
    this.score = state.score;
    this.position = state.position;
    console.log(\`🔄 Game restored from \${memento.timestamp}\`);
  }

  display() {
    console.log(\`🎮 Level: \${this.level}, Health: \${this.health}, Score: \${this.score}, Position: (\${this.position.x}, \${this.position.y})\`);
  }
}

// Caretaker
class SaveManager {
  constructor() {
    this.saves = [];
  }

  addSave(memento) {
    this.saves.push(memento);
    console.log(\`✅ Save #\${this.saves.length} created\`);
  }

  getSave(index) {
    return this.saves[index];
  }

  listSaves() {
    console.log(\`\\n📂 Available saves (\${this.saves.length}):\`);
    this.saves.forEach((save, index) => {
      const state = save.getState();
      console.log(\`  \${index + 1}. Level \${state.level}, Score \${state.score} - \${save.timestamp}\`);
    });
  }
}

// Utilizzo
const game = new Game();
const saveManager = new SaveManager();

console.log('--- Initial state ---');
game.display();

console.log('\\n--- Playing game ---');
game.play();
game.display();
saveManager.addSave(game.save());

game.play();
game.display();
saveManager.addSave(game.save());

game.play();
game.display();

saveManager.listSaves();

console.log('\\n--- Restoring to save #1 ---');
game.restore(saveManager.getSave(0));
game.display();`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Undo/Redo in editors",
            "Database transactions (savepoints)",
            "Game save systems",
            "Browser history",
            "Version control systems",
        ],
        whenToUse: [
            "Quando serve salvare e ripristinare stato di oggetto",
            "Quando accesso diretto allo stato violerebbe incapsulamento",
            "Quando serve implementare undo/redo",
            "Quando serve creare snapshot dello stato",
        ],
        whenNotToUse: [
            "Quando lo stato è molto grande (overhead di memoria)",
            "Quando lo stato cambia raramente",
            "Quando serializzazione semplice è sufficiente",
        ],
        relatedPatterns: ["Command", "Iterator", "Prototype"],
    },

    visitor: {
        id: "visitor",
        name: "Visitor",
        category: "behavioral",
        intent: "Rappresentare un'operazione da eseguire sugli elementi di una struttura di oggetti. Visitor permette di definire una nuova operazione senza cambiare le classi degli elementi su cui opera.",
        problem:
            "Quando vuoi aggiungere operazioni a una gerarchia di classi senza modificare le classi stesse.",
        solution:
            "Creare interfaccia Visitor con metodo visit() per ogni tipo di elemento. Gli elementi accettano visitor e chiamano metodo visit appropriato.",
        structure:
            "Visitor interface con visit() per ogni ConcreteElement. Element interface con accept(visitor). ConcreteElement implementa accept().",
        participants: [
            "Visitor - interfaccia con operazione visit per ogni ConcreteElement",
            "ConcreteVisitor - implementa operazioni definite da Visitor",
            "Element - interfaccia con accept(visitor)",
            "ConcreteElement - implementa accept() che chiama visitor.visit(this)",
        ],
        codeExamples: [
            {
                title: "Visitor per Export System",
                description:
                    "Export di documenti in formati diversi (JSON, XML) senza modificare classi Document.",
                type: "example",
                code: `// Element interface
class DocumentPart {
  accept(visitor) {
    throw new Error('accept() must be implemented');
  }
}

// Concrete Elements
class Paragraph extends DocumentPart {
  constructor(text) {
    super();
    this.text = text;
  }

  accept(visitor) {
    visitor.visitParagraph(this);
  }
}

class Image extends DocumentPart {
  constructor(url, alt) {
    super();
    this.url = url;
    this.alt = alt;
  }

  accept(visitor) {
    visitor.visitImage(this);
  }
}

class Table extends DocumentPart {
  constructor(rows) {
    super();
    this.rows = rows;
  }

  accept(visitor) {
    visitor.visitTable(this);
  }
}

// Visitor interface
class DocumentVisitor {
  visitParagraph(paragraph) {}
  visitImage(image) {}
  visitTable(table) {}
}

// Concrete Visitors
class JSONExportVisitor extends DocumentVisitor {
  constructor() {
    super();
    this.result = [];
  }

  visitParagraph(paragraph) {
    this.result.push({ type: 'paragraph', text: paragraph.text });
  }

  visitImage(image) {
    this.result.push({ type: 'image', url: image.url, alt: image.alt });
  }

  visitTable(table) {
    this.result.push({ type: 'table', rows: table.rows });
  }

  getResult() {
    return JSON.stringify(this.result, null, 2);
  }
}

class XMLExportVisitor extends DocumentVisitor {
  constructor() {
    super();
    this.result = [];
  }

  visitParagraph(paragraph) {
    this.result.push(\`<paragraph>\${paragraph.text}</paragraph>\`);
  }

  visitImage(image) {
    this.result.push(\`<image url="\${image.url}" alt="\${image.alt}" />\`);
  }

  visitTable(table) {
    const rows = table.rows.map(r => \`<row>\${r.join(',')}</row>\`).join('');
    this.result.push(\`<table>\${rows}</table>\`);
  }

  getResult() {
    return \`<document>\\n  \${this.result.join('\\n  ')}\\n</document>\`;
  }
}

// Document (Object Structure)
class Document {
  constructor() {
    this.parts = [];
  }

  add(part) {
    this.parts.push(part);
  }

  export(visitor) {
    this.parts.forEach(part => part.accept(visitor));
    return visitor.getResult();
  }
}

// Utilizzo
const doc = new Document();
doc.add(new Paragraph('Introduction to Design Patterns'));
doc.add(new Image('diagram.png', 'UML Diagram'));
doc.add(new Table([['Name', 'Type'], ['Visitor', 'Behavioral']]));

console.log('--- JSON Export ---');
const jsonVisitor = new JSONExportVisitor();
console.log(doc.export(jsonVisitor));

console.log('\\n--- XML Export ---');
const xmlVisitor = new XMLExportVisitor();
console.log(doc.export(xmlVisitor));`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "Compilers (AST traversal)",
            "Document export (PDF, HTML, XML)",
            "Tax calculation systems",
            "Report generation",
            "Serialization frameworks",
        ],
        whenToUse: [
            "Quando vuoi aggiungere operazioni senza modificare le classi",
            "Quando hai struttura di oggetti stabile ma operazioni che cambiano",
            "Quando operazioni non correlate devono essere separate",
            "Quando serve accesso a stato interno degli elementi",
        ],
        whenNotToUse: [
            "Quando gerarchia di classi cambia spesso",
            "Quando le operazioni sono semplici",
            "Quando viola incapsulamento troppo",
        ],
        relatedPatterns: ["Composite", "Interpreter", "Iterator"],
    },

    interpreter: {
        id: "interpreter",
        name: "Interpreter",
        category: "behavioral",
        intent: "Dato un linguaggio, definire una rappresentazione per la sua grammatica insieme a un interprete che usa la rappresentazione per interpretare frasi nel linguaggio.",
        problem:
            "Quando hai un linguaggio semplice da interpretare e puoi rappresentare le frasi come alberi sintattici.",
        solution:
            "Definire grammatica del linguaggio. Creare classe per ogni regola grammaticale. Costruire albero sintattico e interpretarlo.",
        structure:
            "AbstractExpression con interpret(). TerminalExpression e NonterminalExpression estendono AbstractExpression. Context contiene info globali.",
        participants: [
            "AbstractExpression - interfaccia per interpret() operation",
            "TerminalExpression - implementa interpret() per simboli terminali",
            "NonterminalExpression - una classe per ogni regola",
            "Context - contiene informazioni globali per interpreter",
        ],
        codeExamples: [
            {
                title: "Interpreter per Boolean Expressions",
                description: "Interprete per espressioni booleane (AND, OR, NOT).",
                type: "example",
                code: `// Context
class Context {
  constructor(variables = {}) {
    this.variables = variables;
  }

  lookup(name) {
    return this.variables[name];
  }

  assign(name, value) {
    this.variables[name] = value;
  }
}

// Abstract Expression
class Expression {
  interpret(context) {
    throw new Error('interpret() must be implemented');
  }
}

// Terminal Expressions
class VariableExpression extends Expression {
  constructor(name) {
    super();
    this.name = name;
  }

  interpret(context) {
    return context.lookup(this.name);
  }

  toString() {
    return this.name;
  }
}

class ConstantExpression extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }

  interpret(context) {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }
}

// Nonterminal Expressions
class AndExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context) {
    return this.left.interpret(context) && this.right.interpret(context);
  }

  toString() {
    return \`(\${this.left} AND \${this.right})\`;
  }
}

class OrExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context) {
    return this.left.interpret(context) || this.right.interpret(context);
  }

  toString() {
    return \`(\${this.left} OR \${this.right})\`;
  }
}

class NotExpression extends Expression {
  constructor(expression) {
    super();
    this.expression = expression;
  }

  interpret(context) {
    return !this.expression.interpret(context);
  }

  toString() {
    return \`NOT(\${this.expression})\`;
  }
}

// Utilizzo
const context = new Context({
  x: true,
  y: false,
  z: true
});

// Build expression tree: (x AND y) OR (NOT z)
const expr = new OrExpression(
  new AndExpression(
    new VariableExpression('x'),
    new VariableExpression('y')
  ),
  new NotExpression(
    new VariableExpression('z')
  )
);

console.log(\`Expression: \${expr}\`);
console.log(\`Variables: x=\${context.lookup('x')}, y=\${context.lookup('y')}, z=\${context.lookup('z')}\`);
console.log(\`Result: \${expr.interpret(context)}\`);

// Try different values
context.assign('y', true);
console.log(\`\\nAfter setting y=true:\`);
console.log(\`Result: \${expr.interpret(context)}\`);`,
                language: "javascript",
            },
        ],
        realWorldExamples: [
            "SQL parsers",
            "Regular expressions",
            "Mathematical expression evaluators",
            "Configuration file parsers",
            "Template engines",
        ],
        whenToUse: [
            "Quando hai grammatica semplice da interpretare",
            "Quando efficienza non è priorità critica",
            "Quando la grammatica è relativamente stabile",
            "Quando vuoi rappresentare regole come oggetti",
        ],
        whenNotToUse: [
            "Quando la grammatica è complessa (usa parser generator)",
            "Quando serve alta performance",
            "Quando la grammatica cambia frequentemente",
        ],
        relatedPatterns: ["Composite", "Flyweight", "Iterator", "Visitor"],
    },
};

// Funzioni helper
export function getPatternsByCategory(
    category: "creational" | "structural" | "behavioral"
): PatternTheory[] {
    return Object.values(patterns).filter((p) => p.category === category);
}

export function getPatternById(id: string): PatternTheory | undefined {
    return patterns[id];
}

export function getAllPatterns(): PatternTheory[] {
    return Object.values(patterns);
}
