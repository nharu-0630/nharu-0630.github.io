import { type IUniform, Vector2 } from "three";

export interface Work {
    title: string;
    description: string;
    url: string;
    date: Date;
}

export interface Link {
    url: string;
    label: string;
}

export interface ShaderUniforms {
    [uniform: string]: IUniform<unknown>;
    u_time: IUniform<number>;
    u_resolution: IUniform<Vector2>;
    u_mouse: IUniform<Vector2>;
}
