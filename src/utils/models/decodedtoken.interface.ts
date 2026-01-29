import { type JwtPayload } from "jwt-decode";

export interface IDecodeToken extends JwtPayload {
    role?: number;
    exp?: number ;
}