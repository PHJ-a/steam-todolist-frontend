import { setupWorker } from 'msw/browser';
import { games } from './games';

const handlers = [games];

export const worker = setupWorker(...handlers);
