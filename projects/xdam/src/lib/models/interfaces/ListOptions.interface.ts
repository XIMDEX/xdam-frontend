export interface ListOptions {
    items?: ListItemOption;
}

export interface ListItemOption {
    type?: string;
    title?: string;
    placeholder?: {};
    actions?: ListItemActions;
}

export interface ListItemActions {
    edit?: boolean;
    download?: boolean;
    delete?: boolean;
}
