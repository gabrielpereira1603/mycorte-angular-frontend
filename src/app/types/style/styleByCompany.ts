export interface Company {
  id: number;
  name: string;
  address: string;
  city: string;
  neighborhood: string;
  road: string;
  number: string;
  zipCode: string;
  cnpj: string;
}

export interface styleByCompany {
  id: number;
  colorText: string;
  logo: string | null;
  name: string;
  primaryColor: string;
  secondColor: string;
  company: Company; // Adicionei a propriedade `company`
}
