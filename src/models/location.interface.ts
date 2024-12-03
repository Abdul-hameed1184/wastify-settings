export interface IState {
    id: number;
    name: string;
}

export interface ILga {
    id: number;
    name: string;
    stateId: number;
    stateName: string;
}

export interface IWard {
    id: number;
    name: string;
}

export interface ILocation {
    latitude: string;
    longitude: string;

}