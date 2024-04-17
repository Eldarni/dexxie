
//
interface Pokemon {
    id:     string;
    image:  number;
    number: string;
    region: string;
    type:   string[];
    tags:   string[];
    family: string[];
}

//
interface Tag {
    id:      string
    name?:   string
    styles?: string
}
