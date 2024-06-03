import { RoleEnum } from "./roleEnum";

export interface CollaboratorType {
  id: number,
  day_off: boolean,
  email: String,
  enabled: boolean,
  image: String,
  name: String,
  password: String,
  role: RoleEnum,
  telephone: number,
  companyfk: number
}
