
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

//
interface SelectableProps {
    selected: boolean;
    events:   SelectableEvents;
}

interface SelectableEvents {
    onMouseDown:  React.MouseEventHandler;
    onMouseUp:    React.MouseEventHandler;  
    onTouchStart: React.TouchEventHandler;
    onTouchEnd:   React.TouchEventHandler;
}