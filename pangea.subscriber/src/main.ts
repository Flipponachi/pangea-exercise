import {expressApp} from './app';

export const server = expressApp.listen(4000, () => console.log(`SUbscriber app listening on 4000`));
