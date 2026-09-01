class Estudiante1 {
  nombre: string;
  carnet: string;

  constructor(nombre: string, carnet: string) {
    this.nombre = nombre;
    this.carnet = carnet;
  }

  mostrarInformacion() {
    console.log(`Nombre: ${this.nombre} - Carnet: ${this.carnet}`);
  }
}

//const juan = new Estudiante("Juan Perez", "2021001");
//juan.mostrarInformacion();


class Cuenta {
  private saldo: number = 0;

  depositar(monto: number) {
    if (monto > 0) {
      this.saldo += monto;
    }
  }
    
  retirar(monto: number) {
    if (monto > 0 && monto <= this.saldo) {
      this.saldo -= monto;
    }
  }

  get saldoActual() {
    return this.saldo;
  }
}

/* const cuenta = new Cuenta();
cuenta.depositar(500);
cuenta.depositar(200);
cuenta.depositar(-100); // No se permite depositar montos negativos
cuenta.retirar(100); // No se permite retirar montos negativos
console.log(`Saldo actual: ${cuenta.saldoActual}`);*/

class Producto {
  constructor(public nombre: string, public precio: number) {}

  obtenerPrecio(descuento: number): number {

    if (descuento < 0 || descuento > 100) {
      throw new Error("El descuento debe estar entre 0 y 100");
    }

    return this.precio - (this.precio * descuento / 100);
  }
}

class Orden {
  productos: Producto[] = [];

  agregarProducto(producto: Producto) {
    this.productos.push(producto);
  }

  mostrarOrden() {
    console.log("Productos en la orden:"); 
    for (const producto of this.productos) {
      console.log(`- ${producto.nombre}: Q.${producto.precio.toFixed(2)}`);
    }
  }
}
/*
const orden1 = new Orden();
const producto1 = new Producto("Camiseta", 20);
const producto2 = new Producto("Pantalón", 40);

orden1.agregarProducto(producto1);
orden1.agregarProducto(producto2);
orden1.mostrarOrden();*/

/*
//Primer ejemplo de herencia

class Persona {
  constructor(public nombre: string, public carnet: string) {}

  mostrarInformacion() {
    console.log(`Nombre: ${this.nombre} - Carnet: ${this.carnet}`);
  }
}

class Estudiante extends Persona {
  constructor(public nombre: string, public carnet: string) {
    super(nombre, carnet);
  }

  inscribirCurso(curso: string) {
    console.log(`${this.nombre} se ha inscrito en el curso: ${curso}`);
  }
}

class Docente extends Persona {
  constructor(public nombre: string, public carnet: string) {
    super(nombre, carnet);
  } 

  prepararClase(materia: string) {
    console.log(`${this.nombre} está preparando la clase de: ${materia}`);
  }
}

const estudiante1 = new Estudiante("Juan Perez", "2021001");
const docente1 = new Docente("Dr. Smith", "D12345");

estudiante1.mostrarInformacion(); // Metodo heredado de la clase Persona
docente1.mostrarInformacion(); // Metodo heredado de la clase Persona
estudiante1.inscribirCurso("Matemáticas"); //Metodo de la clase Estudiante
docente1.prepararClase("Física"); //Metodo de la clase Docente */

//Clases abstractas

abstract class Persona {
  constructor(public nombre: string, public carnet: string) {}

  mostrarInformacion() {
    console.log(`Nombre: ${this.nombre} - Carnet: ${this.carnet}`);
  }

  abstract saludar(): void;
}

class Estudiante extends Persona {
  constructor(public nombre: string, public carnet: string) {
    super(nombre, carnet);
  }

  inscribirCurso(curso: string) {
    console.log(`${this.nombre} se ha inscrito en el curso: ${curso}`);
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre} y soy estudiante.`);
  }
}

class Docente extends Persona {
  constructor(public nombre: string, public carnet: string) {
    super(nombre, carnet);
  } 

  prepararClase(materia: string) {
    console.log(`${this.nombre} está preparando la clase de: ${materia}`);
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre} y soy docente.`);
  }
}

/*const personas: Persona[] = [
  new Estudiante("Juan Perez", "2021001"),
  new Docente("Dr. Smith", "D12345"),
  new Estudiante("Maria Lopez", "2021002")
];

for (const persona of personas) {
  persona.saludar();
}*/

//Structural typing

interface ConRol { 
  obtenerRol(): string;
}

class Alumno { 
  obtenerRol() { 
    return "Estudiante"; 
  } 
}

function mostrarRol(x: ConRol) {
  console.log(x.obtenerRol());
}

mostrarRol(new Alumno()); 