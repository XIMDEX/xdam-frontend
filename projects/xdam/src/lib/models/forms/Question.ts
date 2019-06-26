import { Dropdown } from './questions/Dropdown';
import { Base } from './questions/Base';
import { Text } from './questions/Text';
import { hasIn, isNil } from 'ramda';

export function setQuestion(params: Text | Dropdown) {
    let type = null;
    let question = null;
    if (hasIn('type', params)) {
        type = params.type;
    }

    if (isNil(type)) {
        throw new Error('Bad type in params');
    }

    if (type === 'text-area' || type === 'text') {
        question = new Text({ ...params, multiline: type === 'text-area' } as any);
    } else if (type === 'dropdown') {
        question = new Dropdown(params as Dropdown);
    } else {
        question = new Base(params);
    }

    return question;
}
