import { type IUniform, Vector2 } from "three";

export interface PortfolioItem {
    title: string;
    description: string;
    url: string;
    date: Date;
}

export interface ExternalLink {
    url: string;
    label: string;
}

export interface ShaderUniforms {
    [uniform: string]: IUniform<unknown>;
    u_time: IUniform<number>;
    u_resolution: IUniform<Vector2>;
    u_mouse: IUniform<Vector2>;
}
