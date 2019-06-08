import { XDamSettingsInterface } from '../models/interfaces/Settings.interface';

export const standard: XDamSettingsInterface = {
    search: {
        input: {
            search: true,
            reset: true,
            clear: true
        }
    },
    list: {
        items: {
            type: '%s',
            title: '%s',
            placeholder: {
                image: 'https://via.placeholder.com/200/7ec9b8/ffffff?text=Image',
                audio: 'https://via.placeholder.com/200/ef680e/ffffff?text=Audio',
                video: 'https://via.placeholder.com/200/af8282/ffffff?text=Video',
                pdf: 'https://via.placeholder.com/200/5273a8/ffffff?text=pdf',
                other: 'https://via.placeholder.com/200/5ab1c9/ffffff?text=Other'
            },
            actions: {
                edit: true,
                download: true,
                delete: true
            }
        }
    }
};
