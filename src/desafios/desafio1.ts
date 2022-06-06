// Como podemos rodar isso em um arquivo .ts sem causar erros?
// let employee = {};
// employee.code = 10;
// employee.name = "John";

export interface IEmployee {
  code?: number;
  name?: string;
}

const employee: IEmployee = {};
employee.code = 10;
employee.name = 'John';
