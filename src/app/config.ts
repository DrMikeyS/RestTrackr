
export interface ConfigData {
    variables: Variable[];
}

export interface Variable {
    id: number;
    name: string;
    type: string;
    value: string | number | boolean;
    range: {
        size: number, startLabel: string, endLabel: string
    };
}